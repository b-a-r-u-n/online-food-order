import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { cartVisible } from '../../Features/cartSlice';
import { checkLogIn } from '../../Features/homeSlice';
import './Navbar.css'
import Logo from '../../image/Logo.png'

const Navbar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.cart.isCartVisible);
  const cartItems = useSelector(state => state.cart.cartItems);
  // const isLogIn = useSelector(state => state.home.isLogIn)

  const [isMenuActive, setIsMenuActive] = useState(false);

  const handaleLogOut = async () => {
    const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await responce.json();
    console.log(data);
    if(!data.success)
      alert(data.message)
    else{
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      // localStorage.clear();
      dispatch(checkLogIn(false));
      navigate("/");
    }
  }
  
  return (
    <>
      <div
        className="
        h-[10vh] bg-[#333333] text-[#FFD700] flex justify-between items-center px-10 sticky top-0 z-50
        
        "
        style={{ fontFamily: "Playfair Display" }}
      >
        <Link to="/">
          <div
            className="
              h-[8vh] w-[20vw] 
              sm:w-[25vw] sm:h-[8vh]
              md:w-[20vw] md:h-[8vh]
              lg:w-[15vw] lg:h-[8vh]
              xl:w-[12vw] xl:h-[10vh]
              bg-contain bg-no-repeat bg-center
            "
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>
        </Link>

        <div
          className="
          hidden
          lg:block
          "
        >
          <ul className="font-bold text-2xl flex gap-10">
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>About</li>
            <li>Contact Us</li>
            {localStorage.getItem("email") ? (
              <Link to="/my-orders">
                <li>My Orders</li>
              </Link>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div
          className="
          hidden
          lg:block lg:flex lg:gap-10
          "
        >
          {localStorage.getItem("email") ? (
            <>
              <button
                onClick={() => dispatch(cartVisible(true))}
                className="bg-transparent text-3xl text-[#FFFFFF] px-5 py-1 rounded-lg font-bold cursor-pointer"
              >
                🛒
                {/* This part of the code is conditionally rendering a `<sup>` element to display the
                number of items in the cart. Here's how it works: */}
                {cartItems.length > 0 ? (
                  <sup className="bg bg-red-500 text-lg rounded-full px-2 text-center relative left-[-1vh] top-[-2vh]">
                    {cartItems.length}
                  </sup>
                ) : (
                  " "
                )}
                {/* The code `isVisible ? <Cart /> : ""` is a conditional rendering statement in React. */}
                {isVisible ? <Cart /> : ""}
              </button>
              <button
                onClick={handaleLogOut}
                className="bg-[#FFD700] hover:bg-[#FFB800] text-black  hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-xl cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-[#ff0051]" : "text-black"}`
                }
                to="/login"
              >
                <button className="bg-[#FFD700] hover:bg-[#FFB800]  hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-xl cursor-pointer">
                  Login
                </button>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${isActive ? "text-[#ff0051]" : "text-black"}`
                }
              >
                <button className="bg-[#FFD700] hover:bg-[#FFB800]  hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-xl cursor-pointer">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* The below code is a snippet of JSX code written in JavaScript React. It is a responsive menu
        component that toggles its visibility when a button with a hamburger icon is clicked. Here
        is a breakdown of what the code is doing: */}
        <div className="lg:hidden flex">
          {
            localStorage.getItem("email") ? 
            <button
            onClick={() => {
              dispatch(cartVisible(true))
            }}
            className="bg-transparent text-3xl text-[#FFFFFF] px-5 py-1 rounded-lg font-bold cursor-pointer"
          >
            🛒
            {/* This part of the code is conditionally rendering a `<sup>` element to display the
                number of items in the cart. Here's how it works: */}
            {cartItems.length > 0 ? (
              <sup className="bg bg-red-500 text-lg rounded-full px-2 text-center relative left-[-1vh] top-[-2vh]">
                {cartItems.length}
              </sup>
            ) : (
              " "
            )}
            {/* The code `isVisible ? <Cart /> : ""` is a conditional rendering statement in React. */}
            {isVisible ? <Cart /> : ""}
          </button>
          :
          ""
          }
          {/* This code snippet is creating a button with an onClick event handler that toggles the
          visibility of a responsive menu. Here's a breakdown of what the code is doing: */}
          <button
            onClick={() => {
              setIsMenuActive((prev) => !prev);
              console.log("click");
            }}
            className="hoverIcon
            block text-4xl
            sm:text-6xl
            lg:hidden
            "
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          {/* The below code is a JSX snippet written in JavaScript React. It represents a responsive
          mobile menu component that toggles its visibility based on the `isMenuActive` state. When
          the menu is active, it displays a list of navigation links such as "Home", "My Orders",
          "Login", "Signup", and "Logout". */}
          <div
            className={`${isMenuActive ? "active" : ""}
              hoverContainer
              absolute h-[50vh] w-[100vw] bg-[#333333] z-50
              lg:hidden
            `}
          >
            <div className="flex justify-center mt-[10vh]">
              <button
                onClick={() => {
                  setIsMenuActive((prev) => !prev);
                }}
                className="
                block text-4xl absolute top-3 right-8
                sm:text-6xl
                "
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <ul className="font-bold text-3xl flex flex-col items-center gap-5">
                <Link to="/">
                  <li
                    onClick={() => {
                      setIsMenuActive((prev) => !prev);
                    }}
                  >Home</li>
                </Link>
                {localStorage.getItem("email") ? (
                  <Link to="/my-orders">
                    <li
                      onClick={() => {
                        setIsMenuActive((prev) => !prev);
                      }}
                    >My Orders</li>
                  </Link>
                ) : (
                  ""
                )}
                {localStorage.getItem("email") ? (
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `${isActive ? "text-[#ff0051]" : "text-black"}`
                      }
                      to="/login"
                    >
                      <button
                        onClick={() => {
                          setIsMenuActive((prev) => !prev);
                          handaleLogOut();
                        }}
                        className="
                        bg-[#FFD700] text-black hover:bg-[#FFB800]  hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-xl cursor-pointer
                        sm:text-3xl
                        md:text-4xl
                        "
                      >
                        Logout
                      </button>
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `${isActive ? "text-[#ff0051]" : "text-black"}`
                        }
                        to="/login"
                      >
                        <button
                          onClick={() => {
                            setIsMenuActive((prev) => !prev);
                          }}
                          className="
                          bg-[#FFD700] text-black hover:bg-[#FFB800]  hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-2xl cursor-pointer
                          sm:text-3xl
                          md:text-4xl
                          "
                        >
                          Login
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `${isActive ? "text-[#ff0051]" : "text-black"}`
                        }
                        to="/signup"
                      >
                        <button
                          onClick={() => {
                            setIsMenuActive((prev) => !prev);
                          }}
                          className="
                          bg-[#FFD700] text-black hover:bg-[#FFB800]  hover:text-[#FFFFFF] px-5 py-1 rounded-lg font-bold text-2xl cursor-pointer
                          sm:text-3xl
                          md:text-4xl
                          "
                        >
                          Sign Up
                        </button>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar
