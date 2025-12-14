// SEO
import { siteConfig } from "@/lib/seo.config";

// Next
import Link from "next/link";

// Components
import JsonLd from "@/components/seo/JsonLd";

// Page Metadata
export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Figma Market collects, uses, and protects your personal information. Read our privacy policy for details.",
  keywords: [
    "privacy policy",
    "Figma Market privacy",
    "data protection",
    "user privacy",
  ],
  openGraph: {
    title: "Privacy Policy - Figma Market",
    description:
      "Learn how Figma Market collects, uses, and protects your personal information.",
    url: `${siteConfig.url}/privacy`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Figma Market",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

// Privacy sections
const sections = [
  {
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        text: "When you use Figma Market, you may provide us with certain information, including but not limited to your email address when contacting us, and any feedback or communications you send to us.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.",
      },
      {
        subtitle: "Cookies and Similar Technologies",
        text: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "To Provide Our Services",
        text: "We use the information we collect to provide, maintain, and improve our services, including to process your requests and deliver the design resources you download.",
      },
      {
        subtitle: "To Communicate With You",
        text: "We may use your information to respond to your comments, questions, and requests, and to provide customer service and support.",
      },
      {
        subtitle: "To Improve Our Website",
        text: "We use analytics data to understand how users interact with our website, which helps us improve user experience and develop new features.",
      },
    ],
  },
  {
    title: "Information Sharing",
    content: [
      {
        subtitle: "Third-Party Service Providers",
        text: "We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, and customer service.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required to do so by law or in response to valid requests by public authorities.",
      },
      {
        subtitle: "Business Transfers",
        text: "If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      },
    ],
  },
  {
    title: "Data Security",
    content: [
      {
        subtitle: "Security Measures",
        text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        subtitle: "Data Retention",
        text: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations.",
      },
    ],
  },
  {
    title: "Your Rights",
    content: [
      {
        subtitle: "Access and Correction",
        text: "You have the right to access, correct, or delete your personal information. You can contact us to exercise these rights.",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages.",
      },
      {
        subtitle: "Do Not Track",
        text: "Some browsers have a 'Do Not Track' feature. We currently do not respond to Do Not Track signals.",
      },
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age Restrictions",
        text: "Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.",
      },
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "Policy Updates",
        text: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
      },
    ],
  },
];

// Schema for SEO
const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy - Figma Market",
  description:
    "Learn how Figma Market collects, uses, and protects your personal information.",
  url: `${siteConfig.url}/privacy`,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const PrivacyPage = () => {
  return (
    <>
      <JsonLd data={privacySchema} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                Legal
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Privacy <span className="text-violet-600">Policy</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Your privacy is important to us. This policy explains how we
                collect, use, and protect your information.
              </p>

              <p className="text-sm text-gray-500">
                Last Updated: December 14, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-12 p-6 rounded-2xl bg-gray-50">
                <p className="text-gray-600 leading-relaxed">
                  Welcome to Figma Market. We are committed to protecting your
                  personal information and your right to privacy. This Privacy
                  Policy describes how we collect, use, and share information
                  when you use our website and services.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-violet-100 text-violet-600 rounded-lg text-sm font-bold">
                        {index + 1}
                      </span>
                      {section.title}
                    </h2>

                    <div className="space-y-4 pl-11">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.subtitle}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Us About Privacy
                </h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:pubgn9642@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors duration-200"
                  >
                    Email Us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors duration-200"
                  >
                    Contact Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPage;
