// Next.js
import Link from "next/link";
import Image from "next/image";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { Calendar } from "lucide-react";

// API
import { getApiImageUrl } from "@/api";
import { formatDate } from "@/lib/date.formatters";

const BlogItem = ({ className, data, priority = false }) => {
  const { _id: id, title, description, thumbnail, createdAt } = data || {};

  const thumbnailUrl = getApiImageUrl(thumbnail?.path);

  return (
    <li
      itemScope
      itemType="https://schema.org/BlogPosting"
      className={cn("relative group pb-1.5 rounded-3xl", className)}
    >
      {/* Hidden SEO content */}
      <meta itemProp="headline" content={title} />
      <meta itemProp="description" content={description?.slice(0, 160) || ""} />
      <meta itemProp="image" content={thumbnailUrl} />
      <meta itemProp="datePublished" content={createdAt} />

      {/* Thumbnail */}
      <div className="relative w-full h-auto aspect-[4/3] bg-gray-100 overflow-hidden mb-3.5 rounded-3xl">
        <Image
          width={400}
          height={300}
          src={thumbnailUrl}
          priority={priority}
          alt={title || "Blog Thumbnail"}
          loading={priority ? undefined : "lazy"}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Reading time badge */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full">
          <Calendar size={14} strokeWidth={1.5} />
          <time dateTime={createdAt} itemProp="datePublished">
            {formatDate(createdAt)}
          </time>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 px-1.5">
        {/* Title */}
        <h3
          itemProp="name"
          className="line-clamp-2 font-medium transition-colors duration-200 group-hover:text-violet-500"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
      </div>

      {/* Link */}
      <Link
        itemProp="url"
        href={`/blog/${id}`}
        aria-label={`Read ${title}`}
        className="absolute inset-0 size-full rounded-3xl"
      />
    </li>
  );
};

export default BlogItem;
