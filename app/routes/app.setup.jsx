import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { SetupGuide } from "../components/SetupGuide";
import { buildDeeplinks } from "../utils/deeplinks";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  console.log("Session in loader:", session);
  const deeplinks = buildDeeplinks(session.shop);
  console.log("Generated deeplinks:", deeplinks);
  return json({ deeplinks });
};

export default function SetupPage() {
  return <SetupGuide />;
} 