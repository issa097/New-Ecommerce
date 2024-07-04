import React, { useState } from "react";

const ProductForm = ({ product, onEdit, onClose }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append("product_id", editedProduct.product_id);
    formData.append("product_name", editedProduct.product_name);
    formData.append("product_dis", editedProduct.product_dis);
    formData.append("price", editedProduct.price);
    formData.append("category_name", editedProduct.category_name);
    formData.append("sub_category_name", editedProduct.sub_category_name);
    formData.append("image", image);

    const data = {
      formData,
      product_id: editedProduct.product_id,
    };

    onEdit(data);
    // onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60">
      <div className="bg-white p-4 rounded-lg w-full mx-72">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label
            htmlFor="product_name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={editedProduct.product_name}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                product_name: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product_dis"
            className="block text-sm font-medium text-gray-700"
          >
            Product DIS
          </label>
          <input
            type="text"
            id="product_dis"
            name="product_dis"
            value={editedProduct.product_dis}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                product_dis: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            value={editedProduct.category_name}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                category_name: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="block text-sm font-medium text-gray-700"
          >
            sub_category_name
          </label>
          <input
            type="text"
            id="sub_category_name"
            name="sub_category_name"
            value={editedProduct.sub_category_name}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                sub_category_name: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="count"
            className="block text-sm font-medium text-gray-700"
          >
            Count
          </label>
          {/* <input
            type="number"
            id="count"
            name="count"
            value={editedProduct.product_counts}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                counts: parseInt(e.target.value),
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          /> */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="product_img"
            name="product_img"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-[#C08261] text-white rounded-lg mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-400 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
