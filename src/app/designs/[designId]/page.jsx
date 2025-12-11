// SEO
import {
  siteConfig,
  generateDesignSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo.config";

// Next.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Data
import categories from "@/data/categories.data";

// API
import { getApiImageUrl } from "@/api";
import { getDesignById } from "@/api/design.api";

// Components
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SaveButton from "@/components/ui/SaveButton";

// Icons
import { Eye, Tag, Calendar, ExternalLink } from "lucide-react";

// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const { designId } = await params;
  const design = await getDesignById(designId);

  if (!design) {
    return {
      title: "Design Not Found",
      description: "The requested design could not be found.",
    };
  }

  const category = categories.find((cat) => cat.slug === design.category);
  const imageUrl = design.previewImages?.[0]?.path
    ? getApiImageUrl(design.previewImages[0].path)
    : siteConfig.ogImage;

  const keywords = [
    design.title,
    category?.name || "Design",
    "Figma template",
    "free design",
    ...(design.tags || []),
  ];

  return {
    title: design.title,
    description:
      design.description?.slice(0, 160) ||
      `Download ${design.title} - Free ${
        category?.name || "design"
      } Figma template from Figma Market.`,
    keywords: keywords,
    openGraph: {
      title: `${design.title} | Free Figma Template`,
      description:
        design.description?.slice(0, 200) ||
        `Download ${design.title} for free from Figma Market.`,
      url: `${siteConfig.url}/designs/${designId}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: design.title,
        },
      ],
      publishedTime: design.createdAt,
      modifiedTime: design.updatedAt,
      authors: [siteConfig.name],
      tags: design.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${design.title} | Free Figma Template`,
      description:
        design.description?.slice(0, 200) ||
        `Download ${design.title} for free.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${siteConfig.url}/designs/${designId}`,
    },
    other: {
      "article:published_time": design.createdAt,
      "article:modified_time": design.updatedAt,
      "article:section": category?.name || "Design",
      "article:tag": design.tags?.join(", ") || "",
    },
  };
}

const DesignDetail = async ({ params }) => {
  const { designId } = await params;

  // Fetch design data
  const design = await getDesignById(designId);

  // If design not found, show 404 page
  if (!design) notFound();

  const category = categories.find((cat) => cat.slug === design.category);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore/all" },
    { label: category?.name || "Category", href: category?.href || "/" },
    { label: design.title, href: `/designs/${designId}` },
  ];

  // Generate schemas
  const designSchema = generateDesignSchema(design, category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="pt-8 pb-12">
      {/* JSON-LD Structured Data */}
      <JsonLd data={designSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top */}
            <header className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4">
              {/* Title */}
              <h1 className="text-2xl font-semibold">{design.title}</h1>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed whitespace-pre-wrap">
                {design.description}
              </p>
            </header>

            {/* Preview Images */}
            {design.previewImages.map((img, index) => (
              <figure key={index}>
                <Image
                  width={600}
                  height={450}
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                  src={getApiImageUrl(img.path)}
                  alt={`${design.title} - Preview ${index + 1}`}
                  className="w-full h-auto bg-gray-100 rounded-3xl border"
                />
              </figure>
            ))}
          </div>

          {/* Right Side - Details */}
          <aside className="sticky top-5 max-h-max space-y-6">
            <div className="border border-gray-200 rounded-3xl p-6 space-y-5">
              {/* Top */}
              <div className="flex items-center justify-between gap-4 text-gray-600">
                {/* Views count */}
                <div className="flex items-center gap-2">
                  <Eye strokeWidth={1.5} size={20} aria-hidden="true" />
                  <span className="text-sm">
                    {design.viewsCount || 0} views
                  </span>
                </div>

                {/* Category */}
                <Link
                  href={category.href}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-100 transition-colors"
                  title={`Browse more ${category.name} designs`}
                >
                  <category.icon
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>{category.name}</span>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {design.url && (
                  <a
                    target="_blank"
                    href={design.url}
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-12 bg-violet-500 text-white rounded-xl hover:bg-violet-700 transition-colors duration-200"
                    aria-label={`View ${design.title} on Figma`}
                  >
                    <ExternalLink
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span>View Design</span>
                  </a>
                )}

                <SaveButton design={design} />
              </div>
            </div>

            {/* Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="border border-gray-200 rounded-3xl p-6 space-y-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Tag size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span>Tags</span>
                </h2>
                <ul className="flex flex-wrap gap-2" aria-label="Design tags">
                  {design.tags.map((tag, index) => (
                    <li key={index}>
                      <span className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors duration-200 hover:bg-gray-100">
                        #{tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Date Info */}
            <div className="border border-gray-200 rounded-3xl p-6 space-y-3">
              <h2 className="font-semibold flex items-center gap-2">
                <Calendar size={20} strokeWidth={1.5} aria-hidden="true" />
                <span>Details</span>
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Published:</dt>
                  <dd className="font-medium">
                    <time dateTime={design.createdAt}>
                      {new Date(design.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Updated:</dt>
                  <dd className="font-medium">
                    <time dateTime={design.updatedAt}>
                      {new Date(design.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </article>
      </div>
    </div>
  );
};

export default DesignDetail;
