import type { RegisterFormData } from "@/lib/registerSchema";
import RegisterForm from "../_component/RegisterForm";
import PromoCarousel from "../_component/Promocarousel";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const handleRegister = async (data: RegisterFormData) => {
    "use server";
    // data is already validated and typed by zod:
    // { name, email, password, phone, role, divison, district }
    console.log("Register submitted:", data);

    // Example: call your API route here
    // await fetch(`${process.env.API_BASE_URL}/auth/register`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F7F1E8] px-6 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Link
          href="/"
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          হোম
        </Link>
        <RegisterForm onSubmit={handleRegister} />
        <PromoCarousel />
      </div>
    </main>
  );
}
