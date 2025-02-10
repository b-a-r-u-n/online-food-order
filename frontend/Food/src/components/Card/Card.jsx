import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Features/cartSlice";

const Card = ({ foodItem }) => {
  console.log("Card");

  // const cartItem = useSelector(state => state.cart.cartItems)

  const options = Object.keys(foodItem.options[0]);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(options[0]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(handaleTotalPrice({foodItem, quantity, size}));
  // },[cartItem])

  const handaleCart = () => {
    dispatch(addToCart({ foodItem, quantity, size }));
  };
  return (
    <>
      <div
        className="
        bg-[#FFFDD0] px-5 py-5 rounded-xl border border-[#FFD700] drop-shadow-lg
         w-full
         sm:w-[43vw]  
         lg:w-[20vw] lg:cursor-pointer lg:border-0 lg:hover:border lg:hover:border-[#FFD700] lg:drop-shadow-none lg:hover:drop-shadow-lg
        "
      >
        <div
          className="
          h-[17vh] bg-pink-200 bg-cover bg-center rounded-xl
          sm:h-[12.5vh]
          lg:h-[20vh]
          "
          style={{ backgroundImage: `url(${foodItem?.img})` }}
        ></div>
        <div className="mt-3 flex justify-between items-center">
          <h2
            className="text-xl font-bold text-[#FFD700]"
            style={{ fontFamily: "Playfair Display" }}
          >
            {foodItem?.name}
          </h2>
          <div className="font-bold text-white bg-green-600 px-1 rounded flex items-center">
            3.5 <p className="text-sm">⭐</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <select
            name=""
            id=""
            className="bg-[#FFFDD0] border-1 border-[#333333] hover-border-[#FFD700] outline-none font-bold mt-3"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from(Array(10), (e, i) => {
              return (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id=""
            className="bg-[#FFFDD0] border-1 border-[#333333] hover-border-[#FFD700] outline-none font-bold mt-3 w-24"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {options.map((option, i) => {
              return (
                // <>
                <option value={option} key={i}>
                  {option}
                </option>
                // </>
              );
            })}
          </select>
          <div className="mt-3 font-bold text-xl">
            ₹ {foodItem.options[0][size] * quantity}
          </div>
        </div>
        <div className="w-[100%] flex justify-center items-center mt-3">
          <button
            onClick={handaleCart}
            className="bg-[#FFD700] text-black hover:bg-[#FFB800] hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-xl cursor-pointer mt-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
