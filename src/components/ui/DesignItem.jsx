// Next.js
import Link from "next/link";
import Image from "next/image";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { Eye } from "lucide-react";

// Components
import LikeButton from "./LikeButton";

// Api
import { getApiImageUrl } from "@/api";

const DesignItem = ({ className, data }) => {
  const {
    _id: id,
    title,
    viewsCount,
    thumbnail,
    description,
    category,
  } = data || {};
  const thumbnailUrl = getApiImageUrl(thumbnail?.path);

  return (
    <li
      itemScope
      itemType="https://schema.org/CreativeWork"
      className={cn("relative group pb-1.5 rounded-3xl", className)}
    >
      {/* Hidden SEO content */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description?.slice(0, 160) || ""} />
      <meta itemProp="image" content={thumbnailUrl} />

      {/* Top */}
      <div className="relative w-full h-auto aspect-[4/3] bg-gray-100 overflow-hidden mb-3.5 rounded-3xl">
        {/* Image */}
        <Image
          width={400}
          height={300}
          src={thumbnailUrl}
          alt={`${title} - Free ${category || "design"} Figma template`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Toggle Like button */}
        <LikeButton design={data} className="absolute top-3.5 right-3.5 z-10" />
      </div>

      {/* Main */}
      <div className="flex items-center justify-between px-1.5">
        {/* Title */}
        <h3
          className="line-clamp-1 font-medium transition-colors duration-200 group-hover:text-violet-500"
          itemProp="headline"
        >
          {title}
        </h3>

        {/* Views */}
        <div className="flex items-center gap-1.5 shrink-0 text-gray-500">
          <Eye strokeWidth={1.5} size={20} aria-hidden="true" />
          <span className="text-sm" aria-label={`${viewsCount || 0} views`}>
            {viewsCount || 0}
          </span>
        </div>
      </div>

      {/* Link */}
      <Link
        itemProp="url"
        href={`/designs/${id}`}
        className="absolute inset-0 size-full rounded-3xl"
        aria-label={`View ${title} - Free Figma design template`}
      />
    </li>
  );
};

export default DesignItem;
