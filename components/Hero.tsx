"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_IMAGES = [
  { rot: -12, x: -90, src: "/image/magnet-z4.jpg" },
  { rot: -5, x: -30, src: "/image/magnet-z3.jpg" },
  { rot: 5, x: 30, src: "/image/magnet-z2.jpg" },
  { rot: 12, x: 90, src: "/image/magnet-z1.jpg" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#FFF8F5]"
    >
      {/* Background Blur */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#FFD9CF] blur-3xl opacity-50" />
      <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FFE9E3] blur-3xl opacity-70" />

      <div className="relative mx-auto grid max-w-7xl gap-20 px-6 py-20 md:grid-cols-2 md:items-center lg:px-10 lg:py-28">

        {/* Left */}
        <div>
          <Badge className="rounded-full border-0 bg-[#FFE7E2] px-4 py-2 text-[#ff6b6b]">
            ✨ 53 × 80 мм • Фото соронз
          </Badge>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-900 md:text-6xl lg:text-7xl">
            Дурсамжаа
            <br />
            <span className="text-[#ff6b6b]">хөргөгч дээрээ</span>
            <br />
            наагаарай.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Гар утасныхаа хамгийн гоё зургуудыг өндөр чанартай
            соронзон зураг болгон хэвлүүлж, өдөр бүр дурсамжаа
            хараарай.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/order">
              <Button className="h-12 rounded-full bg-[#ff6b6b] px-8 text-white hover:bg-[#ff5b5b]">
                Захиалга өгөх
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-12 rounded-full px-8"
            >
              Жишээ үзэх
            </Button>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <p className="text-3xl font-bold text-slate-900">
                4,500₮
              </p>
              <span className="text-slate-500">
                ширхэгийн үнэ
              </span>
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-900">
                2–3
              </p>
              <span className="text-slate-500">
                хоног
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex h-[520px] items-center justify-center">
          {HERO_IMAGES.map((item, i) => (
            <div
              key={i}
              style={{
                transform: `translateX(${item.x}px) rotate(${item.rot}deg)`,
              }}
              className="absolute h-80 w-60 overflow-hidden rounded-[28px] border-[10px] border-white bg-white shadow-2xl transition duration-500 hover:-translate-y-4 hover:rotate-0"
            >
              <Image
                src={item.src}
                alt="Memogram"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}