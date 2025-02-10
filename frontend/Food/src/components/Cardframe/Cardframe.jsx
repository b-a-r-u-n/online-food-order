import React, { useEffect, useState } from 'react'
import { Card, DemoCard } from '../index'
import { useDispatch, useSelector } from 'react-redux';

const Cardframe = () => {

    const category = useSelector(state => state.home.foodCatagories);
    const menu = useSelector(state => state.home.menuItems);
    const searchedItem = useSelector(state => state.home.searchedItem);
    const isLogIn = useSelector(state => state.home.isLogIn);
    // const dispatch = useDispatch();

    
    const [foodCategories, setFoodCategories] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        if(category?.length > 1 && menu?.length > 1)
            setIsEmpty(false);
    },[])

    useEffect(() => {
        setFoodItems(searchedItem);
        if(searchedItem?.length > 1)
            setIsEmpty(false);
        if(searchedItem.length === 0)
            setIsEmpty(true);
    },[searchedItem])

    useEffect(() => {
        if(category?.length > 1 && menu?.length > 1){
            setFoodCategories(category);
            setFoodItems(menu);
            setIsEmpty(false);
        }
    },[category, menu])

  return (
    <>
      <div
          className=" pt-10 gap-y-10 px-10 pb-10"
        >
                     
            
            {
                isEmpty ? 
                <div
                    className='flex justify-center items-center'
                >
                    <p 
                        className="text-3xl font-bold text-[#333333] mt-6 text-center"
                    >
                        🔍 Oops! We searched everywhere, even under the rug... but no items found! 😅🧐
                    </p>
                </div>
                :
                foodCategories.map((category) => {
                    const filteredItems = foodItems.filter((foodItem) => {
                        return foodItem.CategoryName === category.CategoryName;
                    })
                    let isEmpty = true;
                    if(filteredItems.length > 0)
                        isEmpty = false;

                    return (
                        <div
                            key={category._id}
                        >
                            <div
                                className={`border-b-2 pb-4 border-[#333333] mb-4 ${isEmpty === true ? "hidden" : "block"}`}
                            >
                                <p
                                    className={`text-3xl font-bold text-[#333333] mt-6`}
                                >
                                    {
                                        category.CategoryName
                                    }
                                </p>
                            </div>
                            <div
                                className='
                                flex flex-wrap
                                gap-y-10 
                                sm:gap-y-10 sm:justify-evenly
                                lg:gap-x-10 lg:justify-normal
                                
                                '
                            >
                                {
                                    filteredItems.map((foodItem) => {
                                        if(isLogIn || localStorage.getItem("email"))
                                            return <Card key={foodItem._id} foodItem={foodItem}/>
                                        return <DemoCard key={foodItem._id} foodItem={foodItem}/>
                                    })
                                } 
                            </div>   
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default Cardframe
