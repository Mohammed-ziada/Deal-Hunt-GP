// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { Typography, Button, Divider } from "antd";
// import SliderFull from "./SliderFull";
// import RatingFilter from "./RatingFilter";
// import InStock from "./InStock";
// import CreationTime from "./CreationTime";
// import CategoryFilter from "./CategoryFilter";

// function Filter({ products, onApply, onReset, showApplyButton = true }) {
//   const maxPrice = Math.max(
//     ...products.map((product) => parseFloat(product.price))
//   );

//   const [sliderValue, setSliderValue] = useState([0, maxPrice]);
//   const [rating, setRating] = useState(0);
//   const [inStock, setInStock] = useState(0);
//   const [timeRange, setTimeRange] = useState("all_time");
//   const [category, setCategory] = useState("all");
//   const [subcategory, setSubcategory] = useState("all");
//   const [categoriesApi, setCategoriesapi] = useState([]);
//   const apicategory = "http://127.0.0.1:8000/api/getallcategories";

//   useEffect(() => {
//     // Fetch all categories
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(apicategory);
//         const result = await response.json();
//         setCategoriesapi(result); // Store categories
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     setSliderValue([0, maxPrice]);
//   }, [maxPrice]);

//   useEffect(() => {
//     onApply(sliderValue, rating, inStock, timeRange, category, subcategory);
//   }, [sliderValue, rating, inStock, timeRange, category, subcategory]);

//   const handleReset = () => {
//     onReset();
//     setSliderValue([0, maxPrice]);
//     setRating(0);
//     setCategory("all");
//     setSubcategory("all");
//   };

//   return (
//     <div className="p-6 rounded-lg flex flex-col gap-9">
//       <div className="FilterTitle">
//         <div className="flex justify-between">
//           <Typography.Title level={5}>Search Filter</Typography.Title>
//           <Button type="link" className="text-gray-600" onClick={handleReset}>
//             Reset All
//           </Button>
//         </div>
//         <Divider />
//       </div>

//       {/* Slider Component */}
//       <div className="priceSlider">
//         <SliderFull
//           handleReset={handleReset}
//           sliderValue={sliderValue}
//           setSliderValue={setSliderValue}
//           maxPrice={maxPrice}
//           title={"Price"}
//         />
//       </div>

//       {/* Rating Filter */}
//       <div className="rating space-y-4">
//         <Typography.Title level={5}>Rating</Typography.Title>
//         <RatingFilter rating={rating} setRating={setRating} />
//       </div>

//       {/* In Stock Filter */}
//       <div className="instock">
//         <Typography.Title level={5}>In Stock</Typography.Title>
//         <InStock setInStock={setInStock} />
//       </div>

//       {/* Creation Time Filter */}
//       <div className="time">
//         <CreationTime setTimeRange={setTimeRange} />
//       </div>

//       {/* Category Filter */}
//       <div className="categories">
//         <CategoryFilter
//           categories={categoriesApi} // Ensure products have category information
//           setCategory={setCategory}
//           setSubcategory={setSubcategory} // Pass setSubcategory to CategoryFilter
//         />
//       </div>

//       {/* Apply Button */}
//       {showApplyButton && (
//         <div className="apply flex justify-end">
//           <Button
//             type="link"
//             className="text-red-700"
//             onClick={() =>
//               onApply(
//                 sliderValue,
//                 rating,
//                 inStock,
//                 timeRange,
//                 category,
//                 subcategory
//               )
//             }
//           >
//             Apply
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// Filter.propTypes = {
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       price: PropTypes.string.isRequired,
//       subcategoryid: PropTypes.number.isRequired,
//       categoryid: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   onApply: PropTypes.func,
//   onReset: PropTypes.func,
//   showApplyButton: PropTypes.bool,
// };

// export default Filter;
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Typography, Button, Divider } from "antd";
import SliderFull from "./SliderFull";
import RatingFilter from "./RatingFilter";
import InStock from "./InStock";
import CreationTime from "./CreationTime";
import CategoryFilter from "./CategoryFilter";

function Filter({ products, onApply, onReset, showApplyButton = true }) {
  const maxPrice = Math.max(
    ...products.map((product) => parseFloat(product.price))
  );

  const [sliderValue, setSliderValue] = useState([0, maxPrice]);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [timeRange, setTimeRange] = useState("all_time");
  const [category, setCategory] = useState("all");
  const [subcategory, setSubcategory] = useState("all");
  const [categoriesApi, setCategoriesApi] = useState([]); // Added this state
  const apicategory = "http://127.0.0.1:8000/api/getallcategories";

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(apicategory);
        const result = await response.json();
        setCategoriesApi(result); // Store categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSliderValue([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    onApply(sliderValue, rating, inStock, timeRange, category, subcategory);
  }, [sliderValue, rating, inStock, timeRange, category, subcategory]);

  const handleReset = () => {
    onReset();
    setSliderValue([0, maxPrice]);
    setRating(0);
    setCategory("all");
    setSubcategory("all");
  };

  return (
    <div className="p-6 rounded-lg flex flex-col gap-9">
      <div className="FilterTitle">
        <div className="flex justify-between">
          <Typography.Title level={5}>Search Filter</Typography.Title>
          <Button type="link" className="text-gray-600" onClick={handleReset}>
            Reset All
          </Button>
        </div>
        <Divider />
      </div>

      {/* Slider Component */}
      <div className="priceSlider">
        <SliderFull
          handleReset={handleReset}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          maxPrice={maxPrice}
          title={"Price"}
        />
      </div>

      {/* Rating Filter */}
      <div className="rating space-y-4">
        <Typography.Title level={5}>Rating</Typography.Title>
        <RatingFilter rating={rating} setRating={setRating} />
      </div>

      {/* In Stock Filter */}
      <div className="instock">
        <Typography.Title level={5}>In Stock</Typography.Title>
        <InStock setInStock={setInStock} />
      </div>

      {/* Creation Time Filter */}
      <div className="time">
        <CreationTime setTimeRange={setTimeRange} />
      </div>

      {/* Category Filter */}
      <div className="categories">
        <CategoryFilter
          categories={categoriesApi} // Passing categories to CategoryFilter
          setCategory={setCategory}
          setSubcategory={setSubcategory} // Passing setSubcategory to handle subcategories
        />
      </div>

      {/* Apply Button */}
      {showApplyButton && (
        <div className="apply flex justify-end">
          <Button
            type="link"
            className="text-red-700"
            onClick={() =>
              onApply(
                sliderValue,
                rating,
                inStock,
                timeRange,
                category,
                subcategory
              )
            }
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}

Filter.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.string.isRequired,
      subcategoryid: PropTypes.number.isRequired,
      categoryid: PropTypes.number.isRequired,
    })
  ).isRequired,
  onApply: PropTypes.func,
  onReset: PropTypes.func,
  showApplyButton: PropTypes.bool,
};

export default Filter;
