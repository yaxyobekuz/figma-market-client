// Icons
import {
  Box,
  Layout,
  PenTool,
  PanelTop,
  Smartphone,
  Grid2X2Icon,
  LineSquiggle,
  LayoutDashboard,
} from "lucide-react";

const categories = [
  {
    icon: Grid2X2Icon,
    name: "All",
    label: "Explore Designs",
    slug: "all",
    href: "/explore/all",
  },
  {
    icon: PanelTop,
    name: "Web Site",
    label: "Website Designs",
    slug: "web-site",
    href: "/explore/web-site",
  },
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    label: "Dashboard Designs",
    slug: "dashboard",
    href: "/explore/dashboard",
  },
  {
    icon: Smartphone,
    name: "Mobile App",
    label: "Mobile App Designs",
    slug: "mobile-app",
    href: "/explore/mobile-app",
  },
  {
    icon: Layout,
    name: "UI Kit",
    label: "UI Kits",
    slug: "ui-kit",
    href: "/explore/ui-kit",
  },
  {
    icon: PenTool,
    name: "Icon Set",
    label: "Icon Sets",
    slug: "icon-set",
    href: "/explore/icon-set",
  },
  {
    icon: LineSquiggle,
    name: "Illustration",
    label: "Illustrations",
    slug: "illustration",
    href: "/explore/illustration",
  },
  {
    icon: Box,
    name: "3D Asset",
    label: "3D Assets",
    slug: "3d-asset",
    href: "/explore/3d-asset",
  },
];

export default categories;
