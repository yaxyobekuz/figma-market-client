"use client";

// Components
import Logo from "../ui/Logo";

// Constants
import { cn } from "@/lib/utils";

// Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer
      className={cn(
        "py-12",
        isHomePage ? "bg-gradient-to-t from-gray-100" : "bg-gray-50"
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 space-y-3.5">
            <Logo />

            <p className="text-sm text-gray-500">
              Discover and share amazing Figma designs with the community.
            </p>
          </div>

          {/* Product */}
          <div>
            {/* Title */}
            <h3 className="font-semibold mb-4">Product</h3>

            {/* List */}
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  href="/explore/all"
                  className="transition-colors duration-200 hover:text-violet-500"
                >
                  Explore
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            {/* Title */}
            <h3 className="font-semibold mb-4">Company</h3>

            {/* List */}
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-200 hover:text-violet-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors duration-200 hover:text-violet-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            {/* Title */}
            <h3 className="font-semibold mb-4">Legal</h3>

            {/* List */}
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors duration-200 hover:text-violet-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors duration-200 hover:text-violet-500"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-12 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © 2025 Figma Market. All rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/figma_market"
              className="transition-colors duration-200 hover:text-violet-500"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
