import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert"
const AddProductForm = ({ subcategory, category, onClose }) => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_dis: "",
    price: 0,
    category_name: "",
    sub_category_name: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", productData.product_name);
      formData.append("product_dis", productData.product_dis);
      formData.append("price", productData.price);
      formData.append("category_name", productData.category_name);
      formData.append("sub_category_name", productData.sub_category_name);


      formData.append("image", image);
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await axios.post("http://localhost:8000/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("RESPO", response)

      // If successful, you can redirect the user or perform other actions
      showAlert("Product added successfully!", "success");

      // onSave(); // Assuming onSave is a callback to handle success
      onClose();
    } catch (error) {
      showAlert("Product Not Added!", "error");

      console.error("Error:", error);
    }
  };


  const showAlert = (message, icon) => {
    // alert(message, icon);
    swal({
      title: icon === "success" ? "Success" : "Error",
      text: message,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="bg-white p-4 shadow-md rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="mb-4">
          <label
            htmlFor="product_name"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product_dis"
            className="block text-sm font-medium text-gray-600"
          >
            Product Detail
          </label>
          <input
            type="text"
            id="product_dis"
            name="product_dis"
            value={productData.product_dis}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="count"
            className="block text-sm font-medium text-gray-600"
          >
            Count
          </label>
          {/* <input
            type="number"
            id="count"
            name="count"
            value={productData.count}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          /> */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="block text-sm font-medium text-gray-600"
          >
            Category Name
          </label>
          <select
            id="category_name"
            name="category_name"
            value={productData.category_name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            {/* هنا يجب وضع الخيارات المتاحة من القائمة */}
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option value={cat.category_name}>{cat.category_name}</option>

            ))}
            {/* يمكنك إضافة المزيد من الخيارات حسب الحاجة */}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="sub_category_name"
            className="block text-sm font-medium text-gray-600"
          >
            Sub Category Name
          </label>
          <select
            id="sub_category_name"
            name="sub_category_name"
            value={productData.sub_category_name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            {/* هنا يجب وضع الخيارات المتاحة من القائمة */}
            <option value="">Select Sub Category Name</option>
            {subcategory.map((cat) => (
              <option value={cat.sub_category_name}>{cat.sub_category_name}</option>

            ))}
            {/* يمكنك إضافة المزيد من الخيارات حسب الحاجة */}
          </select>
        </div>


        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-[#C08261] text-white rounded-lg mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-[#DB5750] text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
