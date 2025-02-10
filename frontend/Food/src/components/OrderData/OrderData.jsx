import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";

const OrderData = ({ items }) => {
  // const [date, setDate] = useState("");

  return (
    <>
      {items.map((item) => {
        return (
          <div key={nanoid()}>
            {
              item.date? 
              <>
                <p className="text-white mb-3 text-lg font-semibold">{item.date}</p>
                <div className="
                bg-[#222] p-4 rounded-lg mb-4 text-white grid  place-content-center items-center gap-10
                grid-cols-2
                lg:grid-cols-4
                "
                >
                  <div
                    className="w-24 h-14 bg-center bg-cover"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="flex flex-col">
                    <p>{item.name}</p>
                    <p><label>Quantity: </label>{item.quantity}</p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p
                      className="text-green-400"
                    >
                      completed
                    </p>
                  </div>
                  <div>₹ {item.options?.[0]?.[item.size] * item.quantity}</div>
                </div>
              </>
              :
              <div className="
                bg-[#222] p-4 rounded-lg mb-4 text-white grid  place-content-center items-center gap-10
                grid-cols-2
                lg:grid-cols-4
                "
              >
                <div
                  className="w-24 h-14 bg-center bg-cover"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div className="flex flex-col">
                  <p>{item.name}</p>
                  <p><label>Quantity: </label>{item.quantity}</p>
                </div>
                <div>
                  <p>Status</p>
                  <p
                    className="text-green-400"
                  >
                    completed
                  </p>
                </div>
                <div>₹ {item.options?.[0]?.[item.size] * item.quantity}</div>
              </div>
            }
          </div>
        );
      })}
    </>
  );
};

export default OrderData;
