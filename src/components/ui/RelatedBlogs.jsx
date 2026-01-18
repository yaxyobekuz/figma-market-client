// Components
import BlogItem from "./BlogItem";

// API
import { getRelatedBlogs } from "@/api/blog.api";

const RelatedBlogs = async ({ blogId }) => {
  const blogs = await getRelatedBlogs(blogId, 6);

  // If no related blogs, don't render the section
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="pt-12 mt-12 border-t border-gray-200">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>

        {/* Blog Items */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <BlogItem key={blog._id} data={blog} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedBlogs;
