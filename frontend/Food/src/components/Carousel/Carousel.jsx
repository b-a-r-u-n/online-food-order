import React from 'react'
import { useState, useEffect } from 'react';
import biriyani from "../../image/biriyani.jpg";
import burger from "../../image/burger.jpg";
import chowmein from "../../image/chow mein(Non-veg).jpg";
import frenchfries from "../../image/frenchfries.jpg";
import pizza from "../../image/pizza.jpg";
import roll from "../../image/roll.jpg";
import sandwich from "../../image/sandwich.jpg";
import { useDispatch } from 'react-redux';
import { handaleSearch } from '../../Features/homeSlice';


const Carousel = () => {
    const images = [
      biriyani,
      burger,
      chowmein,
      frenchfries,
      pizza,
      roll,
      sandwich
    ];

    const dispatch = useDispatch();
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const autoSwipeInterval = 3000;
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    const goToSlide = (index) => {
      setCurrentIndex(index);
    };
  
    // Auto-swipe logic
    useEffect(() => {
      const timer = setInterval(() => {
        handleNext();
      }, autoSwipeInterval);
  
      return () => clearInterval(timer); // Cleanup timer
    }, [currentIndex]);
  
    const handleSearch = () => {
      dispatch(handaleSearch(searchTerm));
      setSearchTerm("");
    };
  
    return (
      <div className="relative w-full">
        {/* Carousel Wrapper */}
        {/* <div className="relative h-56 overflow-hidden rounded-lg md:h-96"> */}
        <div className="
        relative h-[60vh] overflow-hidden rounded-lg 
        lg:h-[50vh]
        "
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="block w-full h-full object-cover"
              />
            </div>
          ))}
  
          {/* Search Bar Positioned at the Center */}
          {
            localStorage.getItem("email") ?
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="
              bg-white/70 p-4 rounded-lg shadow-md flex
              flex-col
              sm:flex-row
              ">
                <input
                  type="text"
                  placeholder="Search food..."
                  className="
                  px-4 py-2 border border-gray-300 rounded-lg w-64 outline-none
                  mb-3
                  sm:mb-0
                  "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // onKeyDown={(e) => {
                  //   if(e.key === "Enter"){
                  //     console.log(e.key);
                  //     handleSearch();
                  //   }
                  // }}
                  onKeyPress={(e) => {
                    if(e.key === "Enter"){
                      handleSearch();
                    }
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          :
            ""
          }
        </div>
  
        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
  
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="
          absolute px-2 top-0 left-0 z-30 flex items-center justify-center h-full text-white bg-black/30 hover:bg-black/50 focus:outline-none
          sm:px-4
          "
        >
          <span className="w-8 h-8 inline-flex items-center justify-center bg-white rounded-full">
            <svg
              className="w-4 h-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </button>
        <button
          onClick={handleNext}
          className="
          absolute top-0 right-0 z-30 flex items-center justify-center h-full text-white bg-black/30 hover:bg-black/50 focus:outline-none
          px-2
          sm:px-4
          "
        >
          <span className="w-8 h-8 inline-flex items-center justify-center bg-white rounded-full">
            <svg
              className="w-4 h-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    );
  };

export default Carousel;
