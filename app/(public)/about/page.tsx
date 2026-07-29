"use client";

import Breadcrumb from "@/components/sections/Breadcrumb";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import AboutContentSection from "@/components/sections/AboutContentSection";
import TenantManagementSection from "@/components/sections/TenantManagementSection";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <HeroSection
        badge="BANGLADESH RENTAL PLATFORM"
        title="Tolet BD: বাংলাদেশে বাসা ভাড়া, সিট, সাবলেট, দোকান ও অফিস খোঁজার সবচেয়ে বড় প্ল্যাটফর্ম"
        subtitle="Tolet BD property seekers, owners, agents ও landlords-দের জন্য একটি ব্যবহারবান্ধব rental platform। বিভাগ, জেলা, থানা ও সাবএরিয়া অনুযায়ী প্রোপার্টি খোঁজা, লিস্টিং দেওয়া, যোগাযোগ করা এবং ভাড়াটিয়া ব্যবস্থাপনা করার সব কাজ আমরা সহজ করেছি।"
        buttons={[
          { label: "প্রোপার্টি দেখুন", variant: "primary" },
          { label: "প্রোপার্টি যোগ করুন", variant: "secondary" },
        ]}
      />

      <AboutContentSection
        title="Tolet BD কী?"
        content="Tolet BD হলো বাংলাদেশকেন্দ্রিক একটি rental discovery and listing platform, যেখানে ভাড়াটিয়া, পরিবার, ছাত্রছাত্রী, property owner এবং agent সবাই একটি জায়গায় rental property খুঁজতে বা publish করতে পারেন। আমাদের প্ল্যাটফর্মে family house, bachelor room, hostel seat, sublet, office এবং shop সহ বিভিন্ধ ধরনের rental listing পাওয়া যায়। ব্যবহারকারীরা location hierarchy অনুযায়ী খুঁজতে পারেন: division, district, thana এবং subarea। সদস্য property browse করতে পারে, logged-in users listing manage করতে পারেন, interested users এর সাথে chat বা call করতে পারেন, এবং eligible landlords চাইলে tenant management tools-ও ব্যবহার করতে পারেন।"
        featureCards={[
          { number: "6+", label: "Rental Categories" },
          { number: "4-Level", label: "Location Filtering" },
        ]}
      />

      <CTASection
        title="Ready to Explore Tolet BD?"
        subtitle="প্রোপার্টি খোঁজুন, নিজের listing publish করুন, অথবা আমাদের সাথে যোগাযোগ করুন।"
        buttons={[
          { label: "Find Properties →", icon: "" },
          { label: "Add Property" },
          { label: "Contact Us" },
        ]}
      />

      <TenantManagementSection
        badge="TENANT MANAGEMENT SYSTEM"
        title="বাসা ভাড়া ম্যানেজমেন্ট সিস্টেম এবং Tolet BD-এর অংশ"
        description="Tolet BD শুধু rental listing platform নয়, landlords এবং building managers-দের জন্য একটি practical tenant management system-ও দেয়। যাদের একাধিক building, flat বা tenant আছে, তারা operational কাজ আরও organized ভাবে করতে পারেন। এই সিস্টেমে building, flat, tenant, rent collection, invoice, garage, expense এবং SMS workflow-এর মাধ্যমে ফলে property publish করা থেকে শুরু করে rent tracking এবং tenant communication পর্যন্ত সবকিছু একই ecosystem-এর মধ্যে রাখা সম্ভব হয়।"
        features={[
          { icon: "📊", title: "বিল্ডিং ও ফ্ল্যাট ম্যানেজমেন্ট" },
          { icon: "💰", title: "ভাড়া কালেকশন ও রেকর্ডা ট্র্যাকিং" },
          { icon: "📋", title: "ইনভয়েস ও পেমেন্ট workflow" },
          { icon: "💬", title: "SMS ও tenant communication tools" },
        ]}
      />

      <Footer />
    </>
  );
}
