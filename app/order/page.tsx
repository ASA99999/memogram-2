"use client";

import { useState } from "react";
import ReadyProducts, {
  ReadyProduct,
} from "@/components/ReadyProducts";
import OrderForm from "@/components/OrderForm";

export default function OrderPage() {
  const [readyProducts, setReadyProducts] = useState<
    ReadyProduct[]
  >([]);

  const addReadyProduct = (product: ReadyProduct) => {
    setReadyProducts((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      // Хэрэв өмнө нь нэмэгдсэн бол тоог +1 болгоно
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Шинэ бүтээгдэхүүн
      return [...prev, product];
    });
  };

  // Бэлэн бүтээгдэхүүнүүдийн нийт үнэ
  const readyProductsTotal = readyProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#FFF8F5] px-4 py-16">
      <div className="mx-auto max-w-7xl">

        {/* TITLE */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#FFE8E2] px-4 py-2 text-sm font-semibold text-[#ff6b6b]">
            Захиалга
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
            Захиалга өгөх
          </h1>

          <p className="mt-3 text-slate-500">
            Өөрийн хүссэн бүтээгдэхүүнээ хялбархан захиалаарай.
          </p>
        </div>

        {/* ORDER FORM */}
        <OrderForm
          readyProducts={readyProducts}
          readyProductsTotal={readyProductsTotal}
        />

        {/* READY PRODUCTS */}
        <div className="mt-8">
          <ReadyProducts onAdd={addReadyProduct} />
        </div>

      </div>
    </main>
  );
}