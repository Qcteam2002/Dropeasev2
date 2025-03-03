import { json } from "@remix-run/node";
import { useFetcher,useLoaderData, useNavigate } from "@remix-run/react";
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
  AppProvider,
  IndexTable,
  MediaCard,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate, getUser } from "../shopify.server";
import enTranslations from '@shopify/polaris/locales/en.json';
import {getProduct}  from "../models/PlatformProduct";


export const loader = async ({ request, params }) => {
  const { admin,session } = await authenticate.admin(request);
  const user = await getUser(request);
  console.log('Log params request', request.params);
  const productId = params.id;

  const product = await getProduct(productId);

  const serializedProduct = {
    ...product,
    id: product.id.toString(),
    userId: product.userId.toString(),
    sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
  };
  
  return json({
    product: serializedProduct,
  });
};

// [START row]
const ProductTableCard = ({ product }) => (
  <MediaCard
    portrait
      title={product.title}
      primaryAction={{
        content: 'Detail',
        onAction: () => navigate(`/product/detail/${product.io}`),
      }}
      description={product.title}
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
    >
      <img
        alt=""
        width="50%"  
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src={product.featuredMedia}
      />
    </MediaCard>
);
// [END row]

export default function Index() {
  const { product } = useLoaderData();
  const navigate = useNavigate();

  // [START page]
  return (
    <AppProvider i18n={enTranslations}>
    <Page>
      <ui-title-bar title="QR codes">
        <button variant="primary" onClick={() => navigate("/product")}>
          Create Product
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <ProductTableCard product={product} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    </AppProvider>
  );
  // [END page]
}
