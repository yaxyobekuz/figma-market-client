// SEO
import { siteConfig } from "@/lib/seo.config";

// Next
import Link from "next/link";

// Components
import JsonLd from "@/components/seo/JsonLd";

// Page Metadata
export const metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for Figma Market. Understand your rights and responsibilities when using our free design resources.",
  keywords: [
    "terms of service",
    "Figma Market terms",
    "usage terms",
    "license agreement",
  ],
  openGraph: {
    title: "Terms of Service - Figma Market",
    description:
      "Read the Terms of Service for Figma Market. Understand your rights and responsibilities.",
    url: `${siteConfig.url}/terms`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Terms of Service - Figma Market",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

// Terms sections
const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      {
        text: "By accessing and using Figma Market, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
      },
      {
        text: "We reserve the right to modify these terms at any time. Your continued use of the website after any changes indicates your acceptance of the modified terms.",
      },
    ],
  },
  {
    title: "Description of Service",
    content: [
      {
        text: "Figma Market provides a platform for users to discover, browse, and download free Figma design resources including UI kits, templates, icons, illustrations, and other design assets.",
      },
      {
        text: "Our services are provided 'as is' and we make no warranties regarding the availability, accuracy, or reliability of any design resources.",
      },
    ],
  },
  {
    title: "License and Usage Rights",
    content: [
      {
        subtitle: "Personal and Commercial Use",
        text: "All design resources available on Figma Market are free to use for both personal and commercial projects unless otherwise specified on the individual resource page.",
      },
      {
        subtitle: "Restrictions",
        text: "You may not resell, redistribute, or claim ownership of any design resources downloaded from Figma Market. You may not use the resources in a way that competes with Figma Market.",
      },
      {
        subtitle: "Attribution",
        text: "While attribution is not required, we appreciate credit when you use our resources. A link back to Figma Market is always welcome but not mandatory.",
      },
      {
        subtitle: "Modifications",
        text: "You are free to modify, adapt, and build upon the design resources for your own projects. The modified versions are subject to the same usage terms.",
      },
    ],
  },
  {
    title: "User Conduct",
    content: [
      {
        text: "When using Figma Market, you agree not to:",
      },
      {
        list: [
          "Use the website for any unlawful purpose or in violation of any applicable laws",
          "Attempt to gain unauthorized access to our systems or user accounts",
          "Interfere with or disrupt the website's functionality or servers",
          "Upload or transmit viruses, malware, or other harmful code",
          "Scrape, crawl, or use automated tools to access our content without permission",
          "Impersonate any person or entity or misrepresent your affiliation",
        ],
      },
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Our Content",
        text: "The Figma Market website, including its design, logos, and original content, is protected by copyright and other intellectual property laws. You may not copy or reproduce our branding without permission.",
      },
      {
        subtitle: "Third-Party Content",
        text: "Some design resources may be created by third-party designers. We make reasonable efforts to ensure all resources are properly licensed, but we cannot guarantee the intellectual property status of all content.",
      },
    ],
  },
  {
    title: "Disclaimer of Warranties",
    content: [
      {
        text: "Figma Market is provided on an 'as is' and 'as available' basis. We disclaim all warranties, express or implied, including but not limited to:",
      },
      {
        list: [
          "Merchantability and fitness for a particular purpose",
          "Accuracy, reliability, or completeness of any content",
          "Uninterrupted or error-free operation of the website",
          "Security of data transmitted through the website",
        ],
      },
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      {
        text: "To the maximum extent permitted by law, Figma Market and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website or design resources.",
      },
      {
        text: "Our total liability for any claims arising from your use of the service shall not exceed the amount you paid to us (if any) in the past 12 months.",
      },
    ],
  },
  {
    title: "Indemnification",
    content: [
      {
        text: "You agree to indemnify, defend, and hold harmless Figma Market, its operators, affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the website or violation of these terms.",
      },
    ],
  },
  {
    title: "Links to Third-Party Websites",
    content: [
      {
        text: "Our website may contain links to third-party websites or services that are not owned or controlled by Figma Market. We are not responsible for the content, privacy policies, or practices of any third-party websites.",
      },
    ],
  },
  {
    title: "Termination",
    content: [
      {
        text: "We reserve the right to terminate or suspend your access to Figma Market at any time, without prior notice, for any reason, including but not limited to breach of these Terms of Service.",
      },
    ],
  },
  {
    title: "Governing Law",
    content: [
      {
        text: "These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved through appropriate legal channels.",
      },
    ],
  },
];

// Schema for SEO
const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service - Figma Market",
  description:
    "Read the Terms of Service for Figma Market. Understand your rights and responsibilities when using our free design resources.",
  url: `${siteConfig.url}/terms`,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const TermsPage = () => {
  return (
    <>
      <JsonLd data={termsSchema} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                Legal
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Terms of <span className="text-violet-600">Service</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Please read these terms carefully before using our website and
                services.
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
                  Welcome to Figma Market. These Terms of Service govern your
                  use of our website and services. By using Figma Market, you
                  agree to these terms. Please read them carefully.
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
                          {item.subtitle && (
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.subtitle}
                            </h3>
                          )}
                          {item.text && (
                            <p className="text-gray-600 leading-relaxed">
                              {item.text}
                            </p>
                          )}
                          {item.list && (
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                              {item.list.map((listItem, listIndex) => (
                                <li key={listIndex}>{listItem}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions about these Terms of Service, please
                  contact us. We're happy to clarify any points.
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

              {/* Related Links */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link
                  href="/privacy"
                  className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  Privacy Policy →
                </Link>
                <Link
                  href="/about"
                  className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  About Us →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TermsPage;
