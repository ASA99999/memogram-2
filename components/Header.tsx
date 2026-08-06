"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#about", label: "Үйлчилгээ" },
  { href: "#products", label: "Бүтээгдэхүүн" },
  { href: "#aboutUs", label: "Бидний тухай" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="transition duration-300 hover:scale-[1.03]">
          <Image
            src="/image/logo1.png"
            alt="Memogram"
            width={165}
            height={46}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-slate-600 transition-all duration-300 hover:text-[#ff6b6b]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link href="/order">
            <Button className="rounded-full bg-[#ff6b6b] px-6 py-6 text-[15px] font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-[#ff5b5b]">
              Захиалга өгөх
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full p-2 transition hover:bg-slate-100 md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-700 transition hover:text-[#ff6b6b]"
              >
                {item.label}
              </Link>
            ))}

            <Link href="/order" onClick={() => setOpen(false)}>
              <Button className="mt-3 h-12 w-full rounded-full bg-[#ff6b6b] text-white hover:bg-[#ff5b5b]">
                Захиалга өгөх
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}