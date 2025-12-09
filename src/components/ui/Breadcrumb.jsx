// Next.js
import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {!isLast ? (
                <>
                  <Link
                    href={item.href}
                    className="max-w-56 line-clamp-1 py-1 text-gray-600 transition-colors duration-200 hover:text-violet-500"
                  >
                    {item.label}
                  </Link>
                  <span className="text-gray-400">/</span>
                </>
              ) : (
                <span className="max-w-56 line-clamp-1 text-gray-900 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
