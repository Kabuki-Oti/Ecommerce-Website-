import React, { useState } from "react";
import NavBar from "../Navbar/NavBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { addToCart } from "../../Features/Slices/cartSlice";
import { useDispatch } from "react-redux";

const SingleProduct = () => {

    const product = useSelector((state) => state.products.singleProduct);

    const productSize = product[0].size ? product[0].size[0] : "";
    const productColor = product[0].color[0];

    const { id } = useParams();

    const [size, setSize] = useState(productSize);
    const [color, setColor] = useState(productColor);

    const dispatch = useDispatch();

    return (
        <div>
            <div className="w-full"> {/*navbars*/}
                <NavBar></NavBar>
            </div>
            {product.filter((product) => product.id === id)
                .map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="flex justify-center items-center py-10">
                            {/*image*/}
                            <div className="pl-44 grow-[2]">
                                <img
                                    className="h-96"
                                    src={item.img}
                                    alt={item.name}
                                ></img>
                            </div>
                            {/*item name, text, size and colour selection*/}
                            <div className="grow-[3]">
                                <div className="max-w-lg">
                                    {/*item name*/}
                                    <h5
                                        className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
                                        {item.name}
                                    </h5>
                                    {/*item price*/}
                                    <h5
                                        className="text-[#3C1A5B] text-1xl font-inter font-bold tracking-normal leading-none pb-4">
                                        £{item.price}
                                    </h5>
                                    {/*item text*/}
                                    <p className="text-gray-600 text-xl font-inter font-bold tracking-normal leading-none pb-4">
                                        {item.text}
                                    </p>
                                    {/*size selection*/}
                                    <div className="pb-4">
                                        {item.size ? (
                                            <div>
                                                <label
                                                    htmlFor="size"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Choose a size
                                                </label>
                                                <select
                                                    id="size"
                                                    name="size"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    {item.size.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item}>{item}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        ) : (
                                            <div>
                                                <label
                                                    htmlFor="size"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Choose a size
                                                </label>
                                                <select
                                                    id="size"
                                                    disabled={true}
                                                    name="size"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    {item?.size?.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item}>{item}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                    {/*colour selection*/}
                                    <div className="pb-4">
                                        <label
                                            htmlFor="color"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Choose a colour
                                        </label>
                                        <select
                                            id="color"
                                            name="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {item.color.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>{item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {/*button*/}
                                    <div>
                                        <Tooltip content="Add to Cart" placement="bottom">
                                            <Button
                                                color="gray"
                                                size="lg"
                                                variant="outlined"
                                                ripple={true}
                                                className="w-full"
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart({
                                                            id: item.id,
                                                            name: item.name,
                                                            img: item.img,
                                                            text: item.text,
                                                            size: size,
                                                            color: color,
                                                            price: item.price,
                                                            amount: 1,
                                                            totalPrice: item.price
                                                        })
                                                    )}
                                            >
                                                ADD TO CART
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
        </div>
    )
};

export default SingleProduct;