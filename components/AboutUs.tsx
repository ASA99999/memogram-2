"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { CheckCircle2, Palette, PhoneCall } from "lucide-react";

export function AboutUs() {
  return (
    <FadeUp>
      <section
        id="aboutUs"
        className="bg-[#FFF8F5] py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left */}
            <div>

              <span className="rounded-full bg-[#FFE8E2] px-4 py-2 text-sm font-semibold text-[#ff6b6b]">
                Бидний тухай
              </span>

              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Дурсамжийг үнэ цэнтэй
                бүтээгдэхүүн болгоно.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                <strong className="text-slate-900">Memogram</strong> нь
                таны дуртай зураг бүрийг өндөр чанартай соронзон зураг
                болгон бүтээдэг. Бид чанартай материал, цэвэр хэвлэл,
                бүтээлч шийдлийг нэг дор санал болгодог.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Хувийн захиалга, аниме зураг, бэлгийн бүтээгдэхүүн,
                Монголын байгалийн цуглуулга зэрэг төрөл бүрийн
                бүтээгдэхүүнийг таны хүссэнээр урлан хүргэдэг.
              </p>

            </div>

            {/* Right */}
            <div className="relative">

              <div className="absolute -left-6 -top-6 h-full w-full rounded-[32px] bg-[#FFD9CF]" />

              <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl">
                <Image
                  src="/image/about.jpg"
                  alt="Memogram"
                  width={700}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>

            </div>

          </div>

          {/* Bottom Cards */}
          <div className="mt-20 grid gap-8 md:grid-cols-3">

            <div className="rounded-[28px] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1ED]">
                <CheckCircle2 className="h-7 w-7 text-[#ff6b6b]" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Чанартай хэвлэл
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Өнгө алдахгүй, удаан эдэлгээтэй, өндөр чанарын
                материал ашиглан үйлдвэрлэдэг.
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3EEFF]">
                <Palette className="h-7 w-7 text-violet-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Өөрийн загвар
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Өөрийн зураг, хүссэн дизайн, хэмжээ болон тоогоор
                бүрэн захиалах боломжтой.
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF9F3]">
                <PhoneCall className="h-7 w-7 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Холбоо барих
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                📞 8886-0052
                <br />
                Facebook, Instagram болон утсаар захиалга авна.
              </p>
            </div>

          </div>

        </div>
      </section>
    </FadeUp>
  );
}