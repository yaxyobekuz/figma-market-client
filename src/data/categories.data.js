// Icons
import {
  Box,
  Layout,
  PenTool,
  PanelTop,
  Smartphone,
  Grid2X2Icon,
  LineSquiggle,
} from "lucide-react";

const categories = [
  {
    icon: Grid2X2Icon,
    name: "All",
    slug: "all",
    href: "/explore/all",
  },
  {
    icon: PanelTop,
    name: "Web Site",
    slug: "web-site",
    href: "/explore/web-site",
  },
  {
    icon: Smartphone,
    name: "Mobile App",
    slug: "mobile-app",
    href: "/explore/mobile-app",
  },
  {
    icon: Layout,
    name: "UI Kit",
    slug: "ui-kit",
    href: "/explore/ui-kit",
  },
  {
    icon: PenTool,
    name: "Icon Set",
    slug: "icon-set",
    href: "/explore/icon-set",
  },
  {
    icon: LineSquiggle,
    name: "Illustration",
    slug: "illustration",
    href: "/explore/illustration",
  },
  {
    icon: Box,
    name: "3D Asset",
    slug: "3d-asset",
    href: "/explore/3d-asset",
  },
];

export default categories;
