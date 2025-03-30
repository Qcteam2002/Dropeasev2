import fs from "fs";
import themeFiles from "./init_config.js";
import metafields from "./metafield_config.js";
import { join } from "path";
import { getClients } from "../server/services/shopifyApi";

export default class ShopifyInit {
  constructor(session) {
    this.mainTheme = null;
    this.session = session;
  }

  async init() {
    await this.initAsset();
  }

  async initAsset() {
    const mainTheme = await this.getMainTheme();
    if (!mainTheme) {
      console.error("Main theme not found");
      return;
    }

    this.mainTheme = mainTheme;
    this.createAsset();
    this.customProductTemplate();
    this.defineMetafield();
  }

  async getMainTheme() {
    const query = `#graphql
    query {
      themes(first: 1) {
          nodes{
            id
            name
            role 
          }
      }
    }
  `;

    // const response = await this.admin.graphql(query);

    const client = await getClients(this.session);
    const response = await client.request(query);

    const {
      data: {
        themes: { nodes },
      },
    } = response;

    return nodes.find((node) => node.role === "MAIN");
  }

  async createAsset() {
    const files = await this.makeContentAsset();
    this.createFile(files);
  }

  async createFile(files) {
    const themeId = this.mainTheme.id;

    const query = `#graphql
    mutation themeFilesUpsert($files: [OnlineStoreThemeFilesUpsertFileInput!]!, $themeId: ID!) {
      themeFilesUpsert(files: $files, themeId: $themeId) {
        upsertedThemeFiles {
      filename
    }
    userErrors {
      field
      message
    }
      }
    }
  `;

    // console.log(files);
    const variables = {
      variables: {
        themeId: themeId,
        files: files,
      },
    };

    // const response = await this.admin.graphql(query, variables);
    const client = await getClients(this.session);
    const response = await client.request(query,variables);

    const {
      data: {
        themeFilesUpsert: { upsertedThemeFiles, userErrors },
      },
    } = response;
  }

  async makeContentAsset() {
    const filePromises = themeFiles.map(async (file) => {
      const filePath = join(process.cwd(), file.source);
      const fileContent = await fs.promises.readFile(filePath, "base64"); // Đọc file bất đồng bộ
      return {
        filename: file.target,
        body: {
          type: "BASE64",
          value: fileContent,
        },
      };
    });

    const files = await Promise.all(filePromises);

    return files;
  }

  processThemeFileContent(fileContent) {
    const jsonContent = fileContent.replace(/\/\*[\s\S]*?\*\//, "");
    const jsonObject = JSON.parse(jsonContent);
    return jsonObject;
  }

  async customProductTemplate() {
    const filename = "templates/product.json";
    const productTemplate = await this.getFile(filename);
    const productObj = this.processThemeFileContent(
      productTemplate.body.content
    );
    const sections = themeFiles
      .filter((file) => file.type === "section")
      .map((file) => {
        return {
          type: file.name,
          settings: {},
        };
      });

    for (const sec of sections) {
      productObj.sections[`${sec.type}`] = sec;
      productObj.order.push(sec.type);
    }

    const jsonString = JSON.stringify(productObj);
    const files = [
      {
        filename: filename,
        body: {
          type: "TEXT",
          value: jsonString,
        },
      },
    ];
    this.createFile(files);
  }

  async getFile(filename) {
    const queryTheme = `#graphql
  query {
    theme(id: "${this.mainTheme.id}") {
      id
      name
      role
      files(filenames: ["${filename}"],first: 1) {
        nodes {
          body {
            ... on OnlineStoreThemeFileBodyText {
              content
            }
          }
        }
      }
    }
  }`;

    // const response = await this.admin.graphql(queryTheme);
    const client = await getClients(this.session);
    const response = await client.request(queryTheme);

    const {
      data: {
        theme: {
          files: {
            nodes: [firstNode],
          },
        },
      },
    } = response;

    return firstNode;
  }

  async createMetafield(metafield) {
    const query = `#graphql
  mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition {
        name
        namespace
        key
      }
      userErrors {
        field
        message
        code
      }
    }
  }`;

    const variables = {
      variables: {
        definition: {
          name: metafield.name,
          namespace: metafield.namespace,
          key: metafield.key,
          description: metafield.description,
          type: metafield.type,
          ownerType: metafield.ownerType,
          access: {
            admin: "PUBLIC_READ_WRITE",
            storefront: metafield.access.storefront,
          },
        },
      },
    };

    const client = await getClients(this.session);
    const response = await client.request(query,variables);

    // const {
    //   data: { metafieldDefinitionCreate },
    // } = response;
  }

  async defineMetafield() {
    console.log("Define metafield");
    for (const metafield of metafields) {
      await this.createMetafield(metafield);
    }
  }
}
