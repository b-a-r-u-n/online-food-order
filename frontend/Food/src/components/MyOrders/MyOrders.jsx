import React from 'react'
import OrderData from '../OrderData/OrderData';
import { useLoaderData } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

const MyOrders = () => {
  const data = useLoaderData();
  const orderedItems = data?.data?.orderItems.reverse();

  return (
    <>
      <div
        className='min-h-[90vh] bg-[#FFFDD0] 
        px-2
        lg:px-[10vw]
        '
      >
        <h1
            className='text-4xl font-semibold py-[5vh]'
        >My Orders 🛒✨</h1>
        <div
            className='bg-[#333333] h-[70vh] rounded-2xl py-10
            px-5
            lg:px-10
            '
        >
            {
              orderedItems ?
              <div
                className='overflow-y-scroll h-[100%]'
              >
                {/* <OrderData /> */}
                {
                  orderedItems?.map((items) => {
                      return <OrderData key={nanoid()} items={items}/>
                  })
                }
              </div>
              :
              <div
                className='h-[100%] w-[100%] flex justify-center items-center'
              >
                <p
                  className='w-[70%] text-center text-white text-2xl'
                >
                  Looks like your order history is on a secret mission... and disappeared! 🕵️‍♂️🛒 Time to fill it up! 😆"
                </p>
              </div>
            }
        </div>
      </div>
    </>
  )
}

export default MyOrders

export const getOrderData = async () => {
  const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/orderhistory`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: localStorage.getItem("email") || null
    })
  });
  const data = await responce.json();
  return data;
}
