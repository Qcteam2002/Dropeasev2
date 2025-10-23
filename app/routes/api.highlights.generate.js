import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const productId = formData.get("productId");
    const layout = formData.get("layout") || "zigzag";

    if (!productId) {
        return json({ error: "Product ID is required" }, { status: 400 });
    }

    try {
        // Get product data for AI generation
        const query = `
            query getProduct($id: ID!) {
                product(id: $id) {
                    id
                    title
                    description
                    productType
                    vendor
                    tags
                    metafields(first: 20, namespace: "custom") {
                        edges {
                            node {
                                key
                                value
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
            method: "POST",
            headers: {
                "X-Shopify-Access-Token": session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                query,
                variables: { id: productId }
            }),
        });

        const result = await response.json();
        
        if (result.errors) {
            return json({ error: "Failed to fetch product data" }, { status: 500 });
        }

        const product = result.data?.product;
        
        // Generate AI content based on product data
        const highlights = generateHighlights(product, layout);
        
        // Save generated content to metafields
        const mutation = `
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    metafields { id key namespace }
                    userErrors { field message }
                }
            }
        `;

        const variables = {
            metafields: [{
                namespace: "custom",
                key: "gridview_content",
                type: "json",
                value: JSON.stringify(highlights),
                ownerId: productId,
            }],
        };

        const saveResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
            method: "POST",
            headers: {
                "X-Shopify-Access-Token": session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: mutation, variables }),
        });

        const saveResult = await saveResponse.json();
        
        if (saveResult.errors || saveResult.data?.metafieldsSet?.userErrors?.length > 0) {
            console.error("Failed to save highlights:", saveResult.errors || saveResult.data.metafieldsSet.userErrors);
            // Still return the generated content even if save fails
        }

        return json({ 
            success: true, 
            highlights,
            layout 
        });

    } catch (error) {
        console.error("Error generating highlights:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};

// AI Content Generation Logic
function generateHighlights(product, layout) {
    const { title, description, productType, vendor, tags } = product;
    
    // Extract key features from product data
    const features = extractFeatures(description, productType, tags);
    
    // Generate highlights based on layout
    switch (layout) {
        case "multirow":
            return generateMultirowHighlights(features, title);
        case "zigzag":
        case "stacked":
            return generateStandardHighlights(features, title);
        case "grid-2x2":
            return generateGridHighlights(features, title, 4);
        case "grid-3x1":
            return generateGridHighlights(features, title, 3);
        case "timeline":
            return generateTimelineHighlights(features, title);
        case "comparison":
            return generateComparisonHighlights(features, title);
        default:
            return generateStandardHighlights(features, title);
    }
}

function extractFeatures(description, productType, tags) {
    const features = [];
    
    // Extract from description
    if (description) {
        const desc = description.toLowerCase();
        
        if (desc.includes("premium") || desc.includes("high quality")) {
            features.push({
                icon: "⭐",
                title: "Premium Quality",
                description: "Made with the finest materials for exceptional durability and comfort."
            });
        }
        
        if (desc.includes("fast") || desc.includes("quick") || desc.includes("express")) {
            features.push({
                icon: "🚀",
                title: "Fast Delivery",
                description: "Quick and reliable shipping to get your order to you fast."
            });
        }
        
        if (desc.includes("warranty") || desc.includes("guarantee")) {
            features.push({
                icon: "🛡️",
                title: "Warranty Included",
                description: "Full warranty coverage for peace of mind with your purchase."
            });
        }
        
        if (desc.includes("unique") || desc.includes("exclusive") || desc.includes("limited")) {
            features.push({
                icon: "💎",
                title: "Exclusive Design",
                description: "Unique and distinctive design that stands out from the crowd."
            });
        }
        
        if (desc.includes("eco") || desc.includes("sustainable") || desc.includes("organic")) {
            features.push({
                icon: "🌱",
                title: "Eco-Friendly",
                description: "Environmentally conscious materials and sustainable production."
            });
        }
        
        if (desc.includes("easy") || desc.includes("simple") || desc.includes("convenient")) {
            features.push({
                icon: "✨",
                title: "Easy to Use",
                description: "Simple and intuitive design for effortless everyday use."
            });
        }
    }
    
    // Add product type specific features
    if (productType) {
        const type = productType.toLowerCase();
        
        if (type.includes("jewelry") || type.includes("accessory")) {
            features.push({
                icon: "💍",
                title: "Elegant Style",
                description: "Sophisticated design perfect for any occasion."
            });
        }
        
        if (type.includes("clothing") || type.includes("apparel")) {
            features.push({
                icon: "👕",
                title: "Comfortable Fit",
                description: "Designed for comfort and style in everyday wear."
            });
        }
        
        if (type.includes("electronic") || type.includes("tech")) {
            features.push({
                icon: "⚡",
                title: "Advanced Technology",
                description: "Cutting-edge technology for superior performance."
            });
        }
    }
    
    // Add tag-based features
    if (tags && tags.length > 0) {
        const tagString = tags.join(" ").toLowerCase();
        
        if (tagString.includes("gift") || tagString.includes("present")) {
            features.push({
                icon: "🎁",
                title: "Perfect Gift",
                description: "Ideal gift choice for any special occasion."
            });
        }
        
        if (tagString.includes("sale") || tagString.includes("discount")) {
            features.push({
                icon: "💰",
                title: "Great Value",
                description: "Exceptional quality at an unbeatable price."
            });
        }
    }
    
    // Ensure we have at least 3 features
    while (features.length < 3) {
        features.push({
            icon: "✨",
            title: "Quality Assured",
            description: "Carefully crafted with attention to detail and quality."
        });
    }
    
    return features.slice(0, 6); // Max 6 features
}

function generateMultirowHighlights(features, productTitle) {
    const highlights = [
        {
            id: 1,
            title: "Premium Quality Materials",
            description: "Made with the finest materials for lasting durability and comfort. This product features high-quality construction that ensures long-term satisfaction and exceptional value.",
            icon: "⭐"
        },
        {
            id: 2,
            title: "Perfect Fit & Style",
            description: "Designed to flatter your figure with a comfortable, tailored fit that works for any occasion. The versatile design adapts to your lifestyle seamlessly.",
            icon: "👕"
        },
        {
            id: 3,
            title: "Easy Care & Maintenance",
            description: "Machine washable and wrinkle-resistant for effortless maintenance and long-lasting beauty. Spend less time caring and more time enjoying your purchase.",
            icon: "🧺"
        }
    ];

    return highlights;
}

function generateStandardHighlights(features, productTitle) {
    return features.map((feature, index) => ({
        id: index + 1,
        ...feature
    }));
}

function generateGridHighlights(features, productTitle, count) {
    return features.slice(0, count).map((feature, index) => ({
        id: index + 1,
        ...feature
    }));
}

function generateTimelineHighlights(features, productTitle) {
    return features.map((feature, index) => ({
        id: index + 1,
        ...feature,
        step: index + 1
    }));
}

function generateComparisonHighlights(features, productTitle) {
    return features.map((feature, index) => ({
        id: index + 1,
        ...feature,
        comparison: true
    }));
}
