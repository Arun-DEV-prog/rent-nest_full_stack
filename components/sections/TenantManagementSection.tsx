"use client";

interface Feature {
  icon: React.ReactNode;
  title: string;
}

interface TenantManagementSectionProps {
  badge: string;
  title: string;
  description: string;
  features: Feature[];
}

export default function TenantManagementSection({
  badge,
  title,
  description,
  features,
}: TenantManagementSectionProps) {
  return (
    <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16 px-6 sm:px-8 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold tracking-wider">
                {badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition border-l-4 border-teal-600"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-3xl">{feature.icon}</div>
                  <div className="text-gray-800 font-semibold">
                    {feature.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
