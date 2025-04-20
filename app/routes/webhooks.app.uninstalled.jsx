import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    // Tìm user dựa vào sessionId
    const user = await db.user.findFirst({
      where: { sessionId: session.id }
    });

    if (user) {
      // Xóa các bảng liên quan đến user
      await db.subscription.deleteMany({ where: { userId: user.id } });
      await db.subscriptionQuota.deleteMany({ where: { userId: user.id } });
      await db.usageLog.deleteMany({ where: { userId: user.id } });
      await db.paymentLog.deleteMany({ where: { userId: user.id } });
      await db.platformProduct.deleteMany({ where: { userId: user.id } });
      
      // Xóa user trước khi xóa session
      await db.user.delete({ where: { id: user.id } });
    }

    // Cuối cùng xóa session
    await db.session.deleteMany({ where: { shop } });
  }

  return new Response();
};
