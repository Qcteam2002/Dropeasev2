import { json } from "@remix-run/node";
import shopify from "../shopify.server";

export const action = async ({ request }) => {
    try {
        // ✅ Xác thực request để lấy session
        const { session } = await shopify.authenticate.admin(request);
        if (!session) {
            return json({ success: false, message: "❌ Không tìm thấy session" }, { status: 401 });
        }

        const client = new shopify.api.clients.Graphql({ session });


        // ✅ Định nghĩa Metafield
        const metafields = [
            {
                namespace: "gridviewname",
                key: "gridviewkey",
                name: "gridview",
                type: "json",
                description: "Grid View configuration for product display",
                ownerType: "PRODUCT",
                access: { storefront: "PUBLIC_READ" }
            }
        ];

        for (const metafield of metafields) {
            const query = `
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

            const variables = { definition: metafield };
            const response = await client.query({ data: { query, variables } });

            if (response.body.data.metafieldDefinitionCreate.userErrors.length > 0) {
                return json({ success: false, message: `Lỗi tạo metafield: ${JSON.stringify(response.body.data.metafieldDefinitionCreate.userErrors)}` });
            }
        }

        return json({ success: true, message: "✅ Tạo Metafield thành công" });

    } catch (error) {
        console.error("❌ Lỗi khi tạo Metafield:", error);
        return json({ success: false, message: error.message });
    }
};
