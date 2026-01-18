// Next.js
import Image from "next/image";
import { notFound } from "next/navigation";

// API
import { getApiImageUrl } from "@/api";
import { getBlogById } from "@/api/blog.api";

// Icons
import { Calendar, Eye } from "lucide-react";

// SEO
import { siteConfig } from "@/lib/seo.config";

// Utils
import { formatDate } from "@/lib/date.formatters";

// Components
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RelatedBlogs from "@/components/ui/RelatedBlogs";
import BlogViewTracker from "@/components/ui/BlogViewTracker";

// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl = blog.thumbnail?.path
    ? getApiImageUrl(blog.thumbnail?.path)
    : siteConfig.ogImage;

  // Use SEO fields if available, otherwise fall back to regular fields
  const metaTitle = blog.metaTitle || blog.title;
  const metaDescription =
    blog.metaDescription || blog.description?.slice(0, 160);

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [blog.title, "blog", "design", "Figma", "tutorial"],
    openGraph: {
      title: `${metaTitle} | Figma Market Blog`,
      description: metaDescription,
      url: `${siteConfig.url}/blog/${blogId}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} | Figma Market Blog`,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${blogId}`,
    },
    other: {
      "article:published_time": blog.createdAt,
      "article:modified_time": blog.updatedAt,
    },
  };
}

const BlogDetail = async ({ params }) => {
  const { blogId } = await params;

  // Fetch blog data
  const blog = await getBlogById(blogId);

  // If blog not found, show 404 page
  if (!blog) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: blog.title, href: `/blog/${blogId}` },
  ];

  const thumbnailUrl = getApiImageUrl(blog.thumbnail?.path);

  // Generate blog schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: thumbnailUrl,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${blogId}`,
    },
    timeRequired: `PT${blog.readingTime}M`,
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <div className="py-8">
      {/* Track user views */}
      <BlogViewTracker blogId={blogId} />

      {/* JSON-LD Structured Data */}
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Content */}
      <div className="container !max-w-4xl">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <article>
          {/* Header */}
          <header className="mb-6">
            {/* Meta info */}
            <div className="flex items-center justify-between">
              {/* Created At */}
              <div
                itemProp="datePublished"
                className="flex items-center gap-1.5 text-gray-500 mb-5"
              >
                <Calendar size={18} strokeWidth={1.5} />
                <time dateTime={blog.createdAt}>
                  {formatDate(blog.createdAt)}
                </time>
              </div>

              {/* Views Count */}
              <div
                itemProp="interactionStatistic"
                className="flex items-center gap-1.5 text-gray-500 mb-5"
              >
                <Eye size={20} strokeWidth={1.5} />
                <span>{blog.viewsCount} views</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-3.5 text-xl font-semibold leading-snug sm:text-2xl md:leading-normal md:text-3xl">
              {blog.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed sm:text-lg">
              {blog.description}
            </p>
          </header>

          {/* Featured Image */}
          <Image
            priority
            width={896}
            height={400}
            alt={blog.title}
            src={thumbnailUrl}
            className="w-full aspect-[4/3] object-cover rounded-xl mb-8"
          />

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>

      {/* Related Blogs */}
      <RelatedBlogs blogId={blogId} />
    </div>
  );
};

export default BlogDetail;
