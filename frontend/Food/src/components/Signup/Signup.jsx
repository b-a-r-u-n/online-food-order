import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import {Link, useNavigate} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [location, setLocation] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const handaleSubmit = async (e) => {
        e.preventDefault();        
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
                confirmPassword,
                location
            })
        })
        const data = await responce.json();
        console.log(data);
        if(!data.success){
            alert(data.message);
            // setFullName("");
            // setEmail("");
            // setPassword("");
            // setConfirmPassword("");
            // setLocation("");
            return;
        }
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLocation("");
        navigate('/login');
        // alert(data.message);
    }

  return (
    <>
      <div className="min-h-[90vh] bg-[#FFFDD0] flex items-center justify-center py-10">
        <div
            className="min-h-[80vh] border-2 border-[#ffd700] shadow-xl flex flex-col items-center px-10 py-5 rounded-xl bg-[#333333]"
        >
            <h1
                className="text-[#FFD700] font-bold text-3xl"
            >
                Sign up
            </h1>
            <form
                className="mt-4 flex flex-col gap-4"
                onSubmit={handaleSubmit}
            >
                <div
                    className="flex flex-col gap-2"
                >
                    <label 
                        htmlFor="Name"
                        className="text-[#FFD700] text-md font-bold"
                    >
                        Name
                    </label>
                    <input 
                        type="text" 
                        name="" 
                        id="Name"
                        value={fullName}
                        onChange={(e)=> setFullName(e.target.value)}
                        className="
                        bg-[#FFFFFF] h-10 rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
                        w-full
                        lg:w-[25vw]
                        "
                        placeholder="Enter your Name" 
                    />
                </div>
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
                        bg-[#FFFFFF] h-10 rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
                        w-full
                        lg:w-[25vw]
                        "
                    />
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <label 
                        htmlFor="Location"
                        className="text-[#FFD700] text-md font-bold"
                    >
                        Location
                    </label>
                    <input 
                        type="text" 
                        name="" 
                        id="Location" 
                        value={location}
                        onChange={(e)=> setLocation(e.target.value)}
                        placeholder="Enter your Location"
                        className="
                        bg-[#FFFFFF] h-10 rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
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
                        className="relative mb-10"
                    >
                        <input 
                            type={`${isPasswordVisible ? "text" : "password"}`} 
                            name=""
                            id="" 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="••••••••"
                            
                            className="
                            absolute bg-[#FFFFFF] h-10 rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
                            w-full
                            lg:w-[25vw]
                            "
                        />
                        <button
                            type="button"
                            className="absolute h-10 right-2"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {
                                isPasswordVisible ? <EyeOff /> : <Eye/>
                            }
                        </button>
                    </div>
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <label 
                        htmlFor="Confirm-Password"
                        className="text-[#FFD700] text-md font-bold"
                    >
                        Confirm Password
                    </label>
                    <div
                        className="relative mb-10"
                    >
                        <input 
                            type={`${isConfirmPasswordVisible ? "text" : "password"}`}  
                            name="" 
                            id="Confirm-Password" 
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="
                            absolute bg-[#FFFFFF] h-10 rounded-lg px-3 font-medium outline-none focus:border-2 focus:border-[#FFD700] focus:shadow focus:shadow-[#FFD700]
                            w-full
                            lg:w-[25vw]
                            "
                        />
                        <button
                            type="button"
                            className="absolute h-10 right-2"
                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        >
                            {
                                isConfirmPasswordVisible ? <EyeOff /> : <Eye/>
                            }
                        </button>
                    </div>
                </div>
                <div>
                    <PasswordChecklist
                        rules={["minLength","specialChar","number","capital","match"]}
                        minLength={8}
                        value={password}
                        valueAgain={confirmPassword}
                        onChange={(isValid) => {
                            if(isValid)
                                setIsPasswordValid(true);
                        }}
                        className="text-white"
			        />
                </div>
                <div
                    className="flex justify-center items-center"
                >
                    <button 
                        type="submit"
                        disabled={!isPasswordValid}
                        className={`bg-[#FFD700] h-10 w-[100%] flex items-center justify-center rounded-lg font-bold ${isPasswordValid ? "hover:bg-[#FFC300] hover:drop-shadow-[#333333] cursor-pointer active:bg-[#FFB000]" : "cursor-not-allowed opacity-50"}`}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p
                className="text-white font-medium mt-4"
            >
                Already have an account?<label className="text-[#FFD700]" > <Link to="/login">Log in</Link></label>
            </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
