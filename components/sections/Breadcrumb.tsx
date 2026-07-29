"use client";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-100 py-4 px-6 sm:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-gray-700">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {item.href ? (
                <a
                  href={item.href}
                  className="text-teal-600 hover:text-teal-800"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-semibold text-gray-900">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
