"use client";

// Next
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { Heart } from "lucide-react";

// Components
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

const Header = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isHomePage = pathname === "/";
  const category = params.category || "all";
  const searchQuery = searchParams.get("searchQuery");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();

    if (query) {
      router.push(
        `/explore/${category}?searchQuery=${encodeURIComponent(query)}`
      );
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-200",
        isHomePage
          ? "bg-gradient-to-b from-gray-100 space-y-8 py-12"
          : "bg-gray-50 space-y-5 py-5"
      )}
    >
      {/* Top */}
      <header className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Saved */}
          <Link
            href="/saved"
            className="flex items-center gap-3 h-11 bg-white px-4 rounded-full"
          >
            <Heart strokeWidth={1.5} />
            <span>Saved Designs</span>
          </Link>
        </div>
      </header>

      {/* Detail */}
      {isHomePage && (
        <div className="container space-y-3.5">
          {/* Title */}
          <h1 className="text-gray-800 font-medium text-2xl">
            Free Figma Designs for Developers and Designers
          </h1>

          {/* Description */}
          <p className="max-w-3xl text-gray-600 text-lg">
            Discover a curated library of free, professional Figma designs built
            to accelerate your workflow and enhance your creative output.
          </p>
        </div>
      )}

      <div className="container">
        <SearchBox onSubmit={handleSubmit} defaultValue={searchQuery} />
      </div>
    </div>
  );
};

export default Header;
