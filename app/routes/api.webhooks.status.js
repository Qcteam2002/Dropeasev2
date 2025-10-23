import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
    return json({ 
        status: "ok", 
        message: "Webhooks are working properly",
        timestamp: new Date().toISOString()
    });
};

export const action = async ({ request }) => {
    return json({ 
        status: "ok", 
        message: "Webhook status updated",
        timestamp: new Date().toISOString()
    });
};



