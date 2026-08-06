import { WiCloudUp } from "react-icons/wi";
import {
  FaWandMagicSparkles,
  FaBoxOpen,
  FaGift,
} from "react-icons/fa6";
import FadeUp from "@/components/FadeUp";

const SERVICES = [
  {
    icon: <WiCloudUp className="h-10 w-10 text-[#ff6b6b]" />,
    title: "Өөрийн зургаа оруулах",
    desc: "Өөрийн дуртай зургаа илгээж, өндөр чанартай соронзон зураг болгон хэвлүүлээрэй.",
  },
  {
    icon: <FaWandMagicSparkles className="h-9 w-9 text-[#8b5cf6]" />,
    title: "AI зураг боловсруулах",
    desc: "AI ашиглан зургаа аниме болон хүссэн хэв маягт хөрвүүлээрэй.",
  },
  {
    icon: <FaBoxOpen className="h-9 w-9 text-[#22c55e]" />,
    title: "Бэлэн бүтээгдэхүүн",
    desc: "Бэлэн загваруудаас сонгон шууд захиалах боломжтой.",
  },
  {
    icon: <FaGift className="h-9 w-9 text-[#ec4899]" />,
    title: "Бэлгийн захиалга",
    desc: "Төрсөн өдөр, ой, онцгой үйл явдалд зориулсан дурсгалын бэлэг.",
  },
];

export function About() {
  return (
    <FadeUp>
      <section
        id="about"
        className="bg-[#FFF8F5] py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <span className="rounded-full bg-[#FFE8E2] px-4 py-2 text-sm font-semibold text-[#ff6b6b]">
              Манай үйлчилгээ
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Танд зориулсан үйлчилгээ
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Дурсамжаа хадгалах хамгийн хялбар бөгөөд чанартай
              аргыг санал болгож байна.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {SERVICES.map((item, index) => (
              <div
                key={index}
                className="group rounded-[30px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF2EE]">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.desc}
                </p>

                <button className="mt-8 font-semibold text-[#ff6b6b] transition group-hover:translate-x-1">
                  Дэлгэрэнгүй →
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>
    </FadeUp>
  );
}