import { json } from "@remix-run/node";
import { useFetcher,useLoaderData, Link, useNavigate } from "@remix-run/react";
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
import { authenticate, user } from "../shopify.server";

import {getProducts}  from "../models/PlatformProduct";


export const loader = async ({ request }) => {
  const { admin,session } = await authenticate.admin(request);
  // const user = user(request);
  console.log(user);
  const products = await getProducts(user);

  return json({
    products,
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
  <IndexTable
    resourceName={{
      singular: "Product",
      plural: "Products",
    }}
    itemCount={products.length}
    headings={[
      { title: "Thumbnail", hidden: true },
      { title: "Title" },
      { title: "Date created" },
    ]}
    selectable={false}
  >
    {products.map((product) => (
      <ProductTableCard key={product.id} product={product} />
    ))}
  </IndexTable>
);
// [END table]

// [START row]
const ProductTableCard = ({ product }) => (
  <IndexTable.Row id={qrCode.id} position={qrCode.id}>
    <IndexTable.Cell>
      <Thumbnail
        source={qrCode.productImage || ImageIcon}
        alt={qrCode.productTitle}
        size="small"
      />
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Link to={`qrcodes/${qrCode.id}`}>{truncate(qrCode.title)}</Link>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {/* [START deleted] */}
      {qrCode.productDeleted ? (
        <InlineStack align="start" gap="200">
          <span style={{ width: "20px" }}>
            <Icon source={AlertDiamondIcon} tone="critical" />
          </span>
          <Text tone="critical" as="span">
            product has been deleted
          </Text>
        </InlineStack>
      ) : (
        truncate(qrCode.productTitle)
      )}
      {/* [END deleted] */}
    </IndexTable.Cell>
    <IndexTable.Cell>
      {new Date(qrCode.createdAt).toDateString()}
    </IndexTable.Cell>
    <IndexTable.Cell>{qrCode.scans}</IndexTable.Cell>
  </IndexTable.Row>
);
// [END row]

export default function Index() {
  const { products } = useLoaderData();
  const navigate = useNavigate();

  // [START page]
  return (
    <Page>
      <ui-title-bar title="QR codes">
        <button variant="primary" onClick={() => navigate("/product")}>
          Create Product
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            {qrCodes.length === 0 ? (
              <EmptyProductState onAction={() => navigate("/product")} />
            ) : (
              <ProductTable products={products} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
  // [END page]
}
