"use client";

import { Plus } from "lucide-react";

export type ReadyProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const products = [
  {
    id: "luffy",
    name: "Luffy",
    price: 4500,
    image: "/image/luffy.jpg",
  },
  {
    id: "saikhanii-hutul",
    name: "сайхны хөтөл",
    price: 4500,
    image: "/image/saihanii-hotol.jpg",
  },
  {
    id: "elsen-tasarhai",
    name: "Монгол байгаль",
    price: 4500,
    image: "/image/elsen-tasarhai.jpg",
  },
  {
    id: "altai-tawan-bogd",
    name: "Алтай таван богд",
    price: 4500,
    image: "/image/altai-5n-bogd.jpg",
  },
];

type ReadyProductsProps = {
  onAdd: (product: ReadyProduct) => void;
};

export default function ReadyProducts({
  onAdd,
}: ReadyProductsProps) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Бэлэн бүтээгдэхүүн
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Таалагдсан бүтээгдэхүүнээ сонгоод захиалгадаа нэмээрэй.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-slate-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />

            <div className="p-3">
              <h3 className="text-sm font-bold">
                {product.name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-[#ff6b6b]">
                {product.price.toLocaleString()}₮
              </p>

              <button
                type="button"
                onClick={() =>
                  onAdd({
                    ...product,
                    quantity: 1,
                  })
                }
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-[#ff6b6b] py-2 text-sm font-bold text-white transition hover:bg-[#ff5757]"
              >
                <Plus size={16} />
                Нэмэх
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}