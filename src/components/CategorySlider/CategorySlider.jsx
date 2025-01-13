import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import Car from "../../assets/images/car.png";
import { Link } from "react-router-dom";
export default function CategorySlider() {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/getallcategories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500; // Adjust scroll amount for 4 items
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-6">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-black text-lg font-medium">Shop by category</h3>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg transition-colors"
            >
              <LeftOutlined />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg transition-colors"
            >
              <RightOutlined />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 cursor-pointer group"
              style={{ width: "calc(20% - 1rem)" }} // Adjust width for 4 items
            >
              <Link to={`/category/`}>
                <div className="bg-[#2A2A2A] h-[200px] rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img
                    src={Car}
                    alt={category.catogoryname}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <h4 className="absolute bottom-3 left-3 text-white text-lg font-medium z-20">
                    {category.catogoryname}
                  </h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
