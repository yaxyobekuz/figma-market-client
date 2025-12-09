// Next.js
import Link from "next/link";
import Image from "next/image";

// Api
import { getApiImageUrl } from "@/api";

// Icons
import { Eye, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const DesignItem = ({ className, _id: id, title, viewsCount, thumbnail }) => {
  const thumbnailUrl = getApiImageUrl(thumbnail?.path);

  return (
    <li className={cn("relative group pb-1.5 rounded-3xl", className)}>
      {/* Top */}
      <div className="relative w-full h-auto aspect-[4/3] bg-gray-100 overflow-hidden mb-3.5 rounded-3xl">
        {/* Image */}
        <Image
          width={400}
          height={300}
          src={thumbnailUrl}
          alt={title || "Design"}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Toggle Like button */}
        <button className="absolute top-3.5 right-3.5 z-10 bg-white text-gray-600 p-2.5 rounded-full hover:text-violet-500 transition-colors">
          <Heart strokeWidth={1.5} size={20} />
        </button>
      </div>

      {/* Main */}
      <div className="flex items-center justify-between px-1.5">
        {/* Title */}
        <h3 className="line-clamp-1 font-medium transition-colors duration-200 group-hover:text-violet-500">
          {title}
        </h3>

        {/* Views */}
        <div className="flex items-center gap-1.5 shrink-0 text-gray-500">
          <Eye strokeWidth={1.5} size={20} />
          <span className="text-sm">{viewsCount || 0}</span>
        </div>
      </div>

      {/* Link */}
      <Link
        href={`/designs/${id}`}
        aria-label={`View details for ${title}`}
        className="absolute inset-0 size-full rounded-3xl"
      />
    </li>
  );
};

export default DesignItem;
