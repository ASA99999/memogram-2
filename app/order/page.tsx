"use client";

import { useState } from "react";
import {
  Upload,
  X,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

export default function OrderPage() {

  const [images, setImages] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [ai, setAi] = useState("no");
  const price = 4500;
  // Олон зураг upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [
      ...prev,
      ...urls
    ].slice(0, 20));
  };
  // зураг устгах
  const removeImage = (index: number) => {

    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Захиалга өгөх
          </h1>
          <p className="mt-3 text-gray-500">
            Өөрийн хүссэн бүтээгдэхүүнээ хялбархан захиалаарай.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT FORM */}
          <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Захиалгын мэдээлэл
            </h2>
            <div className="space-y-5">
              <input
                placeholder="Нэр"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
              />
              <input
                placeholder="Утасны дугаар"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
              />
              <input
                placeholder="Имэйл"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
              />
              <select
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              >
                <option>
                  Хөргөгчний наалт
                </option>
                <option>
                  Бусад
                </option>

              </select>
              <select
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              >
                <option>
                  53x80
                </option>
                <option>
                  бусад
                </option>
              </select>
              {/* quantity */}

              <div>
                <p className="mb-2 font-medium">
                  Тоо ширхэг
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="rounded-lg border p-2"
                  >
                    <Minus size={18} />

                  </button>
                  <span className="text-lg font-semibold">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="rounded-lg border p-2"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              {/* AI */}
              <div>

                <p className="mb-2 font-medium">
                  AI зургаа боловсруулах уу?
                </p>


                <div className="flex gap-5">

                  <label>
                    <input
                      type="radio"
                      name="ai"
                      checked={ai === "yes"}
                      onChange={() => setAi("yes")}
                    />
                    {" "}Тийм
                  </label>


                  <label>
                    <input
                      type="radio"
                      name="ai"
                      checked={ai === "no"}
                      onChange={() => setAi("no")}
                    />
                    {" "}Үгүй
                  </label>
                </div>
              </div>
              <textarea
                placeholder="Нэмэлт тайлбар..."
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
              <button
                className=" w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
              >
                Захиалга илгээх
              </button>
            </div>
          </div>
          {/* RIGHT UPLOAD */}
          <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Зураг оруулах
            </h2>
            <label
              className=" flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <Upload
                size={45}
                className="text-blue-500"
              />
              <p className="mt-4 font-medium">
                Зургаа энд оруулна уу
              </p>
              <p className="text-sm text-gray-400 mt-2">
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

            {/* preview */}
            {
              images.length > 0 &&
              <div className="mt-8">
                <h3 className="font-semibold mb-4">
                  Сонгосон зураг ({images.length})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {
                    images.map((img, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-xl border"
                      >
                        <img
                          src={img}
                          className="h-32 w-full object-cover "
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className=" absolute right-2 top-2 rounded-full bg-white p-1 shadow hover:bg-red-50"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            }

            {/* price */}
            <div className="mt-10 rounded-xl bg-gray-50 p-5">
              <div className="flex justify-between">
                <span>
                  Үнэ
                </span>
                <span>
                  {price.toLocaleString()}₮
                </span>
              </div>
              <div className="flex justify-between mt-3 font-bold text-lg">
                <span>
                  Нийт
                </span>
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