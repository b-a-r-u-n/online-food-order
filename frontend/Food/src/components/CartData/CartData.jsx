import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, handaleQuantity } from "../../Features/cartSlice";

const CartData = ({item}) => {

    const cartItems = useSelector(state => state.cart.cartItems);
    // const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    useEffect(() =>{
      cartItems.forEach((item) => {
        if(item.quantity < 1)
          dispatch(deleteFromCart({id:item._id}));
      }) 
    },[cartItems])

  return (
    <>
      <div
        className="
        flex items-center justify-between bg-[#222] p-4 rounded-lg mb-4
        flex-wrap gap-y-5
        "
      >
        <div
          className="
          w-[100%] flex justify-between
          lg:w-[50%] lg:justify-normal
          "
        >
          <div
            className="
            w-[50%]
            lg:w-auto
            "
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
          <div className="
          text-white ml-4
          ">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm mt-2 lg:mt-0">
            <label className="font-bold mr-3">{item.size}</label> ₹{item.options?.[0]?.[item.size]} 
            </p>
          </div>`
        </div>
        {/* Quantity Buttons */}
        <div
          className="
          w-[100%] flex justify-between
          lg:w-[50%] lg:justify-normal
          "
        >
          <div className="
          flex items-center space-x-2 lg:w-[50%]
          ">
            <button 
              onClick={() => dispatch(handaleQuantity({id:item._id, num: -1}))}
              className="bg-[#FFD700] text-black px-2 py-1 rounded-lg hover:bg-[#FFB800] cursor-pointer"
            >
              ➖
            </button>
            <span className="text-white font-bold">{item.quantity}</span>
            <button 
              onClick={() => dispatch(handaleQuantity({id:item._id, num: 1}))}
              className="bg-[#FFD700] text-black px-2 py-1 rounded-lg hover:bg-[#FFB800] cursor-pointer"
            >
              ➕
            </button>
          </div>
          {/* Remove Button */}
          <button 
            onClick={() => dispatch(deleteFromCart({id: item._id, size: item.size, item}))}
            className="
            bg-red-300 text-red-600 px-2 py-1 rounded-lg cursor-pointer
            w-[50%]
            lg:w-[50%] lg:ml-4
            "
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartData;
