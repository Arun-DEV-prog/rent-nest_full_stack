import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Housio",
  description: "Login to manage your rental listings.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f5eee3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">
        {children}
      </div>
    </div>
  );
}
