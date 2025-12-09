// Components
import DesignItem from "@/components/ui/DesignItem";
import Breadcrumb from "@/components/ui/Breadcrumb";

const Saved = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Saved Designs", href: "/saved" },
  ];

  return (
    <div className="py-12">
      <div className="container space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Title */}
        <h1 className="text-3xl font-medium">Saved Designs</h1>

        {/* Content */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <DesignItem key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Saved;
