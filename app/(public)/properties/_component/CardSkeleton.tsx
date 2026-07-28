"use client";

export default function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-44 w-full rounded-xl bg-slate-200" />
      <div className="mt-4 h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
      <div className="mt-3 flex gap-2">
        <div className="h-8 w-20 rounded bg-slate-200" />
        <div className="h-8 w-16 rounded bg-slate-200" />
      </div>
    </div>
  );
}
