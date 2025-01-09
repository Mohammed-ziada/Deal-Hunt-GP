/* Try and Handle this OTP inputs in Your Page **/

// import { Flex, Input, Typography } from "antd";
// const { Title } = Typography;
// const App = () => {
//   const onChange = (text) => {
//     console.log("onChange:", text);
//   };
//   const sharedProps = {
//     onChange,
//   };
//   return (
//     <Flex gap="middle" align="flex-start" vertical>
//       <Title level={6}>With formatter (Upcase)</Title>
//       <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
//     </Flex>
//   );
// };
// export default App;

/* eslint-disable react/prop-types */

import * as Yup from "yup";
console.log("Step -3");
const OtpVerification = ({ formik }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
    <div className="mb-4">
      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
        Enter OTP
      </label>
      <input
        name="otp"
        type="text"
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      />
      {formik.touched.otp && formik.errors.otp ? (
        <div className="text-red-500 text-sm">{formik.errors.otp}</div>
      ) : null}
    </div>
  </div>
);

OtpVerification.validationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

export default OtpVerification;
