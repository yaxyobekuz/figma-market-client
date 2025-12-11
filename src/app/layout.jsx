// Styles
import "./globals.css";

// SEO
import {
  siteConfig,
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/seo.config";

// Fonts
import { Rubik } from "next/font/google";

// Components
import NextTopLoader from "nextjs-toploader";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Context
import { SavedDesignsProvider } from "@/context/SavedDesignsContext";

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
});

// Global Metadata
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
  alternates: { canonical: siteConfig.url },
  category: "design",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

// Viewport configuration
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#8b5cf6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const RootLayout = ({ children }) => {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={rubik.variable}>
      <head>
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${rubik.className} antialiased bg-white`}>
        <SavedDesignsProvider>
          <NextTopLoader color="#8b5cf6" showSpinner={false} height={4} />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SavedDesignsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
