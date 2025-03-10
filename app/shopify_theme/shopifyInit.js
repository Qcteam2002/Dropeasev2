import fs from "fs";
import themeFiles from "./init_config.js";
import metafields from "./metafield_config.js";
import { join } from "path";

export default class ShopifyInit {
  constructor(admin) {
    console.log("🚀 ShopifyInit class instantiated!"); // Kiểm tra xem class có khởi tạo không
    this.admin = admin;
    this.mainTheme = null;
  }

  async init() {
    console.log("🔥 Running init()...");
    await this.initAsset();
    console.log("✅ Finished init()");

  }

  async initAsset() {
    console.log("📢 Initializing Asset...");
    const mainTheme = await this.getMainTheme();
    if (!mainTheme) {
      console.error("Main theme not found");
      return;
    }

    this.mainTheme = mainTheme;
    this.createAsset();
    this.customProductTemplate();
    this.defineMetafield();
    console.log("🎨 Define metafield run");
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

    const response = await this.admin.graphql(query);

    const {
      data: {
        themes: { nodes },
      },
    } = await response.json();

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

    const response = await this.admin.graphql(query, variables);

    const {
      data: {
        themeFilesUpsert: { upsertedThemeFiles, userErrors },
      },
    } = await response.json();

    // console.log("errors", userErrors);
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
    // console.log(jsonContent);

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

    // console.log(jsonString);
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

    // console.log(queryTheme);

    const response = await this.admin.graphql(queryTheme);

    const {
      data: {
        theme: {
          files: {
            nodes: [firstNode],
          },
        },
      },
    } = await response.json();

    return firstNode;
  }

  async createMetafield(metafield) {
    console.log(`🚀 Sending request to create Metafield: ${metafield.namespace}.${metafield.key}`);
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

    console.log("📤 GraphQL Mutation Variables:", JSON.stringify(variables, null, 2));
    const response = await this.admin.graphql(query, variables);

    const {
      data: {
        metafieldDefinitionCreate
      },
    } = await response.json();
    console.log("metafieldDefinitionCreate", metafieldDefinitionCreate);
  }

  async defineMetafield() {
    console.log("📢 Starting defineMetafield...");
    console.log("🔎 Metafield list:", metafields);
    for (const metafield of metafields) { 
      console.log(`⏳ Creating Metafield: namespace=${metafield.namespace}, key=${metafield.key}`);
      await this.createMetafield(metafield);
    }
  }
}
