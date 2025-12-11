// SEO Configuration
export const siteConfig = {
  name: "Figma Market",
  title: "Figma Market - Free Premium Figma Design Resources",
  description:
    "Discover thousands of free premium Figma design resources including UI kits, web templates, mobile app designs, icons, illustrations, and 3D assets. Download high-quality Figma files for your next project.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://figmamarket.com",
  ogImage: "/og-image.jpg",
  twitterHandle: "@figmamarket",
  creator: "Figma Market Team",
  keywords: [
    "Figma",
    "Figma templates",
    "Figma UI kits",
    "free Figma resources",
    "Figma design files",
    "UI design",
    "UX design",
    "web design templates",
    "mobile app design",
    "Figma icons",
    "Figma illustrations",
    "3D assets Figma",
    "design resources",
    "free design templates",
    "Figma community",
    "UI components",
    "design system",
    "prototype templates",
    "wireframe templates",
    "Figma plugins",
  ],
  links: {
    twitter: "https://twitter.com/figmamarket",
    github: "https://github.com/figmamarket",
    instagram: "https://instagram.com/figmamarket",
    linkedin: "https://linkedin.com/company/figmamarket",
  },
  locale: "en_US",
  type: "website",
};

// Category SEO data
export const categorySEO = {
  all: {
    title: "All Free Figma Design Resources",
    description:
      "Browse our complete collection of free Figma design resources. Find UI kits, templates, icons, illustrations, and more for your design projects.",
    keywords: ["all Figma resources", "free design files", "Figma collection"],
  },
  "web-site": {
    title: "Free Website Figma Templates & UI Designs",
    description:
      "Download free website Figma templates and UI designs. Professional landing pages, dashboards, e-commerce, and SaaS templates ready to use.",
    keywords: [
      "website templates",
      "landing page Figma",
      "web UI design",
      "Figma website",
      "responsive design",
    ],
  },
  "mobile-app": {
    title: "Free Mobile App Figma UI Kits & Templates",
    description:
      "Explore free mobile app Figma UI kits and templates for iOS and Android. Social media, e-commerce, fitness, and finance app designs.",
    keywords: [
      "mobile app UI",
      "iOS Figma template",
      "Android UI kit",
      "app design",
      "mobile UI kit",
    ],
  },
  "ui-kit": {
    title: "Free Figma UI Kits & Design Systems",
    description:
      "Download comprehensive Figma UI kits and design systems. Complete component libraries with buttons, forms, cards, and navigation elements.",
    keywords: [
      "UI kit Figma",
      "design system",
      "component library",
      "UI components",
      "Figma design kit",
    ],
  },
  "icon-set": {
    title: "Free Figma Icon Sets & Icon Packs",
    description:
      "Browse free Figma icon sets and icon packs. Line icons, solid icons, duotone, and 3D icons for web and mobile applications.",
    keywords: [
      "Figma icons",
      "icon pack",
      "free icons",
      "icon set",
      "UI icons",
      "vector icons",
    ],
  },
  illustration: {
    title: "Free Figma Illustrations & Vector Graphics",
    description:
      "Download free Figma illustrations and vector graphics. Character illustrations, abstract art, isometric designs, and scene illustrations.",
    keywords: [
      "Figma illustrations",
      "vector graphics",
      "free illustrations",
      "character design",
      "isometric illustrations",
    ],
  },
  "3d-asset": {
    title: "Free 3D Assets & Models for Figma",
    description:
      "Explore free 3D assets and models compatible with Figma. 3D icons, characters, objects, and scene elements for modern UI design.",
    keywords: [
      "3D Figma assets",
      "3D icons",
      "3D illustrations",
      "free 3D models",
      "3D UI elements",
    ],
  },
};

// Generate metadata helper
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false,
}) {
  const finalTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const finalDescription = description || siteConfig.description;
  const finalImage = image || siteConfig.ogImage;
  const finalUrl = url || siteConfig.url;
  const finalKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: finalUrl,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: finalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
  };
}

// JSON-LD Schema Generators
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/explore/all?searchQuery={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: Object.values(siteConfig.links),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: Object.values(siteConfig.links),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function generateDesignSchema(design, category) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: design.title,
    description: design.description,
    url: `${siteConfig.url}/designs/${design._id}`,
    image: design.previewImages?.[0]?.path
      ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${
          design.previewImages[0].path
        }`
      : siteConfig.ogImage,
    datePublished: design.createdAt,
    dateModified: design.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    genre: category?.name || "Design",
    keywords: design.tags?.join(", ") || "",
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: design.viewsCount || 0,
    },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
  };
}

export function generateCollectionSchema(designs, title, description) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: siteConfig.url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: designs.length,
      itemListElement: designs.slice(0, 10).map((design, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: design.title,
          url: `${siteConfig.url}/designs/${design._id}`,
        },
      })),
    },
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
