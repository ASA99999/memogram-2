"use client";

import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <FadeUp>
      <footer className="bg-[#FFF8F5] border-t border-[#F1E6E2]">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="grid gap-12 md:grid-cols-3">

            {/* Logo & About */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                MEMOGRAM
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Таны үнэ цэнтэй дурсамжийг өндөр чанартай
                соронзон зураг болгон бүтээдэг.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Цэс
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-slate-600">

                <Link href="#about" className="hover:text-[#ff6b6b]">
                  Үйлчилгээ
                </Link>

                <Link href="#products" className="hover:text-[#ff6b6b]">
                  Бүтээгдэхүүн
                </Link>

                <Link href="#aboutUs" className="hover:text-[#ff6b6b]">
                  Бидний тухай
                </Link>

              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Холбоо барих
              </h3>

              <div className="mt-5 space-y-4 text-slate-600">

                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>8886-0052</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>memogram.mn@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span>Улаанбаатар, Монгол</span>
                </div>

              </div>

              <div className="mt-6 flex gap-4">

                <a
                  href="https://www.facebook.com/memogram.mn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition hover:-translate-y-1 hover:bg-[#ff6b6b] hover:text-white"
                >
                  <FaFacebook size={18} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition hover:-translate-y-1 hover:bg-[#ff6b6b] hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>

              </div>

            </div>

          </div>

          <div className="mt-12 border-t border-[#F1E6E2] pt-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} <span className="font-semibold">MEMOGRAM</span>. Бүх эрх хуулиар хамгаалагдсан.
          </div>

        </div>
      </footer>
    </FadeUp>
  );
}