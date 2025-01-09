// import hero from '../../assets/images/Hero.png'
// import { Swiper, SwiperSlide } from 'swiper/react';
// // Import Swiper styles
// import 'swiper/css';
// import { Autoplay } from 'swiper/modules';

// export default function MainSlider() {
//   return (
//     <>
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}

//         navigation={true}
//         modules={[Autoplay]}
//         className="mySwiper"
//       >
//         <SwiperSlide><img src={hero} alt="" />
//         </SwiperSlide>
//         <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
//         <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
//         <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
//         <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
//       </Swiper>
//     </>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Slide from "./Slide"; // Slide component from your code
import Phone from "../../assets/images/SlidePhone.png";
import Car from "../../assets/images/SlideCar.png";
import Fernture from "../../assets/images/SlideFernture.png";
import { Link } from "react-router-dom";

export default function MainSlider() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Slide bgImage={Phone}>
          <div className=" w-2/3  flex flex-col gap-6 ">
            <span className="text-6xl md:text-6xl  ">
              Transform Your Living Space.
            </span>

            <div className="grid grid-flow-col gap-4 w-2/3">
              <button className="col-span-3 px-6 py-2 bg-white rounded-md hover:bg-white/40 hover:backdrop-blur-sm transition border border-gray-300">
                Discover Furniture
              </button>
              <Link to="addproduct">
                <button className="px-6 py-2 bg-transparent border-slate-100 border rounded-md transition backdrop-blur-none hover:backdrop-blur-sm hover:bg-white/40">
                  Start Selling
                </button>
              </Link>
            </div>
          </div>
        </Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide bgImage={Car}>
          <div className=" bg-blac w-2/3  flex flex-col gap-6 ">
            <span className="text-6xl md:text-6xl  ">
              Transform Your Living Space.
            </span>

            <div className="grid grid-flow-col gap-4 w-2/3">
              <button className="col-span-3 px-6 py-2 bg-white rounded-md hover:bg-white/40 hover:backdrop-blur-sm transition border border-gray-300">
                Discover Furniture
              </button>
              <Link to="addproduct">
                <button className="px-6 py-2 bg-transparent border-slate-100 border rounded-md transition backdrop-blur-none hover:backdrop-blur-sm hover:bg-white/40">
                  Start Selling
                </button>
              </Link>
            </div>
          </div>
        </Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide bgImage={Fernture}>
          <div className=" bg-blac w-2/3  flex flex-col gap-6 ">
            <span className="text-6xl md:text-6xl  ">
              Transform Your Living Space.
            </span>

            <div className="grid grid-flow-col gap-4 w-2/3">
              <button className="col-span-3 px-6 py-2 bg-white rounded-md hover:bg-white/40 hover:backdrop-blur-sm transition border border-gray-300">
                Discover Furniture
              </button>
              <Link to="addproduct">
                <button className="px-6 py-2 bg-transparent border-slate-100 border rounded-md transition backdrop-blur-none hover:backdrop-blur-sm hover:bg-white/40">
                  Start Selling
                </button>
              </Link>
            </div>
          </div>
        </Slide>
      </SwiperSlide>
    </Swiper>
  );
}
