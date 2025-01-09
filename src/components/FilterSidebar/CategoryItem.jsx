import PropTypes from "prop-types";

const CategoryItem = ({
  name,
  depth = 0,
  hasChildren = false,
  expandedCategories,
  toggleCategory,
}) => {
  const isExpanded = expandedCategories.includes(name);

  return (
    <div
      className={`flex items-center justify-between py-1 cursor-pointer hover:text-gray-900`}
      style={{ paddingLeft: `${depth * 16}px` }}
      onClick={() => hasChildren && toggleCategory(name)}
    >
      <span className="text-sm text-gray-600">{name}</span>
      {hasChildren && (isExpanded ? "Expanded" : "Not Expanded")}
    </div>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  depth: PropTypes.number,
  hasChildren: PropTypes.bool,
  expandedCategories: PropTypes.array.isRequired,
  toggleCategory: PropTypes.func.isRequired,
};

export default CategoryItem;
