"use client";

import { useState } from "react";
import {
  Upload,
  X,
  Plus,
  Minus,
  Sparkles,
  Loader2,
} from "lucide-react";

import type { ReadyProduct } from "./ReadyProducts";

type OrderFormProps = {
  readyProducts: ReadyProduct[];
  readyProductsTotal: number;
};

type ImageItem = {
  file: File;
  preview: string;
};

export default function OrderForm({
  readyProducts,
  readyProductsTotal,
}: OrderFormProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [qty, setQty] = useState(1);
  const [ai, setAi] = useState("no");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("Хөргөгчний наалт");
  const [size, setSize] = useState("53x80");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const price = 4500;

  const mainProductTotal = price * qty;
  const grandTotal = mainProductTotal + readyProductsTotal;

  // Олон зураг сонгох (preview зөвхөн, upload submit дээр хийгдэнэ)
  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    const newItems: ImageItem[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems].slice(0, 20));

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("Нэр болон утасны дугаараа оруулна уу");
      return;
    }

    if (images.length === 0) {
      alert("Дор хаяж 1 зураг оруулна уу");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("product", product);
      formData.append("size", size);
      formData.append("qty", String(qty));
      formData.append("ai", ai);
      formData.append("description", description);
      formData.append("grandTotal", String(grandTotal));

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Алдаа гарлаа");
      }

      alert("Захиалга амжилттай илгээгдлээ!");

      // Формыг цэвэрлэх
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
      setName("");
      setPhone("");
      setEmail("");
      setDescription("");
      setQty(1);
      setAi("no");
    } catch (err) {
      console.error(err);
      alert("Захиалга илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF8F5] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* ================= LEFT FORM ================= */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Захиалгын мэдээлэл
            </h2>

            <div className="space-y-5">

              {/* NAME */}
              <input
                type="text"
                placeholder="Нэр"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#ff6b6b]"
              />

              {/* PHONE */}
              <input
                type="tel"
                placeholder="Утасны дугаар"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#ff6b6b]"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Имэйл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#ff6b6b]"
              />

              {/* PRODUCT */}
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              >
                <option>Хөргөгчний наалт</option>
                <option>Бусад</option>
              </select>

              {/* SIZE */}
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              >
                <option>53x80</option>
                <option>Бусад</option>
              </select>

              {/* QUANTITY */}
              <div>
                <p className="mb-2 font-medium">
                  Тоо ширхэг
                </p>

                <div className="flex items-center gap-4">

                  <button
                    type="button"
                    onClick={() =>
                      setQty(Math.max(1, qty - 1))
                    }
                    className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="min-w-8 text-center text-lg font-semibold">
                    {qty}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQty(qty + 1)
                    }
                    className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>

                </div>
              </div>

              {/* AI */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles
                    size={18}
                    className="text-purple-500"
                  />

                  <p className="font-medium">
                    AI зургаа боловсруулах уу?
                  </p>
                </div>

                <div className="flex gap-6">

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="ai"
                      value="yes"
                      checked={ai === "yes"}
                      onChange={() => setAi("yes")}
                      className="accent-[#ff3434]"
                    />

                    <span>Тийм</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="ai"
                      value="no"
                      checked={ai === "no"}
                      onChange={() => setAi("no")}
                      className="accent-[#ff5353]"
                    />

                    <span>Үгүй</span>
                  </label>

                </div>
              </div>

              {/* DESCRIPTION */}
              <textarea
                placeholder="Нэмэлт тайлбар..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#ff6b6b]"
              />

              {/* SUBMIT */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b6b] py-3 font-semibold text-white transition hover:bg-[#fd4b4b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {submitting ? "Илгээж байна..." : "Захиалга илгээх"}
              </button>

            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Зураг оруулах
            </h2>

            {/* UPLOAD BOX */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:border-[#ff6b6b] hover:bg-[#feeaea]">

              <Upload
                size={45}
                className="text-[#ff6b6b]"
              />

              <p className="mt-4 font-medium">
                Зургаа энд оруулна уу
              </p>

              <p className="mt-2 text-sm text-gray-400">
                PNG, JPG • 20 зураг хүртэл
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleUpload}
              />

            </label>

            {/* IMAGE PREVIEW */}
            {images.length > 0 && (
              <div className="mt-8">

                <h3 className="mb-4 font-semibold">
                  Сонгосон зураг ({images.length})
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                  {images.map((img, index) => (
                    <div
                      key={`${img.preview}-${index}`}
                      className="group relative overflow-hidden rounded-xl border"
                    >

                      <img
                        src={img.preview}
                        alt={`Зураг ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow transition hover:bg-red-50"
                      >
                        <X
                          size={16}
                          className="text-gray-700"
                        />
                      </button>

                    </div>
                  ))}

                </div>
              </div>
            )}

            {/* ================= PRICE ================= */}

            <div className="mt-10 rounded-2xl bg-gray-50 p-5">

              {/* Үндсэн бүтээгдэхүүн */}
              <div className="flex justify-between text-gray-600">
                <span>
                  {product} × {qty}
                </span>

                <span>
                  {mainProductTotal.toLocaleString()}₮
                </span>
              </div>

              {/* Бэлэн бүтээгдэхүүнүүд */}
              {readyProducts.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">

                  <p className="mb-3 text-sm font-semibold text-gray-700">
                    Нэмсэн бүтээгдэхүүн
                  </p>

                  <div className="space-y-2">
                    {readyProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          {product.name} × {product.quantity}
                        </span>

                        <span>
                          {(
                            product.price *
                            product.quantity
                          ).toLocaleString()}₮
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* НИЙТ */}
              <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                <span>Нийт</span>

                <span>
                  {grandTotal.toLocaleString()}₮
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}