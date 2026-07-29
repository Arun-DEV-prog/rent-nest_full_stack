"use client";

interface FeatureCard {
  number: string;
  label: string;
}

interface AboutContentSectionProps {
  title: string;
  content: string;
  featureCards: FeatureCard[];
}

export default function AboutContentSection({
  title,
  content,
  featureCards,
}: AboutContentSectionProps) {
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
          </div>

          {/* Right Feature Cards */}
          <div className="space-y-6">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-8 border border-teal-100"
              >
                <div className="text-4xl font-bold text-teal-900 mb-2">
                  {card.number}
                </div>
                <div className="text-gray-700 font-semibold">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
