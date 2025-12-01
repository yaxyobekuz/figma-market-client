"use client";

// Next
import Link from "next/link";

// Icons
import { Heart } from "lucide-react";

// Components
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 py-12 space-y-8">
      {/* Top */}
      <header className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Saved */}
          <Link
            href="/"
            className="flex items-center gap-3 h-11 bg-white px-4 rounded-full"
          >
            <Heart strokeWidth={1.5} />
            <span>Saved Designs</span>
          </Link>
        </div>
      </header>

      {/* Detail */}
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

      <div className="container">
        <SearchBox />
      </div>
    </div>
  );
};

export default Header;
