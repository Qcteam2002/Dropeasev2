// import fs from "fs";
// import { join } from "path";
import db from "../../db.server";
import { syncProductQueue } from "../../queues/first_init";
// import Shopify from "../../shopify.server";
import { getClients } from "./shopifyApi";
import metafields from "../../shopify_theme/metafield_config.js";
import { optimizeProduct } from "./optimizeProduct";

export default class ShopifyProduct {
  constructor(session) {
    this.session = session;
    this.limit = 25;
    this.user = null;
  }

  async syncProducts(currentCursor) {
    const session = this.session;
    this.user = await db.user.findUnique({
      where: {
        sessionId: session.id,
      },
    });
    const userId = this.user.id;

    const products = await this.getProducts(this.limit, currentCursor);
    if (products.edges.length > 0) {
      // Store products in the database
      let lastCursor = null;
      for (const edge of products.edges) {
        const product = edge.node;
        lastCursor = edge.cursor;
        const insertData = {
          platformId: product.id,
          user: { connect: { id: userId } },
          metafields: product.metafields.edges,
          title: product.title,
          handle: product.handle,
          descriptionHtml: product.descriptionHtml,
          featuredMedia: product.featuredMedia?.preview?.image.url,
        };

        // const existingProduct = await db.platformProduct.findUnique({
        //     where: { userId_platformId: { userId: userId, platformId: product.id } },
        //   });

        //   if (existingProduct) {
        //     await db.platformProduct.update({
        //       where: { userId_platformId: { userId: userId, platformId: product.id } },
        //       data: insertData,
        //     });
        //   } else {
        //     await db.platformProduct.create({
        //       data: insertData,
        //     });
        //   }

        await db.platformProduct.upsert({
          where: {
            userId_platformId: { userId: userId, platformId: product.id },
          },
          update: insertData,
          create: insertData,
        });
      }

      // Add a new job to the queue to process the next batch
      await syncProductQueue.add("sync_product", {
        session,
        cursor: currentCursor,
      });
    }
  }

  async getProducts(limit, cursor = null) {
    const query = `#graphql
        query ($numProducts: Int!, $cursor: String) {
            products(first: $numProducts, after: $cursor) {
                edges {
                    node {
                        id
                        title
                        descriptionHtml
                        productType
                        # onlineStoreUrl
                        status
                        publishedAt
                        handle
                        # tags
                        collections(first: 20) {
                            nodes {
                                id
                                title
                            }
                        }
                        media(first:250) {
                            nodes {
                                id
                                alt
                                preview {
                                    image {
                                        id
                                        url
                                    }
                                }
                            }
                        }
                        images (first:250) {
                            nodes {
                                id
                                url
                            }
                        }
                        featuredMedia {
                            id
                            alt
                            mediaContentType
                            status
                            preview {
                                image {
                                    id
                                    url
                                }
                            }
                        }
                        options {
                            id
                            name
                            position
                            optionValues {
                                id
                                name
                            }
                        }
                        variants(first:100) {
                            nodes {
                                id
                                sku
                                price
                                compareAtPrice
                                taxable
                                title
                                image {
                                    id
                                    url
                                }
                                selectedOptions {
                                    name
                                    optionValue {
                                        name
                                        id
                                    }
                                }
                                inventoryQuantity
                                inventoryPolicy
                            }
                        }
                        metafields(first: 25) {
                            edges {
                                node {
                                    namespace
                                    key
                                    value
                                }
                            }
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                }
            }
        }`;

    const variables = {
      variables: {
        numProducts: limit,
        cursor: cursor,
      },
    };

    const client = await getClients(this.session);
    const response = await client.request(query, variables);

    // const {
    //   data: { products },
    // } = response.data;

    return response.data.products;
  }

  async makeProductInput(product) {
    return {
      title: "Test-" + product.title,
      descriptionHtml: product.descriptionHtml,
      // productOptions: [
      //   {
      //     name: "Color",
      //     values: [{name:"Red"}, {name:"Blue"}, {name:"Green"}],
      //   },
      // ],
      // handle: product.handle, // Optional: Custom handle for the product
      // variants: product.variants
      //   ? product.variants.map((variant) => ({
      //       price: variant.price,
      //       sku: variant.sku,
      //       inventoryQuantity: variant.inventoryQuantity || 0, // Default to 0 if not provided
      //     }))
      //   : [], // Default to an empty array if no variants are provided
      // images: product.images
      //   ? product.images.map((image) => ({ src: image.url }))
      //   : [], // Default to an empty array if no images are provided
      // metafields: product.metafields
      //   ? product.metafields.map((metafieldEdge) => ({
      //       namespace: metafieldEdge.node.namespace,
      //       key: metafieldEdge.node.key,
      //       value: metafieldEdge.node.value,
      //       type: "multi_line_text_field", // Default type, can be adjusted based on requirements
      //     }))
      //   : [], // Default to an empty array if no metafields are provided
      // tags: product.tags || [], // Optional: Tags for the product
      // vendor: product.vendor || "Default Vendor", // Optional: Default vendor if not provided
    };
  }

