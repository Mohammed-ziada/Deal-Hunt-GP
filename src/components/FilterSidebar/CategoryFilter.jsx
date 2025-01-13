import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CategoryItem from "./CategoryItem";

const CategoryFilter = ({ categories, setCategory, setSubcategory }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Added state to track selected category

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/show/allsubcategory"
        );
        const result = await response.json();
        // console.log(result);
        setSubcategories(result);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Set selected category
    console.log(categoryId);
    setCategory(categoryId);
    setSubcategory("all"); // Reset subcategory when category is selected
  };

  return (
    <div>
      <CategoryItem
        id="all"
        name="All"
        depth={0}
        hasChildren={false}
        expandedCategories={expandedCategories}
        toggleCategory={() => {
          setCategory("all");
          setSubcategory("all");
        }}
        onClick={() => {
          setCategory("all");
          setSubcategory("all");
        }}
      />
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryItem
            id={category.id}
            name={category.catogoryname}
            depth={0}
            hasChildren={true}
            expandedCategories={expandedCategories}
            toggleCategory={() => toggleCategory(category.id)}
            onClick={() => handleCategoryClick(category.id)} // When category is clicked, set subcategories
          />
          {expandedCategories.includes(category.id) && (
            <div className="ml-4">
              {subcategories
                .filter((subcategory) => subcategory.categoryid === category.id)
                .map((subcategory) => (
                  <CategoryItem
                    key={subcategory.id}
                    id={subcategory.id}
                    name={subcategory.subcategoryname}
                    depth={1}
                    hasChildren={false}
                    expandedCategories={expandedCategories}
                    toggleCategory={() => toggleCategory(subcategory.id)}
                    onClick={() => {
                      setSubcategory(subcategory.id);
                    }}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      catogoryname: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCategory: PropTypes.func.isRequired,
  setSubcategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
