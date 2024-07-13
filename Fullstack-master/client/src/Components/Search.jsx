import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Search({ cursorStyle, handleMouseUp, handleMouseDown, product, filterProduct, filterSubProducts, filterProductNames }) {

    const [category, setgategory] = useState([])
    console.log(category)
    const [subcategory, setsubtegory] = useState([])
    console.log(subcategory)
    console.log(cursorStyle)

    const getcategory = async () => {
        const response = await axios.get('http://localhost:8000/Categorys')
        const responses = await axios.get('http://localhost:8000/subCategorys')

        const CategoryInfo = response.data
        const SubCategoryInfo = responses.data
        setsubtegory(SubCategoryInfo)
        setgategory(CategoryInfo)
    }


    useEffect(() => {
        getcategory()
        // getsubcategory()
    }, [])

    const [dropdownOpen, setDropdownOpen] = useState(true);

    const handleCategoryChange = (event) => {
        const category_name = event.target.value;
        console.log(category_name)
        filterProduct(category_name);
    };
    const handleSubCategoryChange = (event) => {
        const subcategory_name = event.target.value;
        console.log(subcategory_name)
        filterSubProducts(subcategory_name);
    };
    const handleNameCategoryChange = (event) => {
        const product_name = event.target.value;
        console.log(product_name)
        filterProductNames(product_name);
    };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <div className="flex gap-4 m-2 max-w-lg mx-auto">

            {dropdownOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y  divide-gray-100 rounded-lg shadow w-44"
                >


                    <select onMouseOver={handleMouseDown} onMouseLeave={handleMouseUp} style={{ cursor: cursorStyle }}
                        onChange={handleCategoryChange}
                        className="flex w-full flex-col rounded-lg py-2 bg-[#C08261] text-md text-red-900 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                    >
                        <option value="All Categories" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            All Categories
                        </option>
                        {category.map((categorys) => (
                            <option key={categorys.category_id} value={categorys.category_name} className="inline-flex  w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {categorys.category_name}
                            </option>
                        ))}

                    </select>


                </div>
            )}
            {dropdownOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                >
                    <select
                        onMouseOver={handleMouseDown} onMouseLeave={handleMouseUp} style={{ cursor: cursorStyle }}
                        onChange={handleSubCategoryChange}
                        className="flex w-full flex-col rounded-lg py-2 bg-[#C08261] text-md text-red-900 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                    >
                        <option value="Sub Categories" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Sub Categories
                        </option>
                        {subcategory.map((subcategorys) => (
                            <option key={subcategorys.subcategory_id} value={subcategorys.sub_category_name} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {subcategorys.sub_category_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {dropdownOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white  divide-y divide-gray-100 rounded-lg shadow w-44 "
                >
                    <select
                        onMouseOver={handleMouseDown} onMouseLeave={handleMouseUp} style={{ cursor: cursorStyle }}
                        onChange={handleNameCategoryChange}
                        className="flex w-full flex-col rounded-lg py-2 bg-[#C08261] text-md text-red-900 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                    >
                        <option value="Product Name" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Product Name
                        </option>
                        {product.map((products) => (
                            <option key={products.product_id} value={products.product_name} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {products.product_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default Search;
