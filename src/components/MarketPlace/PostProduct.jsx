import { useState, useEffect } from "react";
import {
  MapPin,
  Upload,
  Info,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Modal from "../shared/Modal";

function PostProduct() {
  const [images, setImages] = useState([]); // For other images
  const [mainImage, setMainImage] = useState(null); // For main image
  const [price, setPrice] = useState(500.0); // For price
  const [brand, setBrand] = useState("Company"); // For brand
  const [name, setName] = useState("Product Name"); // For name
  const [category, setCategory] = useState(""); // For category
  const [color, setColor] = useState(""); // For category
  const [subcategory, setSubcategory] = useState(""); // For subcategory
  const [description, setDescription] = useState(""); // For description
  const [quantity, setQuantity] = useState(0); // For quantity

  const [categories, setCategories] = useState([]); // For category data
  const [subcategories, setSubcategories] = useState([]); // For subcategory data
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [modalContent, setModalContent] = useState(""); // For modal content
  const [status, setstatus] = useState([]); // For modal content
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;
  // console.log(JSON.stringify(user));
  // console.log(userId);

  // Load categories and subcategories from API on component mount
  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/getproducttype/${userId}`,
  //       {
  //         method: "GET", // ممكن تشيلها لو مش محتاج
  //         headers: {
  //           Authorization: `Bearer ${token}`, // استبدل token بالمتغير بتاعك
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setstatus(data);
  //     console.log(
  //       "data-status",
  //       data.map((state) => state)
  //     ); // Set categories in state
  //   };

  //   const fetchCategories = async () => {
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/api/getallcategories"
  //     );
  //     const data = await response.json();
  //     setCategories(data); // Set categories in state
  //   };

  //   const fetchSubcategories = async () => {
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/api/show/allsubcategory"
  //     );
  //     const data = await response.json();
  //     setSubcategories(data); // Set subcategories in state
  //   };
  //   fetchStatus();
  //   fetchCategories();
  //   fetchSubcategories();
  // }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getproducttype/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setstatus(data);
      console.log("Fetched Status:", data); // هنا هنشوف البيانات جايه صح ولا لأ
    };

    const fetchCategories = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/getallcategories"
      );
      const data = await response.json();
      setCategories(data);
      console.log("Fetched Categories:", data); // هنا هنشوف إن كان الـ categories جايه صح ولا لأ
    };

    const fetchSubcategories = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/show/allsubcategory"
      );
      const data = await response.json();
      setSubcategories(data);
      console.log("Fetched Subcategories:", data); // هنا هنشوف الـ subcategories كمان
    };

    fetchStatus();
    fetchCategories();
    fetchSubcategories();
  }, []);
  useEffect(() => {
    console.log("Updated Status:", status); // هتظهر القيمة المحدثة لـ status هنا
  }, [status]); // ده هيعمل trigger كل ما الـ status يتغير

  // console.log(status);
  // Function to handle upload of multiple images
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  // Function to handle upload of main image
  const handleMainImageUpload1 = (event) => {
    const file = event.target.files[0]; // Get the first file (main image)
    const uploadedMainImage = URL.createObjectURL(file);
    setMainImage(uploadedMainImage);
  };
  const handleMainImageUpload = (event) => {
    const file = event.target.files[0]; // الصورة الرئيسية
    setMainImage(file); // احفظ الملف مش الـ URL
  };
  // Function to handle deletion of an image
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle submit product

  const handleSubmit = async () => {
    console.log("Submitting Product with values:");
    console.log("Name:", name);
    console.log("Category:", category);
    console.log("Subcategory:", subcategory);
    console.log("Status ID:", status); // هنا هنشوف الـ id اللي اتخزن فيه الـ status
    console.log("Price:", price);
    console.log("Quantity:", quantity);
    console.log("Description:", description);
    console.log("Main Image:", mainImage);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("subcategoryid", subcategory);
    formData.append("userid", userId);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("picname", mainImage);
    formData.append("producttypeid", status);
    console.log("Product Type ID:", status);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/addproduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setModalContent(
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
            <span className="text-center">Product added successfully!</span>
          </div>
        );
      } else {
        setModalContent(
          <div className="flex flex-col items-center">
            <XCircle className="text-red-500 w-12 h-12 mb-4" />
            <span className="text-center">Failed to add product.</span>
          </div>
        );
      }
    } catch (error) {
      setModalContent(
        <div className="flex flex-col items-center">
          <XCircle className="text-red-500 w-12 h-12 mb-4" />
          <span className="text-center">Error adding product.</span>
        </div>
      );
    } finally {
      setModalVisible(true);
    }
  };
  const handleOk = () => {
    setModalVisible(false);
  };
  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.6, staggerChildren: 0.5 },
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Add Product For Market Place
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div className="space-y-6">
            <div className="rounded-lg p-8 relative">
              {/* Main image preview */}
              <img
                src={
                  mainImage ||
                  "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&q=80&w=600"
                }
                alt="Product Preview"
                className="w-full h-auto rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{brand}</h3>
                <h2 className="text-xl font-bold">{name}</h2>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-red-500">
                  {price} EGP
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-8">
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.catogoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Category
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option>Select Sub-Category</option>
                      {subcategories.map((subcat) => (
                        <option key={subcat.id} value={subcat.id}>
                          {subcat.subcategoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Satus
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={status}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedDescription = status.find(
                          (state) => state.id === parseInt(selectedId)
                        )?.description;
                        console.log("Selected Value (id):", selectedId);
                        console.log(
                          "Selected Description:",
                          selectedDescription
                        );
                        setstatus(selectedId);
                      }}
                    >
                      <option value="">Select Status</option>
                      {Array.isArray(status) &&
                        status.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.description} {/* ده اللي هيظهر للمستخدم */}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={status.description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Product Images</h2>
              <div className="grid grid-cols-3 gap-4">
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload Main Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleMainImageUpload}
                  />
                </label>

                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload Image</span>
                  <span className="text-xs">Max Size: 2.5MB</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* Display uploaded images */}
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="relative bg-black rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Product ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => handleDeleteImage(i)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <button
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
              onClick={handleSubmit}
            >
              Post Now
            </button>
          </motion.div>
        </div>
      </div>
      {/* {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>{modalContent}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg  hover:bg-red-600 transition-colors"
              onClick={() => setModalVisible(false)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )} */}
      <Modal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        modalContent={modalContent}
        onOk={handleOk}
      />
    </motion.div>
  );
}

export default PostProduct;
