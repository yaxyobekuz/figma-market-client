// Icons
import {
  Zap,
  Heart,
  Users,
  Globe,
  Palette,
  Download,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// Next
import Link from "next/link";

// Components
import JsonLd from "@/components/seo/JsonLd";

// SEO
import { siteConfig } from "@/lib/seo.config";

// Page Metadata
export const metadata = {
  title: "About Us",
  description:
    "Learn about Figma Market - your destination for free premium Figma design resources. Discover our mission to empower designers and developers worldwide.",
  keywords: [
    "about Figma Market",
    "Figma design community",
    "free design resources",
    "design platform",
    "UI/UX resources",
  ],
  openGraph: {
    title: "About Us - Figma Market",
    description:
      "Learn about Figma Market - your destination for free premium Figma design resources.",
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "About Figma Market",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

// Stats data
const stats = [
  {
    icon: Download,
    value: "100+",
    label: "Downloads",
    description: "Design files downloaded by our community",
  },
  {
    icon: Palette,
    value: "20+",
    label: "Design Resources",
    description: "High-quality Figma templates and UI kits",
  },
  {
    icon: Users,
    value: "10+",
    label: "Active Users",
    description: "Designers and developers trust us",
  },
  {
    icon: Globe,
    value: "1+",
    label: "Countries",
    description: "Global reach across the world",
  },
];

// Features data
const features = [
  {
    icon: Zap,
    title: "Lightning Fast Downloads",
    description:
      "Get instant access to all design resources. No waiting, no hassle - just pure design efficiency.",
  },
  {
    icon: CheckCircle,
    title: "Premium Quality",
    description:
      "Every resource is carefully curated and reviewed to ensure the highest quality standards.",
  },
  {
    icon: Heart,
    title: "100% Free Forever",
    description:
      "All our design resources are completely free to use for personal and commercial projects.",
  },
  {
    icon: Palette,
    title: "Diverse Collection",
    description:
      "From UI kits to illustrations, icons to templates - find everything you need in one place.",
  },
];

// Values data
const values = [
  {
    title: "Accessibility",
    description:
      "We believe great design should be accessible to everyone, regardless of budget or experience level.",
  },
  {
    title: "Quality",
    description:
      "We never compromise on quality. Every resource meets our strict standards before being published.",
  },
  {
    title: "Community",
    description:
      "We're building a supportive community of designers and developers who help each other grow.",
  },
  {
    title: "Innovation",
    description:
      "We continuously explore new design trends and technologies to keep our resources cutting-edge.",
  },
];

// Team members (optional - can be expanded)
const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Passionate about making design accessible to everyone.",
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    bio: "Creating beautiful and functional design resources.",
  },
  {
    name: "Mike Williams",
    role: "Developer",
    bio: "Building the platform that powers Figma Market.",
  },
];

// About schema for SEO
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Figma Market",
  description:
    "Learn about Figma Market - your destination for free premium Figma design resources.",
  url: `${siteConfig.url}/about`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
    ],
  },
};

const AboutPage = () => {
  return (
    <>
      <JsonLd data={aboutSchema} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                About Us
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Empowering Designers &{" "}
                <span className="text-violet-600">Developers</span> Worldwide
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Figma Market is on a mission to democratize design by providing
                free, high-quality Figma resources to creators around the globe.
                We believe great design should be accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-violet-50 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-100 text-violet-600 rounded-xl mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                  Our Mission
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Making Design Resources Free for Everyone
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  We started Figma Market with a simple idea: great design
                  resources shouldn't cost a fortune. Whether you're a student
                  just starting out, a freelancer building your portfolio, or a
                  team working on your next big project - you deserve access to
                  premium quality design files.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Our platform curates the best free Figma resources from
                  talented designers around the world, making it easy for you to
                  find exactly what you need to bring your ideas to life.
                </p>

                <Link
                  href="/explore/all"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors duration-200"
                >
                  Explore Resources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl"></div>
                  <div className="h-48 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl"></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl"></div>
                  <div className="h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Makes Us Different
              </h2>
              <p className="text-gray-600">
                We're not just another design resource website. Here's what sets
                Figma Market apart.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-100 text-violet-600 rounded-xl mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-violet-600 text-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Stand For
              </h2>
              <p className="text-violet-100">
                These core values guide everything we do at Figma Market.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-violet-100 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 text-white">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Get Started?
              </h2>
              <p className="text-violet-100 text-lg">
                Browse our collection of free Figma resources and start building
                beautiful designs today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/explore/all"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 rounded-xl hover:bg-violet-50 transition-colors duration-200"
                >
                  Browse Resources
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/saved"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4" />
                  View Saved
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
