"use client";

import { useState } from "react";
import {
  Upload,
  X,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

export default function OrderForm() {
  const [images, setImages] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [ai, setAi] = useState("no");
  const price = 4500;
  // Олон зураг upload хийх
  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) =>
      [...prev, ...urls].slice(0, 20)
    );
    e.target.value = "";
  };
  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* TITLE */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Захиалга өгөх
          </h1>

          <p className="mt-3 text-gray-500">
            Өөрийн хүссэн бүтээгдэхүүнээ хялбархан
            захиалаарай.
          </p>
        </div>

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
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400"
              />

              {/* PHONE */}
              <input
                type="tel"
                placeholder="Утасны дугаар"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Имэйл"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400"
              />

              {/* PRODUCT */}
              <select
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
              >
                <option>Хөргөгчний наалт</option>
                <option>Бусад</option>
              </select>

              {/* SIZE */}
              <select
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
                      className="accent-blue-600"
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
                      className="accent-blue-600"
                    />

                    <span>Үгүй</span>
                  </label>

                </div>
              </div>

              {/* DESCRIPTION */}
              <textarea
                placeholder="Нэмэлт тайлбар..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-400"
              />

              {/* SUBMIT */}
              <button
                type="button"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Захиалга илгээх
              </button>

            </div>
          </div>

          {/* ================= RIGHT UPLOAD ================= */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Зураг оруулах
            </h2>

            {/* UPLOAD BOX */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:border-blue-400 hover:bg-blue-50">

              <Upload
                size={45}
                className="text-blue-500"
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
                      key={`${img}-${index}`}
                      className="group relative overflow-hidden rounded-xl border"
                    >

                      <img
                        src={img}
                        alt={`Зураг ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />

                      {/* REMOVE */}
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

            {/* PRICE */}
            <div className="mt-10 rounded-2xl bg-gray-50 p-5">

              <div className="flex justify-between text-gray-600">
                <span>Нэгж үнэ</span>

                <span>
                  {price.toLocaleString()}₮
                </span>
              </div>

              <div className="mt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Нийт</span>

                <span>
                  {(price * qty).toLocaleString()}₮
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}