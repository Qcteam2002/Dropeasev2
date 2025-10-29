/**
 * BILLING CALLBACK - Activate Immediately
 * Shopify redirects về đây sau khi user approve payment
 * 
 * CRITICAL: In embedded apps, activate subscription HERE in callback
 * Don't pass charge_id via query params or session - they get lost!
 * 
 * Flow:
 * 1. User approves on Shopify (top-level window)
 * 2. Shopify redirects here with charge_id
 * 3. ACTIVATE subscription immediately
 * 4. Redirect to pricing (pricing will fetch fresh data from DB)
 */

import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { BillingService } from "../server/services/billing";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const url = new URL(request.url);
  
  // Get charge_id từ Shopify (có thể là short form hoặc full GID)
  let chargeId = url.searchParams.get("charge_id");
  const planId = url.searchParams.get("planId");
  const interval = url.searchParams.get("interval") || "monthly";
  
  console.log("🔔 CALLBACK LOADER - Activate Immediately");
  console.log("🔗 Full URL:", url.href);
  console.log("📊 Raw charge_id from Shopify:", chargeId);
  
  // Convert short form to full GID nếu cần
  if (chargeId && !chargeId.startsWith("gid://")) {
    chargeId = `gid://shopify/AppSubscription/${chargeId}`;
    console.log("✅ Converted to full GID:", chargeId);
  }
  
  if (!chargeId) {
    console.error("❌ No charge_id found - redirecting to pricing");
    return redirect("/app/pricing");
  }
  
  // ACTIVATE SUBSCRIPTION IMMEDIATELY IN CALLBACK
  console.log("💳 Activating subscription NOW...");
  try {
    const billingService = new BillingService(admin, session);
    const activatedSubscription = await billingService.activateSubscription(chargeId);
    
    if (activatedSubscription) {
      console.log("✅ Subscription activated successfully!");
    } else {
      console.log("⏳ Subscription pending (will be activated via webhook)");
    }
  } catch (error) {
    console.error("❌ Error activating subscription:", error.message);
    // Continue anyway - webhook might handle it
  }
  
  console.log("🎯 Redirecting to /app/pricing");
  
  // Redirect to pricing page - it will fetch fresh data from DB
  return redirect("/app/pricing");
};

// This page should never render - loader always redirects
export default function BillingCallback() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: "#f6f6f7",
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #008060",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "24px",
      }}></div>
      <h2 style={{
        margin: 0,
        fontSize: "20px",
        fontWeight: 600,
        color: "#202223",
        marginBottom: "8px",
      }}>
        Redirecting...
      </h2>
      <p style={{
        margin: 0,
        fontSize: "14px",
        color: "#6d7175",
      }}>
        If you are not redirected, <a href="/app/pricing">click here</a>
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
