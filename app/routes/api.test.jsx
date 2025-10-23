import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  return json({
    message: "API test endpoint works!",
    timestamp: new Date().toISOString()
  });
};

export const action = async ({ request }) => {
  return json({
    message: "API POST test works!",
    timestamp: new Date().toISOString()
  });
};

