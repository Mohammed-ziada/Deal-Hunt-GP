import * as Yup from "yup";
console.log("Step -4");
const PersonalInformation = ({ formik }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

    <div className="flex gap-3">
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          name="firstName"
          type="text"
          value={formik.values.firstName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          name="lastName"
          type="text"
          value={formik.values.lastName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        ) : null}
      </div>
    </div>

    <div className="mb-4">
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        Contact Number
      </label>
      <div className="flex">
        <div className="flex items-center px-3 border border-gray-300 bg-gray-50 rounded-l-md">
          <img
            src="/path/to/egypt-flag-icon.png"
            alt="Egypt flag"
            className="w-5 h-5"
          />
          <span className="ml-2">+20</span>
        </div>
        <input
          name="phone"
          type="text"
          value={formik.values.phone || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          placeholder="11 000 000 000"
        />
      </div>
      {formik.touched.phone && formik.errors.phone ? (
        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
      ) : null}
    </div>

    <div className="mb-4">
      <label
        htmlFor="government"
        className="block text-sm font-medium text-gray-700"
      >
        Governorate
      </label>
      <select
        name="government"
        value={formik.values.government || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      >
        <option value="">Select your governorate</option>
        <option value="Cairo">Cairo</option>
        <option value="Giza">Giza</option>
        <option value="Alexandria">Alexandria</option>
        {/* Add other governorates */}
      </select>
      {formik.touched.government && formik.errors.government ? (
        <div className="text-red-500 text-sm">{formik.errors.government}</div>
      ) : null}
    </div>

    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        name="terms"
        checked={formik.values.terms}
        onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
        className="h-4 w-4 text-pink-600 border-gray-300 rounded"
      />
      <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
        I agree to E-Commerce{" "}
        <a href="/terms" className="text-pink-600">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-pink-600">
          Privacy Policy
        </a>
        .
      </label>
      {formik.touched.terms && formik.errors.terms ? (
        <div className="text-red-500 text-sm ml-2">{formik.errors.terms}</div>
      ) : null}
    </div>
  </div>
);

PersonalInformation.validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone number is required"),
  government: Yup.string().required("Governorate is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

export default PersonalInformation;
