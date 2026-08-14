import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

cloudinary.config({
  cloud_name: process.env.CCNAME,
  api_key: process.env.CAPIKEY,
  api_secret: process.env.CAPISECRET,
});

export async function POST(req: NextRequest) {
  try {
    console.log("=== /api/orders POST эхэллээ ===");

    const formData = await req.formData();

    console.log("FormData keys:", [...formData.keys()]);
    console.log("images entries count:", formData.getAll("images").length);

    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const email = (formData.get("email") as string) || "";
    const product = (formData.get("product") as string) || "";
    const size = (formData.get("size") as string) || "";
    const qty = (formData.get("qty") as string) || "1";
    const ai = (formData.get("ai") as string) || "no";
    const description = (formData.get("description") as string) || "";
    const grandTotal = (formData.get("grandTotal") as string) || "0";

    const files = formData.getAll("images") as File[];

    if (files.length === 0) {
      console.log("❌ files.length === 0, буцаж байна");
      return NextResponse.json(
        { error: "Дор хаяж 1 зураг оруулна уу" },
        { status: 400 }
      );
    }

    const orderId = randomUUID();

    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        file.arrayBuffer().then((bytes) => {
          const buffer = Buffer.from(bytes);

          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: `soronz-orders/${orderId}`,
              quality: "auto:good",
              fetch_format: "auto",
              tags: ["order"],
              context: {
                orderId,
                name,
                phone,
                email,
                product,
                size,
                qty,
                ai,
                description,
                grandTotal,
                status: "pending",
              },
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
      });
    });

    const results = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      orderId,
      images: results,
    });
  } catch (err) {
    console.error("Order upload error:", err);
    return NextResponse.json(
      { error: "Захиалга илгээхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

type OrderRecord = {
  orderId: string;
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  size?: string;
  qty?: string;
  ai?: string;
  description?: string;
  grandTotal?: string;
  status?: string;
  createdAt?: string;
  images: string[];
};

export async function GET() {
  try {
    const result = await cloudinary.api.resources_by_tag("order", {
      context: true,
      max_results: 500,
    });

    const grouped: Record<string, OrderRecord> = {};

    for (const r of result.resources) {
      const ctx = r.context?.custom || {};
      const orderId = ctx.orderId || r.public_id;

      if (!grouped[orderId]) {
        grouped[orderId] = {
          orderId,
          name: ctx.name,
          phone: ctx.phone,
          email: ctx.email,
          product: ctx.product,
          size: ctx.size,
          qty: ctx.qty,
          ai: ctx.ai,
          description: ctx.description,
          grandTotal: ctx.grandTotal,
          status: ctx.status,
          createdAt: r.created_at,
          images: [],
        };
      }

      grouped[orderId].images.push(r.secure_url);
    }

    return NextResponse.json(Object.values(grouped));
  } catch (err) {
    console.error("Fetch orders error:", err);
    return NextResponse.json(
      { error: "Захиалгуудыг татахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}