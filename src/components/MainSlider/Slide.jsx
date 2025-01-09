// import PropTypes from "prop-types";

// export default function Slide({ bgImage, children }) {
//   return (
//     <div
//       className="h-full w-full bg-cover bg-center flex items-center p-2"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         maxHeight: "100vh",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// Slide.propTypes = {
//   bgImage: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };
import PropTypes from "prop-types";

export default function Slide({ bgImage, children }) {
  return (
    <div
      className="h-[454px] sm:h-[400px]   w-full bg-cover bg-bottom flex items-center p-2"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="p-4 text-black rounded-lg">
        {children}
      </div>
    </div>
  );
}

Slide.propTypes = {
  bgImage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
