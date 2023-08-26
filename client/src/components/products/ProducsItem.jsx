import React from "react";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Button, message, Rate } from "antd";

const ProducsItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Ürün Sepete Eklendi");
  };

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <div className="w-[20rem]  flex flex-col h-[25rem] mb-10 border rounded-lg p-1 shadow-md">
          <div className="w-full h-[50%]">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[80%] object-contain rounded-lg"
            />
          </div>
          <div className="w-full h-[50%] flex flex-col justify-between py-2 gap-y-2">
            <h1 className="uppercase font-bold tracking-widest text-center text-xl">
              {item.title}{" "}
            </h1>
            <div className="flex items-center justify-between px-2 gap-x-4 w-full">
              <p className="font-bold tracking-widest text-2xl shadow-md shadow-green-300 p-2 rounded-lg text-green-600 w-[40%]">
                $ {item.price}
              </p>
              <span className="font-bold w-[60%] text-center tracking-widest text-sm text-red-600 border border-dashed p-2 rounded-lg px-7 shadow-md">
                {" "}
                {item.category}{" "}
              </span>
            </div>
            <div className="flex gap-x-2 items-center justify-between">
              <Rate allowHalf defaultValue={2.5} />
              <button className="bg-orange-500 hover:bg-orange-800 transition-all duration-300 ease-out text-white px-6 py-2 rounded-lg">
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducsItem;
