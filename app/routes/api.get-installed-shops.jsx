import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loader({ request }) {
  try {
    // Lấy tất cả shops đã cài app (có session active)
    const sessions = await prisma.session.findMany({
      where: {
        accessToken: {
          not: null
        }
      },
      select: {
        shop: true,
        isOnline: true,
        scope: true,
        // Không trả về access token vì lý do bảo mật
      },
      orderBy: {
        shop: 'asc'
      }
    });

    return json({
      shops: sessions.map(session => ({
        shop: session.shop,
        isActive: session.isOnline,
        scope: session.scope,
      })),
      total: sessions.length
    });
  } catch (error) {
    console.error("Error fetching installed shops:", error);
    return json({ error: "Failed to fetch installed shops" }, { status: 500 });
  }
} 