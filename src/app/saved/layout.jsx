import { siteConfig } from "@/lib/seo.config";

export const metadata = {
  title: "Saved Designs",
  description:
    "View and manage your saved Figma design resources. Access your favorite UI kits, templates, icons, and illustrations anytime.",
  openGraph: {
    title: "Saved Designs | Figma Market",
    description: "View and manage your saved Figma design resources.",
    url: `${siteConfig.url}/saved`,
  },
  alternates: { canonical: `${siteConfig.url}/saved` },
  robots: { index: false, follow: true },
};

export default function SavedLayout({ children }) {
  return children;
}
