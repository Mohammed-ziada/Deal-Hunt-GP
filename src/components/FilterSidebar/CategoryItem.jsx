// import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
// import PropTypes from "prop-types";

// const CategoryItem = ({
//   id, // Use ID instead of name for unique identification
//   name,
//   depth = 0,
//   hasChildren = false,
//   expandedCategories,
//   toggleCategory,
//   onClick, // Add onClick prop
// }) => {
//   const isExpanded = expandedCategories.includes(id); // Check by ID

//   return (
//     <div
//       className={`flex items-center justify-between py-1 cursor-pointer hover:text-gray-900`}
//       style={{ paddingLeft: `${depth * 16}px` }}
//       onClick={() => {
//         if (hasChildren) {
//           toggleCategory(id); // Pass ID to toggle
//         }
//         onClick(); // Call onClick handler
//       }}
//     >
//       <span className="text-sm text-gray-600">{name}</span>
//       {hasChildren && (
//         <span>
//           {isExpanded ? (
//             <ChevronDownIcon className="h-4 w-4 text-gray-600" /> // Down arrow for expanded state
//           ) : (
//             <ChevronRightIcon className="h-4 w-4 text-gray-600" /> // Right arrow for collapsed state
//           )}
//         </span>
//       )}
//     </div>
//   );
// };

// CategoryItem.propTypes = {
//   id: PropTypes.number.isRequired, // Use ID as a required prop
//   name: PropTypes.string.isRequired,
//   depth: PropTypes.number,
//   hasChildren: PropTypes.bool,
//   expandedCategories: PropTypes.array.isRequired,
//   toggleCategory: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired, // Add onClick prop type
// };

// export default CategoryItem;
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import PropTypes from "prop-types";

const CategoryItem = ({
  id,
  name,
  depth = 0,
  hasChildren = false,
  expandedCategories,
  toggleCategory,
  onClick,
}) => {
  const isExpanded = expandedCategories.includes(id);

  return (
    <div
      className={`flex items-center justify-between py-1 cursor-pointer hover:text-gray-900`}
      style={{ paddingLeft: `${depth * 16}px` }}
      onClick={() => {
        if (hasChildren) {
          toggleCategory(id);
        }
        onClick();
      }}
    >
      <span className="text-sm text-gray-600">{name}</span>
      {hasChildren && (
        <span>
          {isExpanded ? (
            <ChevronDownIcon className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          )}
        </span>
      )}
    </div>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  depth: PropTypes.number,
  hasChildren: PropTypes.bool,
  expandedCategories: PropTypes.array.isRequired,
  toggleCategory: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryItem;
