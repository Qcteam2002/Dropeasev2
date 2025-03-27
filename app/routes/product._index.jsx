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
import { authenticate } from "../shopify.server";
import { firstInitQueue } from "../queues/first_init";
import UserServices  from "../server/services/user";
import ShopifyProduct  from "../server/services/product";


export const loader = async ({ request }) => {
  const { admin,session } = await authenticate.admin(request);
  const user = await getUser(request);
  console.log("Day là user ne",user);
  const products = await getProducts(user.id);

  // Convert BigInt values to strings
  const serializedProducts = products.map(product => ({
    ...product,
    id: product.id.toString(),
    userId: product.userId.toString(),
    sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
  }));


  return json({
    products: serializedProducts,
  });
};

// [START empty]
const EmptyProductState = ({ onAction }) => (
  <EmptyState
    heading="Products"
    action={{
      content: "Create Product",
      onAction,
    }}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Empty list</p>
  </EmptyState>
);
// [END empty]

// [START table]
const ProductTable = ({ products }) => (
    products.map((product) => (
      <ProductTableCard key={product.id} product={product} />
    ))
);
// [END table]

// [START row]
const ProductTableCard = ({ product }) => (
  <MediaCard
    portrait
      title={product.title}
      primaryAction={{
        content: 'Detail',
        onAction: () => navigate(`/product/detail/${product.id}`),
      }}
      description={product.title}
      popoverActions={[{content: 'Dismiss', onAction: () => navigate(`/product/detail/${product.id}`)}]}
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
      <a href={`/product/detail/${product.id}`}>Xem chi tiết</a>
    </MediaCard>
);
// [END row]

export default function Index() {
  const { products } = useLoaderData();
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
            {products.length === 0 ? (
              <EmptyProductState onAction={() => navigate("/product")} />
            ) : (
              <ProductTable products={products} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    </AppProvider>
  );
  // [END page]
}
