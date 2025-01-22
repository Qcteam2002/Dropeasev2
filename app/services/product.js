import fs from "fs";
import { join } from "path";
import db from "../db.server";
import metafields from "../shopify_theme/metafield_config";

export default class ShopifyProduct {
  constructor(admin) {
    this.admin = admin;
    this.session = admin.session;
    this.limit = 25;
  }

  async syncProducts(currentCursor) {
    const products = await this.getProducts(this.limit, currentCursor);

    if (products.edges.length > 0) {
      // Store products in the database
      let lastCursor = null;
      for (const edge of products.edges) {
        const product = edge.node;
        lastCursor = edge.cursor;
        const insertData = {
          sourceProductId: product.id,
          userId: this.session.userId,
          metafields: product.metafields.edges,
          title: product.title,
          handle: product.handle,
          description: product.descriptionHtml,
          featuredMedia: product.featuredMedia.preview.image.url,
        };

        await db.PlatformProduct.upsert({
          where: { userId: this.session.userId, sourceProductId: product.id },
          update: insertData,
          create: insertData,
        });
      }

      // Add a new job to the queue to process the next batch
      await syncProductQueue.add("sync_product", {
        admin,
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
                                inventoryItem {
                                    id
                                    inventoryLevel() {
                                        id
                                        location {
                                            id
                                        }
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
        }
                `;

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
