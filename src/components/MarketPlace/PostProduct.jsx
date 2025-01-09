import { useState } from "react";
import { MapPin, Upload, Info, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function PostProduct() {
  const [images, setImages] = useState([]); // For other images
  const [mainImage, setMainImage] = useState(null); // For main image
  const [price, setPrice] = useState(500.0); // For price
  const [brand, setBrand] = useState("Company"); // For brand
  const [name, setName] = useState("Product Name"); // For name

  // Function to handle upload of multiple images
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]); // Update the state with new images
  };

  // Function to handle upload of main image
  const handleMainImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file (main image)
    const uploadedMainImage = URL.createObjectURL(file); // Create object URL for main image
    setMainImage(uploadedMainImage); // Set the main image state
  };

  // Function to handle deletion of an image
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Add Product For Market Place
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Preview Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className=" rounded-lg p-8 relative">
              {/* Main image preview */}
              <img
                src={
                  mainImage ||
                  "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&q=80&w=600"
                } // Display main image or default if none
                alt="Product Preview"
                className="w-full h-auto rounded"
              />
              {/* <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Best Seller
              </span> */}
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
                {/* <p className="text-sm text-gray-500">Last Hour: 1 PIECE SOLD</p> */}
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Basic Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>Select Category</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Category
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>Select Sub-Category</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>New</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Product Images</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Main Image Upload */}
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload Main Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleMainImageUpload} // Handle main image upload
                  />
                </label>

                {/* Other Images Upload */}
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload Image</span>
                  <span className="text-xs">Max Size: 2.5MB</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload} // Handle other images upload
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
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Tip: Use high-quality, well-lit images to showcase your
                  products best features and attract more buyers.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Payment</h2>
              <div className="flex gap-4">
                <button className="flex-1 py-2 px-4 border rounded-md bg-white hover:bg-gray-50">
                  Cash
                </button>
                <button className="flex-1 py-2 px-4 border rounded-md bg-gray-100">
                  Snap
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full  rounded-md border-gray-300 pl-11 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">EGP</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Delivery</h2>
              <div className="flex gap-4">
                <button className="flex-1 py-2 px-4 border rounded-md bg-gray-100">
                  Meet-up
                </button>
                <button className="flex-1 py-2 px-4 border rounded-md bg-white hover:bg-gray-50">
                  Shipping
                </button>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <div className="h-48 bg-gray-100"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm text-gray-600">Cairo, Egypt</span>
                  </div>
                </div>
              </div>
            </section>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
              Post Now
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default PostProduct;
