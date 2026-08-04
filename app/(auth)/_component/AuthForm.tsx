"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/lib/registerSchema";
import { loginAction } from "../_actions/authActions";
import { toast } from "react-toastify";

type LoginErrors = Partial<Record<keyof LoginFormData, string>>;

type LoginState = {
  success: boolean;
  message: string;
};

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>({});

  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    { success: false, message: "" },
  );

  useEffect(() => {
    if (!state || !state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      <h1 className="text-4xl font-extrabold text-neutral-900 mb-8">
        Welcome Back!!
      </h1>

      <form action={action} className="space-y-6" noValidate>
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-[#F7F1E8] px-1.5 text-sm text-neutral-500">
            Email
          </label>
          <div
            className={`flex items-center gap-3 border rounded-lg px-4 py-3.5 bg-transparent transition-colors ${
              errors.email
                ? "border-red-400 focus-within:border-red-500"
                : "border-neutral-300 focus-within:border-neutral-500"
            }`}
          >
            <Mail size={18} className="text-neutral-400 shrink-0" />
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="user@email.com"
              className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password field */}
        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-[#F7F1E8] px-1.5 text-sm text-neutral-500">
            পাসওয়ার্ড
          </label>
          <div
            className={`flex items-center gap-3 border rounded-lg px-4 py-3.5 bg-transparent transition-colors ${
              errors.password
                ? "border-red-400 focus-within:border-red-500"
                : "border-neutral-300 focus-within:border-neutral-500"
            }`}
          >
            <Lock size={18} className="text-neutral-400 shrink-0" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-neutral-400 shrink-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Remember + forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              name="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 accent-neutral-800"
            />
            <span className="text-sm text-neutral-800">মনে রাখুন</span>
          </label>
          <a href="#" className="text-sm text-neutral-800 hover:underline">
            পাসওয়ার্ড ভুলে গেছেন?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          //disabled={submitting}
          className="w-full py-3.5 rounded-lg font-semibold text-neutral-900 transition-colors disabled:opacity-60"
          style={{ backgroundColor: "#E9C6A0" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#E3B98D")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#E9C6A0")
          }
        >
          {pending ? "লগইন হচ্ছে..." : "লগইন"}
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-neutral-600">
          অ্যাকাউন্ট নেই?{" "}
          <a
            href="/register"
            className="text-[#D9772E] font-semibold hover:underline"
          >
            রেজিস্টার
          </a>
        </p>
      </form>
    </div>
  );
}
