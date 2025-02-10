import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { checkLogIn } from '../../Features/homeSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handaleSubmit = async (e) => {
        e.preventDefault();
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await responce.json();
        if(data.success === false){
            alert(data.message);
            // setEmail("");
            // setPassword("");
            return
        }
        // console.log("Cookie",Cookie);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("email", data.data.user.email);
        dispatch(checkLogIn(true));
        console.log(data);
        setEmail("");
        setPassword("");
        navigate('/');
    }
  return (
    <>
      <div className="min-h-[90vh] bg-[#FFFDD0] flex items-center justify-center py-10">
        <div
            className="min-h-[50vh] border-2 border-[#ffd700] shadow-xl flex flex-col items-center px-10 py-5 rounded-xl bg-[#333333]"
        >
            <h1
                className="text-[#FFD700] font-bold text-3xl"
            >
                Log in
            </h1>
            <form
                className="mt-4 flex flex-col gap-4"
                onSubmit={handaleSubmit}
            >
                <div
                    className="flex flex-col gap-2"
                >
                    <label 
                        htmlFor="Email"
                        className="text-[#FFD700] text-md font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        name="" 
                        id="Email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        className="
                        bg-[#FFFFFF] h-10  rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
                        w-full
                        lg:w-[25vw]
                        "
                    />
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <label 
                        htmlFor="Password"
                        className="text-[#FFD700] text-md font-bold"
                    >
                        Password
                    </label>
                    <div
                        className='relative mb-10'
                    >
                        <input 
                            type={`${isPasswordVisible ? "text" : "password"}`} 
                            name=""
                            id="" 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="
                            bg-[#FFFFFF] absolute h-10  rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
                            w-full
                            lg:w-[25vw]
                            "
                        />
                        <button
                            type='button'
                            className='absolute right-2 h-10'
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {
                                isPasswordVisible ? <EyeOff/> : <Eye/>
                            }
                        </button>
                    </div>
                </div>
                <div>
                    <p
                        className="text-white font-medium text-right"
                    >
                        Forgot password?
                    </p>
                </div>
                <div
                    className="flex justify-center items-center"
                >
                    <button 
                        type="submit"
                        className="bg-[#FFD700] h-10 w-[100%] flex items-center justify-center rounded-lg font-bold cursor-pointer hover:bg-[#FFC300] hover:drop-shadow-[#333333] active:bg-[#FFB000]"
                    >
                        Log In
                    </button>
                </div>
            </form>
            <p
                className="text-white font-medium mt-4"
            >
                Don’t have an account yet?<label className="text-[#FFD700]" > <Link to="/signup">Sign up</Link></label>
            </p>
        </div>
      </div>
    </>
  )
}

export default Login
