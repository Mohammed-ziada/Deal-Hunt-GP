/* eslint-disable react/prop-types */

import { SmileOutlined, PictureOutlined, BulbOutlined, EyeOutlined } from "@ant-design/icons";

import * as Yup from "yup";

const Password = ({ formik }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Create Password</h2>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div className="relative">
        <input
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
        <EyeOutlined className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
      </div>
      <div className="mt-2 flex space-x-2">
        <SmileOutlined className="text-gray-500" />
        <BulbOutlined className="text-gray-500" />
        <PictureOutlined className="text-gray-500" />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>
      ) : null}
    </div>
  </div>
);

Password.validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

console.log("Step -2");
export default Password;
