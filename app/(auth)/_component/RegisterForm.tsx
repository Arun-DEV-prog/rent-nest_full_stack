"use client";

import { useState, FormEvent } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Briefcase,
  MapPin,
  Landmark,
  ArrowLeft,
} from "lucide-react";
import {
  registerSchema,
  phoneStepSchema,
  detailsStepSchema,
  toInternationalBdPhone,
  DIVISIONS,
  ROLES,
  ROLE_LABELS,
  type RegisterFormData,
  type Division,
} from "@/lib/registerSchema";
import StepProgress from "./Stepprogress";

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void | Promise<void>;
}

type DetailsState = {
  name: string;
  email: string;
  password: string;
  role: RegisterFormData["role"] | "";
  divison: string;
  district: string;
};

type DetailsErrors = Partial<Record<keyof DetailsState, string>>;

const initialDetails: DetailsState = {
  name: "",
  email: "",
  password: "",
  role: "",
  divison: "",
  district: "",
};

const TOTAL_STEPS = 2;

const labelClass =
  "absolute -top-2.5 left-4 bg-[#F7F1E8] px-1.5 text-sm text-neutral-500";
const inputRowClass = (hasError?: string) =>
  `flex items-center gap-3 border rounded-lg px-4 py-3.5 bg-transparent transition-colors ${
    hasError
      ? "border-red-400 focus-within:border-red-500"
      : "border-neutral-300 focus-within:border-neutral-500"
  }`;

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();

  // Step 2 state
  const [details, setDetails] = useState<DetailsState>(initialDetails);
  const [errors, setErrors] = useState<DetailsErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const districtOptions =
    details.divison && details.divison in DIVISIONS
      ? DIVISIONS[details.divison as Division]
      : [];

  const updateDetail = <K extends keyof DetailsState>(
    field: K,
    value: DetailsState[K],
  ) => {
    setDetails((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "divison") next.district = "";
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePhoneSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = phoneStepSchema.safeParse({ phone });
    if (!result.success) {
      setPhoneError(result.error.issues[0]?.message);
      return;
    }
    setPhoneError(undefined);
    setStep(2);
  };

  const handleDetailsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = detailsStepSchema.safeParse(details);

    if (!result.success) {
      const fieldErrors: DetailsErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DetailsState;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const payload = registerSchema.parse({
      ...result.data,
      phone: toInternationalBdPhone(phone),
    });

    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit?.(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      <h1 className="text-4xl font-extrabold text-neutral-900 mb-2 text-center">
        Create Account
      </h1>
      <p className="text-sm text-neutral-500 mb-6 text-center">
        {step === 1 ? "নতুন অ্যাকাউন্ট" : "প্রোফাইল তথ্য"}
      </p>

      <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />

      {step === 1 && (
        <form className="space-y-6" onSubmit={handlePhoneSubmit} noValidate>
          <div className="relative">
            <label className={labelClass}>মোবাইল নম্বর</label>
            <div className={inputRowClass(phoneError)}>
              <Phone size={18} className="text-neutral-400 shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError(undefined);
                }}
                placeholder="01XXXXXXXXX"
                className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
                autoFocus
              />
            </div>
            {phoneError && (
              <p className="mt-1.5 text-xs text-red-500">{phoneError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg font-semibold text-neutral-900 transition-colors"
            style={{ backgroundColor: "#E9C6A0" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#E3B98D")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#E9C6A0")
            }
          >
            পরবর্তী
          </button>

          <p className="text-center text-sm text-neutral-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <a
              href="/login"
              className="text-[#D9772E] font-semibold hover:underline"
            >
              লগইন
            </a>
          </p>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-5" onSubmit={handleDetailsSubmit} noValidate>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 -mt-1 mb-1"
          >
            <ArrowLeft size={15} />
            পিছনে
          </button>

          {/* Name */}
          <div className="relative">
            <label className={labelClass}>পূর্ণ নাম</label>
            <div className={inputRowClass(errors.name)}>
              <User size={18} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                value={details.name}
                onChange={(e) => updateDetail("name", e.target.value)}
                placeholder="Arun Kumar Roy"
                className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className={labelClass}>ইমেইল</label>
            <div className={inputRowClass(errors.email)}>
              <Mail size={18} className="text-neutral-400 shrink-0" />
              <input
                type="email"
                value={details.email}
                onChange={(e) => updateDetail("email", e.target.value)}
                placeholder="arun1.roy@example.com"
                className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className={labelClass}>পাসওয়ার্ড</label>
            <div className={inputRowClass(errors.password)}>
              <Lock size={18} className="text-neutral-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={details.password}
                onChange={(e) => updateDetail("password", e.target.value)}
                placeholder="Enter a strong password"
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
            {errors.password ? (
              <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
            ) : (
              <p className="mt-1.5 text-xs text-neutral-400">
                8+ characters with upper, lower, number, and symbol
              </p>
            )}
          </div>

          {/* Role */}
          <div className="relative">
            <label className={labelClass}>আপনি কে?</label>
            <div className={inputRowClass(errors.role)}>
              <Briefcase size={18} className="text-neutral-400 shrink-0" />
              <select
                value={details.role}
                onChange={(e) =>
                  updateDetail("role", e.target.value as DetailsState["role"])
                }
                className="w-full bg-transparent outline-none text-neutral-700 appearance-none"
              >
                <option value="" disabled>
                  Select role
                </option>
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
            </div>
            {errors.role && (
              <p className="mt-1.5 text-xs text-red-500">{errors.role}</p>
            )}
          </div>

          {/* Division + District */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className={labelClass}>বিভাগ</label>
              <div className={inputRowClass(errors.divison)}>
                <Landmark size={18} className="text-neutral-400 shrink-0" />
                <select
                  value={details.divison}
                  onChange={(e) => updateDetail("divison", e.target.value)}
                  className="w-full bg-transparent outline-none text-neutral-700 appearance-none"
                >
                  <option value="" disabled>
                    Division
                  </option>
                  {(Object.keys(DIVISIONS) as Division[]).map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>
              {errors.divison && (
                <p className="mt-1.5 text-xs text-red-500">{errors.divison}</p>
              )}
            </div>

            <div className="relative">
              <label className={labelClass}>জেলা</label>
              <div className={inputRowClass(errors.district)}>
                <MapPin size={18} className="text-neutral-400 shrink-0" />
                <select
                  value={details.district}
                  onChange={(e) => updateDetail("district", e.target.value)}
                  disabled={!details.divison}
                  className="w-full bg-transparent outline-none text-neutral-700 appearance-none disabled:text-neutral-300"
                >
                  <option value="" disabled>
                    {details.divison ? "District" : "Pick division first"}
                  </option>
                  {districtOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              {errors.district && (
                <p className="mt-1.5 text-xs text-red-500">{errors.district}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-lg font-semibold text-neutral-900 transition-colors disabled:opacity-60"
            style={{ backgroundColor: "#E9C6A0" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#E3B98D")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#E9C6A0")
            }
          >
            {submitting ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার"}
          </button>
        </form>
      )}
    </div>
  );
}
