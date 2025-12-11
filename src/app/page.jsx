// Next
import Link from "next/link";

// Data
import categories from "@/data/categories.data";

// Components
import DesignItem from "@/components/ui/DesignItem";
import JsonLd from "@/components/seo/JsonLd";

// API
import { getPopularDesigns } from "@/api/design.api";

// SEO
import {
  siteConfig,
  generateCollectionSchema,
  generateFAQSchema,
} from "@/lib/seo.config";

// Page Metadata
export const metadata = {
  title: "Free Premium Figma Design Resources & Templates",
  description:
    "Discover thousands of free premium Figma design resources. Download UI kits, web templates, mobile app designs, icons, illustrations, and 3D assets for your next project.",
  keywords: [
    "free Figma resources",
    "Figma templates",
    "UI kits",
    "design resources",
    "Figma community",
    "web design templates",
    "mobile app templates",
  ],
  openGraph: {
    title: "Figma Market - Free Premium Figma Design Resources",
    description:
      "Discover thousands of free premium Figma design resources. Download UI kits, web templates, mobile app designs, icons, and more.",
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Figma Market - Free Design Resources",
      },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

// FAQ data for SEO
const homeFAQs = [
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

const Home = async () => {
  // Fetch popular designs
  const designs = await getPopularDesigns();

  // Generate schemas for SEO
  const collectionSchema = generateCollectionSchema(
    designs,
    "Popular Figma Design Resources",
    "Browse the most popular free Figma design resources"
  );
  const faqSchema = generateFAQSchema(homeFAQs);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />

      {/* Categories Section */}
      <section className="py-8" aria-labelledby="categories-heading">
        <div className="container space-y-5">
          {/* Title */}
          <h2 id="categories-heading" className="text-2xl font-medium">
            Categories
          </h2>

          {/* Categories list*/}
          <nav aria-label="Design categories">
            <ul className="flex gap-1">
              {categories.map((category) => (
                <li key={category.slug} className="w-full">
                  <Link
                    href={category.href}
                    className="flex items-center justify-center gap-3.5 w-full h-12 bg-gray-50 rounded-xl transition-colors duration-200 hover:bg-gray-100"
                    title={`Browse ${category.name} Figma designs`}
                  >
                    <category.icon
                      className="w-6 h-6"
                      strokeWidth={1.5}
                      color="#8b5cf6"
                      aria-hidden="true"
                    />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Popular Designs Section */}
      <section className="py-8" aria-labelledby="popular-heading">
        <div className="container space-y-5">
          {/* Title */}
          <h2 id="popular-heading" className="text-2xl font-medium">
            Popular Designs
          </h2>

          {/* Popular designs list */}
          {designs.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {designs.map((design) => (
                <DesignItem key={design._id} data={design} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-12">
              No designs available at the moment. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* FAQ Section (Hidden visually but good for SEO) */}
      <section className="py-12 bg-gray-50" aria-labelledby="faq-heading">
        <div className="container space-y-8">
          <h2 id="faq-heading" className="text-2xl font-medium text-center">
            Frequently Asked Questions
          </h2>
          <dl className="max-w-3xl mx-auto space-y-6">
            {homeFAQs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <dt className="font-semibold text-lg">{faq.question}</dt>
                <dd className="text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
};

export default Home;
