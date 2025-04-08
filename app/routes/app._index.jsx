import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
// import { firstInitQueue } from "../queues/first_init";
// import UserServices  from "../server/services/user";
import ShopifyProduct from "../server/services/product";
// import {shopify, clients} from "../server/services/shopifyApi";
// import {shopifyApi, LATEST_API_VERSION, ApiVersion} from '@shopify/shopify-api';
import { getFirstProduct } from "../models/PlatformProduct";
import { clientEnv } from "../config/env";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  const shopifyProductService = new ShopifyProduct(session);
  // await shopifyProductService.syncProducts();

  // const client = new shopify.clients.Graphql({session});
  // console.log("Client ne: ", client);
  // const deeplinkUrl = `https://${session.shop}/admin/themes/current/editor?context=apps&template=product&activateAppId=${clientEnv.SHOPIFY_DEMO_THEME_EXT_ID}/star_rating`;
  const deeplinkUrl = `https://${session.shop}/admin/themes/current/editor?template=product&addAppBlockId=${clientEnv.SHOPIFY_DEMO_THEME_EXT_ID}/star_rating&target=newAppsSection`;
  console.log("Deeplink URL:", deeplinkUrl);

  const platformProduct = await getFirstProduct();
  console.log("Platform product:", platformProduct);
  shopifyProductService
    .updateProductShopify(platformProduct)
    .then((shopifyProduct) => {
      console.log("Product created in Shopify:", shopifyProduct);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return null;
};

export const action = async ({ request }) => {};

export default function Index() {
  // const { deeplinkUrl, themeExtId } = useLoaderData();
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );

  useEffect(() => {
    if (productId && shopify?.toast) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);

  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page>
      <TitleBar title="Remix app template">
        <button variant="primary" onClick={generateProduct}>
          Generate a product
        </button>
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Congrats on creating a new Shopify app 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This embedded app template uses{" "}
                    <Link
                      url="https://shopify.dev/docs/apps/tools/app-bridge"
                      target="_blank"
                      removeUnderline
                    >
                      App Bridge
                    </Link>{" "}
                    interface examples like an{" "}
                    <Link url="/app/additional" removeUnderline>
                      additional page in the app nav
                    </Link>
                    , as well as an{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql"
                      target="_blank"
                      removeUnderline
                    >
                      Admin GraphQL
                    </Link>{" "}
                    mutation demo, to provide a starting point for app
                    development.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Get started with products
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Generate a product with GraphQL and get the JSON output for
                    that product. Learn more about the{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
                      target="_blank"
                      removeUnderline
                    >
                      productCreate
                    </Link>{" "}
                    mutation in our API references.
                  </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProduct}>
                    Generate a product
                  </Button>
                  {fetcher.data?.product && (
                    <Button
                      url={`shopify:admin/products/${productId}`}
                      target="_blank"
                      variant="plain"
                    >
                      View product
                    </Button>
                  )}
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}


// import { useEffect } from "react";
// import { json } from "@remix-run/node";
// import { useFetcher } from "@remix-run/react";
// import {
//   Page,
//   Layout,
//   Text,
//   Card,
//   Button,
//   BlockStack,
//   Box,
//   List,
//   Link,
//   InlineStack,
// } from "@shopify/polaris";
// import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
// import { authenticate } from "../shopify.server";
// import { firstInitQueue } from "../queues/first_init";
// import UserServices  from "../.server/services/user";
// import ShopifyProduct  from "../.server/services/product";


// export const loader = async ({ request }) => {
//   const { admin,session } = await authenticate.admin(request);

//   const shopifyProductService = new ShopifyProduct(admin,session);
//   await shopifyProductService.syncProducts();

//   return null;
// };

// export const action = async ({ request }) => {
// };

// export default function Index() {
//   const fetcher = useFetcher();
//   const shopify = useAppBridge();
//   const isLoading =
//     ["loading", "submitting"].includes(fetcher.state) &&
//     fetcher.formMethod === "POST";
//   const productId = fetcher.data?.product?.id.replace(
//     "gid://shopify/Product/",
//     "",
//   );

//   useEffect(() => {
//     if (productId) {
//       shopify.toast.show("Product created");
//     }
//   }, [productId, shopify]);
//   const generateProduct = () => fetcher.submit({}, { method: "POST" });

//   return (
//     <Page>
//       <TitleBar title="Remix app template">
//         <button variant="primary" onClick={generateProduct}>
//           Generate a product
//         </button>
//       </TitleBar>
//       <BlockStack gap="500">
//         <Layout>
//           <Layout.Section>
//             <Card>
//               <BlockStack gap="500">
//                 <BlockStack gap="200">
//                   <Text as="h2" variant="headingMd">
//                     Congrats on creating a new Shopify app 🎉
//                   </Text>
//                   <Text variant="bodyMd" as="p">
//                     This embedded app template uses{" "}
//                     <Link
//                       url="https://shopify.dev/docs/apps/tools/app-bridge"
//                       target="_blank"
//                       removeUnderline
//                     >
//                       App Bridge
//                     </Link>{" "}
//                     interface examples like an{" "}
//                     <Link url="/app/additional" removeUnderline>
//                       additional page in the app nav
//                     </Link>
//                     , as well as an{" "}
//                     <Link
//                       url="https://shopify.dev/docs/api/admin-graphql"
//                       target="_blank"
//                       removeUnderline
//                     >
//                       Admin GraphQL
//                     </Link>{" "}
//                     mutation demo, to provide a starting point for app
//                     development.
//                   </Text>
//                 </BlockStack>
//                 <BlockStack gap="200">
//                   <Text as="h3" variant="headingMd">
//                     Get started with products
//                   </Text>
//                   <Text as="p" variant="bodyMd">
//                     Generate a product with GraphQL and get the JSON output for
//                     that product. Learn more about the{" "}
//                     <Link
//                       url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
//                       target="_blank"
//                       removeUnderline
//                     >
//                       productCreate
//                     </Link>{" "}
//                     mutation in our API references.
//                   </Text>
//                 </BlockStack>
//                 <InlineStack gap="300">
//                   <Button loading={isLoading} onClick={generateProduct}>
//                     Generate a product
//                   </Button>
//                   {fetcher.data?.product && (
//                     <Button
//                       url={`shopify:admin/products/${productId}`}
//                       target="_blank"
//                       variant="plain"
//                     >
//                       View product
//                     </Button>
//                   )}
//                 </InlineStack>
//                 {fetcher.data?.product && (
//                   <>
//                     <Text as="h3" variant="headingMd">
//                       {" "}
//                       productCreate mutation
//                     </Text>
//                     <Box
//                       padding="400"
//                       background="bg-surface-active"
//                       borderWidth="025"
//                       borderRadius="200"
//                       borderColor="border"
//                       overflowX="scroll"
//                     >
//                       <pre style={{ margin: 0 }}>
//                         <code>
//                           {JSON.stringify(fetcher.data.product, null, 2)}
//                         </code>
//                       </pre>
//                     </Box>
//                     <Text as="h3" variant="headingMd">
//                       {" "}
//                       productVariantsBulkUpdate mutation
//                     </Text>
//                     <Box
//                       padding="400"
//                       background="bg-surface-active"
//                       borderWidth="025"
//                       borderRadius="200"
//                       borderColor="border"
//                       overflowX="scroll"
//                     >
//                       <pre style={{ margin: 0 }}>
//                         <code>
//                           {JSON.stringify(fetcher.data.variant, null, 2)}
//                         </code>
//                       </pre>
//                     </Box>
//                   </>
//                 )}
//               </BlockStack>
//             </Card>
//           </Layout.Section>
//           <Layout.Section variant="oneThird">
//             <BlockStack gap="500">
//               <Card>
//                 <BlockStack gap="200">
//                   <Text as="h2" variant="headingMd">
//                     App template specs
//                   </Text>
//                   <BlockStack gap="200">
//                     <InlineStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         Framework
//                       </Text>
//                       <Link
//                         url="https://remix.run"
//                         target="_blank"
//                         removeUnderline
//                       >
//                         Remix
//                       </Link>
//                     </InlineStack>
//                     <InlineStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         Database
//                       </Text>
//                       <Link
//                         url="https://www.prisma.io/"
//                         target="_blank"
//                         removeUnderline
//                       >
//                         Prisma
//                       </Link>
//                     </InlineStack>
//                     <InlineStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         Interface
//                       </Text>
//                       <span>
//                         <Link
//                           url="https://polaris.shopify.com"
//                           target="_blank"
//                           removeUnderline
//                         >
//                           Polaris
//                         </Link>
//                         {", "}
//                         <Link
//                           url="https://shopify.dev/docs/apps/tools/app-bridge"
//                           target="_blank"
//                           removeUnderline
//                         >
//                           App Bridge
//                         </Link>
//                       </span>
//                     </InlineStack>
//                     <InlineStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         API
//                       </Text>
//                       <Link
//                         url="https://shopify.dev/docs/api/admin-graphql"
//                         target="_blank"
//                         removeUnderline
//                       >
//                         GraphQL API
//                       </Link>
//                     </InlineStack>
//                   </BlockStack>
//                 </BlockStack>
//               </Card>
//               <Card>
//                 <BlockStack gap="200">
//                   <Text as="h2" variant="headingMd">
//                     Next steps
//                   </Text>
//                   <List>
//                     <List.Item>
//                       Build an{" "}
//                       <Link
//                         url="https://shopify.dev/docs/apps/getting-started/build-app-example"
//                         target="_blank"
//                         removeUnderline
//                       >
//                         {" "}
//                         example app
//                       </Link>{" "}
//                       to get started
//                     </List.Item>
//                     <List.Item>
//                       Explore Shopify's API with{" "}
//                       <Link
//                         url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
//                         target="_blank"
//                         removeUnderline
//                       >
//                         GraphiQL
//                       </Link>
//                     </List.Item>
//                   </List>
//                 </BlockStack>
//               </Card>
//             </BlockStack>
//           </Layout.Section>
//         </Layout>
//       </BlockStack>
//     </Page>
//   );
// }
