import type { LoginFormData } from "@/lib/registerSchema";
import AuthForm from "../_component/AuthForm";
import PromoCarousel from "../_component/Promocarousel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const handleLogin = async (data: LoginFormData) => {
    "use server";
    // data is already validated by zod: { phone, password, remember }
    console.log("Login submitted:", data);

    // Example: call your auth provider / API route here
    // await fetch("/api/auth/login", {
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
        <AuthForm onSubmit={handleLogin} />
        <PromoCarousel />
      </div>
    </main>
  );
}
