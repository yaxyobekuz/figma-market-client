// Icons
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const SearchBox = ({
  className = "",
  defaultValue = "",
  onSubmit = () => {},
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex items-center pl-3.5 w-full h-12 bg-white rounded-full border-2 border-violet-300 transition-all duration-200 focus-within:border-violet-500 focus-within:shadow-md",
        className
      )}
    >
      {/* Icon */}
      <Search strokeWidth={1.5} className="shrink-0" />

      {/* Input */}
      <input
        id="search"
        name="search"
        type="search"
        defaultValue={defaultValue}
        className="size-full pl-2.5 outline-none"
        placeholder="Search free Figma designs..."
      />

      {/* Submit button */}
      <button className="flex items-center justify-center shrink-0 bg-violet-500 rounded-full py-1.5 px-7 mr-1.5 text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
