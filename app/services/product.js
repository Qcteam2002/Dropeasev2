import fs from "fs";
import { join } from "path";

export default class ShopifyProduct {
  constructor(admin) {
    this.admin = admin;
  }

  async getProducts() {
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
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
                `;

        

  }
}
