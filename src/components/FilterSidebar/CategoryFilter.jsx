import { useState } from "react";
import PropTypes from "prop-types";
import CategoryItem from "./CategoryItem";

const CategoryFilter = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const FilterSection = ({ title, children }) => (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <FilterSection title="Category">
      <div className="space-y-1">
        {/* {categories.map((category) => (
          <CategoryItem
            key={category.name}
            name={category.name}
            depth={category.depth}
            hasChildren={category.hasChildren}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
          />
        ))} */}
        <CategoryItem
          name="T-Shirts"
          depth={0}
          hasChildren={true}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
        />
        {expandedCategories.includes("T-Shirts") && (
          <>
            <CategoryItem
              name="Sub Category"
              depth={1}
              hasChildren={true}
              expandedCategories={expandedCategories}
              toggleCategory={toggleCategory}
            />
            {expandedCategories.includes("Sub Category") && (
              <>
                <CategoryItem
                  name="Sub Sub Category"
                  depth={2}
                  hasChildren={true}
                  expandedCategories={expandedCategories}
                  toggleCategory={toggleCategory}
                />
                {expandedCategories.includes("Sub Sub Category") && (
                  <CategoryItem
                    name="Sub Sub Sub Category"
                    depth={3}
                    expandedCategories={expandedCategories}
                    toggleCategory={toggleCategory}
                  />
                )}
              </>
            )}
          </>
        )}
        <CategoryItem
          name="Mobiles"
          depth={0}
          hasChildren={true}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
        />
      </div>
    </FilterSection>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      depth: PropTypes.number,
      hasChildren: PropTypes.bool,
    })
  ).isRequired,
};

export default CategoryFilter;