  async mergeImages(params) {
    const arImages = [
      // Spread single image into array (if exists)
      ...(params.feturedMedia ? [params.feturedMedia] : []),
      // Spread product images array
      ...(params.images || []),
      // Get images from variants and spread
      ...(params.variants || [])
        .map((variant) => variant.image)
        .filter(Boolean),
    ];

    // Remove duplicates and falsy values (null, undefined, empty string)
    return [...new Set(arImages)].filter(Boolean);
  }

  async pushProductToShopify(product) {
    const query = `#graphql
      mutation CreateProduct($productInput: ProductCreateInput!, $media: [CreateMediaInput!]) {
        productCreate(product: $productInput, media: $media) {
          product {
            id
            title
            descriptionHtml
            handle
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  sku
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  id
                  src
                }
              }
            }
            media(first:250) {
              nodes {
                  id
                  alt
                  preview {
                      image {
                          id
                          url
                      }
                  }
              }
            }
            featuredMedia {
              id
              alt
              mediaContentType
              status
              preview {
                  image {
                      id
                      url
                  }
              }
            }
            options {
              id
              name
              position
              optionValues {
                  id
                  name
              }
            }
            metafields(first: 10) {
              edges {
                node {
                  namespace
                  key
                  value
                  type
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const productData = await this.makeProductInput(product);
    console.log("Product data:", JSON.stringify(productData, null, 2));
    // Ensure productData is formatted correctly
    if (!productData) {
      throw new Error("Invalid product data");
    }
    // Ensure productData has the required fields
    if (!productData.title || !productData.descriptionHtml) {
      throw new Error("Product data is missing required fields");
    }

    const variables = {
      variables: {
        productInput: {
          title: "Test-Sản phẩm hay ho lắm nè",
          descriptionHtml:
            "<p>fjalskdfjlksf jfj dskldjsfl;djslf djslf;dsjl;fdsjfldksf</p>",
          productOptions: [
            {
              name: "Color",
              values: [{ name: "Red" }, { name: "Blue" }, { name: "Green" }],
            },
          ],
        },
        media: [],
      },
    };
    console.log("Variables ne:", JSON.stringify(variables, null, 2));

    try {
      const client = await getClients(this.session);
      const response = await client.request(query, variables);

      if (response.data.productCreate.userErrors.length > 0) {
        console.error("User Errors:", response.data.productCreate.userErrors);
        throw new Error("Failed to push product to Shopify due to user errors");
      }

      console.log(
        "Product with metafields pushed successfully:",
        response.data.productCreate.product
      );

      // following process to upload images
      // const media = await this.uploadImagesToShopify(product.images);
      // if (media.length > 0) {
      //   variables.media = media;
      //   const response = await client.request(query, variables);
      //   if (response.data.productCreate.userErrors.length > 0) {
      //     console.error("User Errors:", response.data.productCreate.userErrors);
      //   }
      //   console.log(
      //     "Product with images pushed successfully:",
      //     response.data.productCreate.product
      //   );
      // }

      return response.data.productCreate.product;
    } catch (error) {
      console.error("Error pushing product to Shopify:", error);
      throw error;
    }
  }

  async updateProductShopify(product) {
    const query = `#graphql
      mutation productUpdate($input: ProductUpdateInput!) {
        productUpdate(product: $input) {
          product {
            id
            title
            descriptionHtml
            metafields(first: 10) {
              edges {
                node {
                  namespace
                  key
                  value
                  type
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const optimizedProduct = await optimizeProduct(product);

      // Map metafields từ config với dữ liệu từ optimizedProduct
      const productMetafields = metafields.map((metafield) => {
        const { namespace, key, type } = metafield;
        return {
          namespace,
          key,
          value: JSON.stringify(optimizedProduct.metafields[key]),
          type,
        };
      });

      const variables = {
        variables: {
          input: {
            id: product.platformId,
            title: optimizedProduct.title,
            descriptionHtml: optimizedProduct.descriptionHtml,
            metafields: productMetafields,
          },
        },
      };

      const client = await getClients(this.session);
      const response = await client.request(query, variables);

      console.log(
        "Response update product:",
        JSON.stringify(response, null, 2)
      );

      if (response.data.productUpdate.userErrors.length > 0) {
        console.error("User Errors:", response.data.productUpdate.userErrors);
        throw new Error(
          "Failed to update product in Shopify due to user errors"
        );
      }

      return response.data.productUpdate.product;
    } catch (error) {
      console.error("Error updating product in Shopify:", error);
      throw error;
    }
  }

  async getWebhooks(limit, cursor = null) {
    const query = `#graphql
        query ($numProducts: Int!, $cursor: String) {
          webhookSubscriptions(first: $numProducts, after: $cursor) {
            edges {
                node {
                  id
                  topic
                  endpoint {
                    __typename
                    ... on WebhookHttpEndpoint {
                      callbackUrl
                    }
                    ... on WebhookEventBridgeEndpoint {
                      arn
                    }
                    ... on WebhookPubSubEndpoint {
                      pubSubProject
                      pubSubTopic
                    }
                  }
                }
              }
                pageInfo {
                    hasNextPage
                }
            }
        }`;

    const variables = {
      variables: {
        numProducts: limit,
        cursor: cursor,
      },
    };

    const client = await getClients(this.session);
    const response = await client.request(query, variables);

    return response.data.webhookSubscriptions;
  }
}
