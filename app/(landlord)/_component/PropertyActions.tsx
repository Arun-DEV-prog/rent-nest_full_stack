// app/landlord/properties/_components/PropertyActions.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function PropertyActions({
  property,
  onUpdate,
  onDelete,
}: {
  property: any;
  onUpdate: (property: any) => void;
  onDelete: (property: any) => void;
}) {
  return (
    <div className="flex gap-2 pt-1">
      <button
        onClick={() => onUpdate(property)}
        className="flex-1 flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <Pencil className="w-4 h-4" />
        Update
      </button>
      <button
        onClick={() => onDelete(property)}
        className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
}
