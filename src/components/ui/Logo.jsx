// Next
import Link from "next/link";
import Image from "next/image";

// Icons
import figmaLogo from "@/assets/icons/figma-white-logo.svg";

const Logo = () => (
  <Link
    href="/"
    title="Figma Market home"
    className="flex items-center justify-center gap-2.5 max-w-max text-gray-900 font-medium text-3xl"
  >
    {/* Icon */}
    <span className="flex items-center justify-center bg-gradient-to-tr from-violet-300 to-violet-600 rounded-full size-9">
      <Image
        width={20}
        height={20}
        src={figmaLogo}
        alt="Figma Market Icon"
        className="size-5 -mb-0.5"
      />
    </span>

    {/* Text */}
    <span>
      Figma <span className="text-violet-500">Market</span>
    </span>
  </Link>
);

export default Logo;
