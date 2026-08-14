import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  { title: "Luffy", image: "/image/luffy.jpg", category: "Anime", price: "4,500₮" },
  { title: "сайхны хөтөл", image: "/image/saihanii-hotol.jpg", category: "Nature", price: "4,500₮" },
  { title: "Goku", image: "/image/anime.png", category: "Anime", price: "4,500₮" },
  { title: "Anime Style", image: "/image/anime.png", category: "Anime", price: "4,500₮" },
];

export default function Products() {
  return (
    <FadeUp>
      <section id="products" className="bg-[#FFF8F5] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="rounded-full bg-[#FFE8E2] px-4 py-1.5 text-xs font-semibold text-[#ff6b6b]">
              Бүтээгдэхүүн
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Бэлэн бүтээгдэхүүн
            </h2>
            <p className="mt-2 text-sm text-slate-800">
              Дуртай загвараа сонгон захиалаарай.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Category Tag */}
                  <span className="absolute left-3 top-3 rounded-full bg-slate-900/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    {item.category}
                  </span>

                  {/* Floating Content Card (Backdrop Blur) */}
                  <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/70 p-3 shadow-sm backdrop-blur-md transition duration-300 group-hover:bg-white/85">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">
                      {item.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-base font-bold text-[#ff6b6b]">
                        {item.price}
                      </span>
                      <Link href="/order">
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6b6b] text-white shadow-sm transition hover:scale-105">
                            <ArrowRight size={14} />
                          </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}