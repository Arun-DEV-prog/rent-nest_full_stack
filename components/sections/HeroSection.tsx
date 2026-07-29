"use client";

interface HeroSectionProps {
  badge: string;
  title: string;
  subtitle: string;
  buttons: Array<{
    label: string;
    variant: "primary" | "secondary";
  }>;
}

export default function HeroSection({
  badge,
  title,
  subtitle,
  buttons,
}: HeroSectionProps) {
  return (
    <section className="py-8 px-6 sm:px-8 lg:px-20">
      <div className="bg-gradient-to-b from-teal-900 to-teal-800 rounded-2xl p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto">
        <div className="inline-block bg-teal-700 px-3 py-1 rounded-full mb-4">
          <span className="text-white text-xs font-semibold tracking-wider">
            {badge}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-teal-100 mb-6 max-w-3xl leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                button.variant === "primary"
                  ? "bg-white text-teal-900 hover:bg-gray-100"
                  : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-900"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
