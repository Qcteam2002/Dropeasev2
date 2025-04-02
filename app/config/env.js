import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Load .env.abc-app file
dotenv.config({ path: '.env.abc-app' });

// Export environment variables that are safe to expose to the client
export const clientEnv = {
  SHOPIFY_DEMO_THEME_EXT_ID: process.env.SHOPIFY_DEMO_THEME_EXT_ID,
};

// Export all environment variables for server-side use
export const serverEnv = {
  ...process.env,
}; 