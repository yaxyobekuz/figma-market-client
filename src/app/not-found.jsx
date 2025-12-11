import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="container">
        <div className="max-w-xl mx-auto text-center space-y-6">
          {/* 404 Number */}
          <div className="text-8xl font-bold text-violet-500">404</div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
            Don't worry, you can explore our amazing design resources.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-8 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors duration-200"
            >
              Go to Homepage
            </Link>
            <Link
              href="/explore/all"
              className="inline-flex items-center justify-center h-12 px-8 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Explore Designs
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-4">
              Or browse popular categories:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: "Web Site", href: "/explore/web-site" },
                { name: "Mobile App", href: "/explore/mobile-app" },
                { name: "UI Kit", href: "/explore/ui-kit" },
                { name: "Icons", href: "/explore/icon-set" },
                { name: "Illustrations", href: "/explore/illustration" },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-colors duration-200 text-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
