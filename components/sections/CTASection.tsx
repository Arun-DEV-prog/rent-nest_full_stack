"use client";

interface CTAButton {
  label: string;
  icon?: string;
}

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttons: CTAButton[];
}

export default function CTASection({
  title,
  subtitle,
  buttons,
}: CTASectionProps) {
  return (
    <section className=" py-16 px-6 sm:px-8 lg:px-20">
      <div className=" bg-gradient-to-r from-teal-800 to-teal-900  py-16 px-6 sm:px-8 lg:px-20 rounded-2xl max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h2>

        <p className="text-lg text-teal-100 mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`px-8 py-3 rounded-full font-semibold transition flex items-center gap-2 ${
                index === 0
                  ? "bg-white text-teal-900 hover:bg-gray-100"
                  : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-900"
              }`}
            >
              {button.label}
              {index === 0 && <span>→</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
