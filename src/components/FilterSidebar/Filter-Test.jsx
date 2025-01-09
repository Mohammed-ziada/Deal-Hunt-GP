import { useState } from "react";
import PropTypes from "prop-types";
// import { ChevronDown, ChevronUp, Star } from "lucide-react";
// import Filter from "./Filter";

function FilterSidebar() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2500 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const FilterSection = ({ title, children, resetFn }) => (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {resetFn && (
          <button
            onClick={resetFn}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        )}
      </div>
      {children}
    </div>
  );

  FilterSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    resetFn: PropTypes.func,
  };

  const CategoryItem = ({ name, depth = 0, hasChildren = false }) => {
    const isExpanded = expandedCategories.includes(name);

    return (
      <div
        className={`flex items-center justify-between py-1 cursor-pointer hover:text-gray-900`}
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={() => hasChildren && toggleCategory(name)}
      >
        <span className="text-sm text-gray-600">{name}</span>
        {hasChildren && (isExpanded ? "Expended" : "notExpended")}
      </div>
    );
  };

  CategoryItem.propTypes = {
    name: PropTypes.string.isRequired,
    depth: PropTypes.number,
    hasChildren: PropTypes.bool,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xs bg-white rounded-lg shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search Filter</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Reset All
            </button>
          </div>

          <FilterSection
            title="Price"
            resetFn={() => setPriceRange({ min: 0, max: 2500 })}
          >
            <div className="flex gap-4 items-center">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="w-24 px-2 py-1 border rounded text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="w-24 px-2 py-1 border rounded text-sm"
                placeholder="Max"
              />
            </div>
            <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700">
              Apply
            </button>
          </FilterSection>

          <FilterSection title="Category">
            <div className="space-y-1">
              <CategoryItem name="Category Name" hasChildren={true} />
              {expandedCategories.includes("Category Name") && (
                <>
                  <CategoryItem
                    name="Sub Category"
                    depth={1}
                    hasChildren={true}
                  />
                  {expandedCategories.includes("Sub Category") && (
                    <>
                      <CategoryItem
                        name="Sub Sub Category"
                        depth={2}
                        hasChildren={true}
                      />
                      {expandedCategories.includes("Sub Sub Category") && (
                        <CategoryItem name="Sub Sub Sub Category" depth={3} />
                      )}
                    </>
                  )}
                </>
              )}
              <CategoryItem name="Category Name 2" hasChildren={true} />
            </div>
          </FilterSection>

          <FilterSection title="Addition Time">
            <div className="space-y-2">
              {[
                "Last 7 days",
                "Last 30 days",
                "Last 60 days",
                "All the time",
              ].map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <input type="radio" name="time" className="text-blue-600" />
                  <span className="text-sm text-gray-600">{time}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Location">
            <div className="space-y-2">
              {["Cairo", "Giza", "Suez", "Alexandria", "Banha"].map(
                (location) => (
                  <label key={location} className="flex items-center gap-2">
                    <input type="checkbox" className="text-blue-600 rounded" />
                    <span className="text-sm text-gray-600">{location}</span>
                  </label>
                )
              )}
            </div>
          </FilterSection>

          <FilterSection title="Source">
            <div className="space-y-2">
              {["StarPunt Vendors", "MarketPlace"].map((source) => (
                <label key={source} className="flex items-center gap-2">
                  <input type="radio" name="source" className="text-blue-600" />
                  <span className="text-sm text-gray-600">{source}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Condition">
            <div className="space-y-2">
              {["Used", "New"].map((condition) => (
                <label key={condition} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="condition"
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-600">{condition}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Warranty">
            <div className="space-y-2">
              {[
                "More than 5 years",
                "3 Years",
                "2 Years",
                "1 Year",
                "No warranty",
              ].map((warranty) => (
                <label key={warranty} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="warranty"
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-600">{warranty}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Ask">
            <div className="space-y-2">
              {["Cash payment", "Swap"].map((askType) => (
                <label key={askType} className="flex items-center gap-2">
                  <input type="radio" name="ask" className="text-blue-600" />
                  <span className="text-sm text-gray-600">{askType}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
