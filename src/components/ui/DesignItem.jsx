// Next.js
import Image from "next/image";

// Example design image
import designImg from "@/assets/images/design.webp";

// Icons
import { Eye, Heart } from "lucide-react";

const DesignItem = ({ design, className, showAuthor = true, ...props }) => {
  return (
    <li className="">
      <div className="relative">
        {/* Image */}
        <Image
          src={designImg}
          alt="Design example image"
          className="w-full h-auto aspect-[4/3] object-cover bg-gray-50 rounded-xl mb-3.5"
        />

        {/* Toggle Like button */}
        <button className="absolute top-3.5 right-3.5 bg-white text-gray-600 p-2.5 rounded-full">
          <Heart strokeWidth={1.5} size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between px-1.5">
        {/* Title */}
        <h3 className="line-clamp-1 font-medium">
          Design name #{Math.floor(Math.random() * 100)}
        </h3>

        {/* Views */}
        <div className="flex items-center gap-1.5 shrink-0 text-gray-500">
          <Eye strokeWidth={1.5} size={20} />
          <span className="text-sm">
            {Math.floor(Math.random() * 5000).toLocaleString()}
          </span>
        </div>
      </div>
    </li>
  );
};

export default DesignItem;
