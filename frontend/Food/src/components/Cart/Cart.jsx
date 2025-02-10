import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import { cartVisible, clearCart } from '../../Features/cartSlice';
import CartData from '../CartData/CartData';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    // const isVisible = useSelector(state => state.cart.isCartVisible);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const isVisible = useSelector(state => state.cart.isCartVisible);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    
    const handaleSubmit = async () => {
      if(cartItems.length === 0)
        alert("The cart is empty");
      const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/myorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          foodData: cartItems
        })
      })
      dispatch(cartVisible(false));
      dispatch(clearCart());
      navigate('/');
    }

      const handaleButton = () => {
        dispatch(cartVisible(false))
      }
    
      return  ReactDOM.createPortal(
        <>
         <div className=" h-screen backdrop-blur-2xl w-full py-10 px-4 md:px-16 z-50 fixed top-0">
          {/* Cart Container */}
          <div 
            className="max-w-4xl mx-auto bg-[#333333]/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
                onClick={handaleButton}
                className='
                absolute text-4xl  cursor-pointer
                right-0 top-[-2vh]
                lg:right-[-3vw] lg:top-0
                '
            >
                ❌
            </button>
            {/* Header */}
            <h2 className="text-[#FFD700] text-2xl font-semibold text-center mb-6">
              Your Cart 🛒
            </h2>
    
            {/* Cart Items */}
            <div
                className='h-[60vh] overflow-y-scroll'
            >
                {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartData key={item._id} item={item}/>
              ))
            ) : (
              <div
                className='h-full flex justify-center items-center'
              >
                <p className="text-center text-white text-3xl">
                  🛒 Oops! Your cart is so empty, even a ghost wouldn't haunt it! 👻💨
                </p>
              </div>
            )}
            </div>
    
            {/* Price Summary */}
            <div className="bg-[#222] p-4 rounded-lg text-white mt-6">
              <div className="flex justify-between text-lg mt-2 text-[#FFD700]">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
    
            {/* Checkout Button */}
            <button 
              className="w-full mt-6 bg-[#FFD700] text-black font-semibold py-3 rounded-lg hover:bg-[#FFB800] transition cursor-pointer"
              onClick={handaleSubmit}
            >
              Proceed to Checkout 💳
            </button>
          </div>
        </div>
        
        </>,
        document.querySelector("#cart")
      );
    };

export default Cart
