import { useState } from "react";
import axios from "axios"; // استيراد Axios
import Modal from "react-modal"; // استيراد React Modal

// تحديد العنصر الرئيسي للتطبيق (مطلوب لـ React Modal)
Modal.setAppElement("#root");

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // حالة لإظهار/إخفاء كلمة المرور
  const [errorMessage, setErrorMessage] = useState(""); // حالة لتخزين رسالة الخطأ
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة لفتح/إغلاق الـ Modal
  const apiUrl = "http://127.0.0.1:8000/register"; // رابط API

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // إرسال البيانات إلى API باستخدام Axios
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json", // تحديد نوع المحتوى كـ JSON
        },
      });

      // إذا كانت الاستجابة ناجحة
      console.log("Response from API:", response.data);
      alert(response.data.message || "Account created successfully!");
    } catch (error) {
      // إذا كانت الاستجابة غير ناجحة
      console.error("Error details:", error);
      setErrorMessage(error.response);
      console.log(error.response?.data?.message);
      setIsModalOpen(true); // افتح الـ Modal لعرض الخطأ
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // أغلق الـ Modal
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 w-full"
        >
          Submit
        </button>
      </form>

      {/* React Modal لعرض الأخطاء */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg max-w-md w-full outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Error</h2>
        <p>{errorMessage}</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
