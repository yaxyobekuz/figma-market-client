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
import Breadcrumb from "@/components/ui/Breadcrumb";

// Icons
import { Eye, Tag, Heart, Calendar, ExternalLink } from "lucide-react";

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

  return (
    <div className="pt-8 pb-12">
      <div className="container space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4">
              {/* Title */}
              <h1 className="text-2xl font-semibold">{design.title}</h1>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed whitespace-pre-wrap">
                {design.description}
              </p>
            </div>

            {/* Preview Images */}
            {design.previewImages.map((img, index) => (
              <div
                key={img._id}
                className="relative w-full h-auto bg-gray-100 rounded-3xl overflow-hidden"
              >
                <Image
                  width={600}
                  height={450}
                  src={getApiImageUrl(img.path)}
                  alt={`${design.title} preview ${index + 1}`}
                  className="size-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Side - Details */}
          <div className="sticky top-5 max-h-max space-y-6">
            <div className="border border-gray-200 rounded-3xl p-6 space-y-5">
              {/* Top */}
              <div className="flex items-center justify-between gap-4 text-gray-600">
                {/* Views count */}
                <div className="flex items-center gap-2">
                  <Eye strokeWidth={1.5} size={20} />
                  <span className="text-sm">
                    {design.viewsCount || 0} views
                  </span>
                </div>

                {/* Category */}
                <Link
                  href={category.href}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-100 transition-colors"
                >
                  <category.icon size={20} strokeWidth={1.5} />
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
                  >
                    <ExternalLink size={20} strokeWidth={1.5} />
                    <span>View Design</span>
                  </a>
                )}

                <button className="flex items-center justify-center gap-2 w-full h-12 border border-gray-200 text-gray-700 rounded-xl transition-colors duration-200 hover:bg-gray-50">
                  <Heart size={20} strokeWidth={1.5} />
                  <span>Save Design</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="border border-gray-200 rounded-3xl p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Tag size={20} strokeWidth={1.5} />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors duration-200 hover:bg-gray-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Date Info */}
            <div className="border border-gray-200 rounded-3xl p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar size={20} strokeWidth={1.5} />
                <span>Details</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">
                    {new Date(design.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">
                    {new Date(design.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetail;
