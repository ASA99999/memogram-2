import ReadyProducts from "@/components/ReadyProducts";
import OrderForm from "@/components/OrderForm";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F5] px-4 py-16">

      <div className="mx-auto max-w-7xl">

        {/* Title */}
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

        {/* Бэлэн бүтээгдэхүүн */}
        <ReadyProducts />

        {/* Захиалгын form */}
        <div className="mt-8">
          <OrderForm />
        </div>

      </div>

    </main>
  );
}