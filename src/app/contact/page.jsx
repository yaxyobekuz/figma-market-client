// Icons
import {
  Mail,
  Send,
  Clock,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

// Next
import Link from "next/link";

// Components
import JsonLd from "@/components/seo/JsonLd";

// SEO
import { siteConfig } from "@/lib/seo.config";

// Page Metadata
export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Figma Market team. We're here to help with any questions about our free Figma design resources.",
  keywords: [
    "contact Figma Market",
    "Figma support",
    "design resources help",
    "Figma templates support",
  ],
  openGraph: {
    title: "Contact Us - Figma Market",
    description:
      "Get in touch with Figma Market team. We're here to help with any questions.",
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Contact Figma Market",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

// Contact methods
const contactMethods = [
  {
    icon: MessageCircle,
    title: "Telegram",
    description: "Get quick responses via Telegram support",
    value: "@mryaxyobek",
    href: "https://t.me/mryaxyobek",
    color: "bg-sky-100 text-sky-600",
    hoverColor: "hover:bg-sky-50 hover:border-sky-200",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us an email for detailed inquiries",
    value: "pubgn9642@gmail.com",
    href: "mailto:pubgn9642@gmail.com",
    color: "bg-rose-100 text-rose-600",
    hoverColor: "hover:bg-rose-50 hover:border-rose-200",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Call us for urgent matters",
    value: "+998 88 999 73 88",
    href: "tel:+998889997388",
    color: "bg-emerald-100 text-emerald-600",
    hoverColor: "hover:bg-emerald-50 hover:border-emerald-200",
  },
];

// FAQ items (same as home page)
const faqs = [
  {
    question: "What is Figma Market?",
    answer:
      "Figma Market is a platform offering thousands of free premium Figma design resources including UI kits, web templates, mobile app designs, icons, illustrations, and 3D assets for designers and developers.",
  },
  {
    question: "Are the Figma resources free to download?",
    answer:
      "Yes, all design resources on Figma Market are completely free to download and use in your personal and commercial projects.",
  },
  {
    question: "What types of design resources are available?",
    answer:
      "We offer web site templates, mobile app UI kits, UI component libraries, icon sets, illustrations, and 3D assets - all compatible with Figma.",
  },
  {
    question: "How do I use the downloaded Figma files?",
    answer:
      "Simply download the Figma file and open it in Figma (desktop app or web). You can then customize the designs according to your needs.",
  },
];

// Contact schema for SEO
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Figma Market",
  description: "Get in touch with Figma Market team for support and inquiries.",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+998889997388",
        contactType: "customer support",
        email: "pubgn9642@gmail.com",
        availableLanguage: ["English", "Uzbek"],
      },
    ],
  },
};

const ContactPage = () => {
  return (
    <>
      <JsonLd data={contactSchema} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                Contact
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Get in <span className="text-violet-600">Touch</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Have questions? We're here to help! Choose one of the methods
                below to reach out to us.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`group p-8 rounded-2xl border border-gray-100 transition-all duration-200 ${method.hoverColor}`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${method.color} rounded-2xl mb-6`}
                  >
                    <method.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    {method.description}
                  </p>

                  <div className="flex items-center gap-2 text-gray-900 font-medium group-hover:text-violet-600 transition-colors">
                    <span>{method.value}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Working Hours */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-xl mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Working Hours
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-gray-900">
                      09:00 - 18:00
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-gray-900">
                      10:00 - 15:00
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-rose-500">Closed</span>
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-100 text-violet-600 rounded-xl mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Location
                </h3>
                <p className="text-gray-600 mb-4">
                  We are an online platform. You can reach us from anywhere in
                  the world.
                </p>
                <div className="flex items-center gap-2 text-violet-600 font-medium">
                  <span>🌍 Global Platform</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
                <Send className="w-8 h-8" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Still Have Questions?
              </h2>

              <p className="text-violet-100 text-lg">
                Get quick responses via Telegram or explore our design
                resources.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="https://t.me/mryaxyobek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 rounded-xl hover:bg-violet-50 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message on Telegram
                </a>
                <Link
                  href="/explore/all"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors duration-200"
                >
                  Browse Designs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
