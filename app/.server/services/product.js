// import fs from "fs";
// import { join } from "path";
import db from "../../db.server";
import { syncProductQueue } from "../../queues/first_init";
// import metafields from "../../shopify_theme/metafield_config";

export default class ShopifyProduct {
  constructor(admin, session) {
    this.admin = admin;
    this.session = session;
    this.limit = 25;
    this.user = null;
  }

  async syncProducts(currentCursor) {
    const session = this.session;
    const admin = this.admin;
    this.user = await db.user.findUnique({
        where: {
            sessionId: session.id,
        },
    }); 
    const userId = this.user.id;
    console.log("User: ", this.user);

    const products = await this.getProducts(this.limit, currentCursor);
    // console.log("UserID: ", products);
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
          where: { userId_platformId: {userId: userId, platformId: product.id} },
          update: insertData,
          create: insertData,
        });
      }

      // Add a new job to the queue to process the next batch
      await syncProductQueue.add("sync_product", {
        admin,
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
                        onlineStoreUrl
                        status
                        publishedAt
                        handle
                        tags
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

    const response = await this.admin.graphql(query, variables);

    const {
      data: { products },
    } = await response.json();

    return products;
  }
}
