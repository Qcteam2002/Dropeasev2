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

  
}
