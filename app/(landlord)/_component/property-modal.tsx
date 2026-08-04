"use client";

import { useEffect, useState, type ComponentType } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  RotateCcw,
  FileText,
  AlignLeft,
  Wallet,
  Ruler,
  MapPin,
  Image as ImageIcon,
  ImageOffIcon,
  CheckCircle2,
  Building2,
  Home,
  Building,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  RemoveFormatting,
} from "lucide-react";

import { toast } from "react-toastify";
import { propertySchema, type PropertyFormData } from "@/lib/propertySchema";
import { createPropertyAction } from "../landlord-dashboard/properties/new/actions";

type CreatePropertyResult =
  | { ok: true; property: PropertyFormData; message?: string }
  | { ok: false; message: string };

type PropertyCategory = {
  id: number;
  name: string;
  description?: string;
  propertiesCount?: number;
};

/* ------------------------------------------------------------------ */
/* Shared visual primitives                                           */
/* ------------------------------------------------------------------ */

const ACCENT = "#123832";

const INPUT_CLASS =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123832] focus:ring-2 focus:ring-[#123832]/10";

const SELECT_CLASS = INPUT_CLASS;

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-800">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 px-4 py-3.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="border-t border-slate-100 p-4">{children}</div>
    </div>
  );
}

function CategoryPill({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-[#123832] bg-[#123832] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function getCategoryIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("villa")) return Home;
  if (normalizedName.includes("office")) return Building;
  if (normalizedName.includes("commercial")) return Building2;
  if (normalizedName.includes("studio")) return Building2;

  return Building2;
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

const defaultFormValues: PropertyFormData = {
  title: "Modern 3 Bedroom Apartment",
  description:
    "A spacious and well-furnished apartment located in a peaceful residential area with 24/7 security and parking.",
  rent: 25000,
  categoriesId: 1,
  bedrooms: 3,
  bathrooms: 2,
  size_sqft: 1350,
  floor: 5,
  availability: true,
  available_from: "2026-08-01",
  address: "House #12, Road #5, Uttara, Dhaka",
  division: "Dhaka",
  images: "https://example.com/images/apartment-1.jpg",
};

export default function PropertyModal({
  action,
  defaultValues: externalDefaultValues,
  onClose,
  mode = "create",
}: {
  action?: (data: PropertyFormData) => Promise<CreatePropertyResult>;
  defaultValues?: Partial<PropertyFormData>;
  onClose?: () => void;
  mode?: "create" | "update";
}) {
  const seedValues = externalDefaultValues
    ? { ...defaultFormValues, ...externalDefaultValues }
    : defaultFormValues;

  const [open, setOpen] = useState(true);
  const [confirmClose, setConfirmClose] = useState(false);
  const [categories, setCategories] = useState<PropertyCategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesId, setCategoriesId] = useState(
    seedValues.categoriesId,
  );
  const [availability, setAvailability] = useState(
    seedValues.availability,
  );
  const [imageUrl, setImageUrl] = useState(seedValues.images);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Use the action passed as a prop, falling back to the imported server action.
  const submitAction = action ?? createPropertyAction;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    mode: "onTouched",
    defaultValues: seedValues,
  });

  register("categoriesId");
  register("availability");

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const response = await axios.get<{
          success?: boolean;
          data?: PropertyCategory[];
        }>("/api/properties/categories");

        if (isMounted && response.data?.success) {
          const fetchedCategories = response.data.data ?? [];
          setCategories(fetchedCategories);

          if (
            !fetchedCategories.some((category) => category.id === categoriesId)
          ) {
            const fallbackCategoryId =
              fetchedCategories[0]?.id ?? defaultFormValues.categoriesId;
            setCategoriesId(fallbackCategoryId);
            setValue("categoriesId", fallbackCategoryId, {
              shouldValidate: false,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load property categories", error);
      } finally {
        if (isMounted) {
          setIsCategoriesLoading(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, [setValue]);

  const imageRegister = register("images", {
    onChange: (event) => setImageUrl((event.target as HTMLInputElement).value),
  });

  const resetForm = () => {
    reset(defaultFormValues);
    setCategoriesId(defaultFormValues.categoriesId);
    setAvailability(defaultFormValues.availability);
    setImageUrl(defaultFormValues.images);
  };

  const onSubmit = async (data: PropertyFormData) => {
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitAction(data);
      setIsSubmitting(false);

      if (!result.ok) {
        setStatusMessage(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message ?? "Property created successfully.");
      router.push("/landlord-dashboard/properties");
    } catch (error: unknown) {
      setIsSubmitting(false);
      const message =
        error instanceof Error ? error.message : "Failed to create property.";
      setStatusMessage(message);
      toast.error(message);
    }
  };

  const requestClose = () => {
    if (isDirty) setConfirmClose(true);
    else {
      setOpen(false);
      onClose?.();
    }
  };

  if (!open) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          style={{ backgroundColor: ACCENT }}
        >
          Listing closed
        </span>
        <h2 className="text-xl font-semibold text-slate-900">Add property</h2>
        <p className="max-w-sm text-center text-sm text-slate-600">
          The form is closed. Reopen it to add another property.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
          style={{ backgroundColor: ACCENT }}
        >
          Reopen
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="flex h-[calc(100vh-3rem)] w-full max-w-xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-[17px] font-bold text-slate-900">
            Add rental property
          </h2>
          <button
            type="button"
            onClick={resetForm}
            aria-label="Reset form"
            title="Reset form"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {confirmClose ? (
          <div className="mx-4 mb-2 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
            <span>Your changes will not be saved. Discard changes?</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmClose(false)}
                className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
              >
                Continue editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmClose(false);
                  setOpen(false);
                  onClose?.();
                }}
                className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
              >
                Discard changes
              </button>
            </div>
          </div>
        ) : null}

        {/* Scrollable content */}
        <form
          id="propertyForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto bg-[#EEF0F2] px-4 pb-4 pt-1"
        >
          {/* Category pills */}
          <div
            className="mb-4 flex gap-2 overflow-x-auto pb-1"
            role="radiogroup"
            aria-label="Property type"
          >
            {isCategoriesLoading ? (
              <p className="text-sm text-slate-500">Loading categories...</p>
            ) : categories.length > 0 ? (
              categories.map((category) => {
                const Icon = getCategoryIcon(category.name);

                return (
                  <CategoryPill
                    key={category.id}
                    label={category.name}
                    icon={Icon}
                    active={categoriesId === category.id}
                    onClick={() => {
                      setCategoriesId(category.id);
                      setValue("categoriesId", category.id, {
                        shouldValidate: true,
                      });
                    }}
                  />
                );
              })
            ) : (
              <p className="text-sm text-slate-500">No categories available.</p>
            )}
          </div>
          {errors.categoriesId?.message ? (
            <p role="alert" className="mb-3 text-xs text-red-600">
              {errors.categoriesId.message.toString()}
            </p>
          ) : null}

          <div className="flex flex-col gap-4">
            <SectionCard icon={FileText} title="Basic info">
              <Field
                label="Title"
                htmlFor="title"
                required
                error={errors.title?.message?.toString()}
              >
                <input
                  id="title"
                  className={INPUT_CLASS}
                  {...register("title")}
                />
              </Field>
            </SectionCard>

            <SectionCard icon={AlignLeft} title="Description">
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
                  <button
                    type="button"
                    disabled
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400"
                  >
                    Normal <ChevronDown className="h-3 w-3" />
                  </button>
                  <span className="mx-1 h-4 w-px bg-slate-200" />
                  {[
                    Bold,
                    Italic,
                    Underline,
                    ListOrdered,
                    List,
                    Link2,
                    RemoveFormatting,
                  ].map((Icon, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
                <textarea
                  id="description"
                  rows={5}
                  className="w-full resize-none bg-white px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  {...register("description")}
                />
              </div>
              {errors.description?.message ? (
                <p role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.description.message.toString()}
                </p>
              ) : null}
            </SectionCard>

            <SectionCard icon={Wallet} title="Rent & availability">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Rent amount (per month)"
                  htmlFor="rent"
                  required
                  error={errors.rent?.message?.toString()}
                >
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm font-medium text-slate-400"
                    >
                      ৳
                    </span>
                    <input
                      id="rent"
                      type="number"
                      min={0}
                      className={`${INPUT_CLASS} pl-7`}
                      {...register("rent", { valueAsNumber: true })}
                    />
                  </div>
                </Field>

                <Field
                  label="Available from"
                  htmlFor="available_from"
                  error={errors.available_from?.message?.toString()}
                >
                  <input
                    id="available_from"
                    type="date"
                    className={INPUT_CLASS}
                    {...register("available_from")}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-1.5">
                <span className="text-sm font-medium text-slate-800">
                  Availability
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAvailability(true);
                      setValue("availability", true, { shouldValidate: true });
                    }}
                    aria-pressed={availability === true}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                      availability
                        ? "border-[#123832] bg-[#123832]/10 text-[#123832]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Available
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAvailability(false);
                      setValue("availability", false, {
                        shouldValidate: true,
                      });
                    }}
                    aria-pressed={availability === false}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                      availability === false
                        ? "border-slate-500 bg-slate-100 text-slate-900"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    Not available
                  </button>
                </div>
              </div>
            </SectionCard>

            <SectionCard icon={Ruler} title="Size & rooms">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Bedrooms"
                  htmlFor="bedrooms"
                  error={errors.bedrooms?.message?.toString()}
                >
                  <input
                    id="bedrooms"
                    type="number"
                    min={0}
                    className={INPUT_CLASS}
                    {...register("bedrooms", { valueAsNumber: true })}
                  />
                </Field>

                <Field
                  label="Bathrooms"
                  htmlFor="bathrooms"
                  error={errors.bathrooms?.message?.toString()}
                >
                  <input
                    id="bathrooms"
                    type="number"
                    min={0}
                    className={INPUT_CLASS}
                    {...register("bathrooms", { valueAsNumber: true })}
                  />
                </Field>

                <Field
                  label="Size (sqft)"
                  htmlFor="size_sqft"
                  error={errors.size_sqft?.message?.toString()}
                >
                  <input
                    id="size_sqft"
                    type="number"
                    min={0}
                    className={INPUT_CLASS}
                    {...register("size_sqft", { valueAsNumber: true })}
                  />
                </Field>

                <Field
                  label="Floor"
                  htmlFor="floor"
                  error={errors.floor?.message?.toString()}
                >
                  <input
                    id="floor"
                    type="number"
                    min={0}
                    className={INPUT_CLASS}
                    {...register("floor", { valueAsNumber: true })}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard icon={MapPin} title="Location">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Address"
                  htmlFor="address"
                  required
                  error={errors.address?.message?.toString()}
                >
                  <input
                    id="address"
                    className={INPUT_CLASS}
                    {...register("address")}
                  />
                </Field>

                <Field
                  label="Division"
                  htmlFor="division"
                  error={errors.division?.message?.toString()}
                >
                  <select
                    id="division"
                    className={SELECT_CLASS}
                    {...register("division")}
                  >
                    {[
                      "Dhaka",
                      "Chattogram",
                      "Khulna",
                      "Rajshahi",
                      "Sylhet",
                      "Barishal",
                      "Rangpur",
                      "Mymensingh",
                    ].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </SectionCard>

            <SectionCard icon={ImageIcon} title="Photo">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <Field
                    label="Image URL"
                    htmlFor="images"
                    error={errors.images?.message?.toString()}
                  >
                    <input
                      id="images"
                      type="url"
                      className={INPUT_CLASS}
                      {...imageRegister}
                    />
                  </Field>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <ImageOffIcon className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>
            </SectionCard>

            {statusMessage ? (
              <p
                role="status"
                aria-live="polite"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                {statusMessage}
              </p>
            ) : null}
          </div>
        </form>

        {/* Sticky publish bar */}
        <button
          type="submit"
          form="propertyForm"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 py-4 text-[15px] font-semibold text-white transition disabled:opacity-70"
          style={{ backgroundColor: ACCENT }}
        >
          <CheckCircle2 className="h-4 w-4" />
          {isSubmitting ? "Publishing…" : "Publish"}
        </button>
      </div>
    </div>
  );
}
