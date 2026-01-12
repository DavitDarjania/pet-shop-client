import React from "react";
import type { IPet } from "../interfaces/Pet";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import type { AppDispatch } from "../redux/store";
import { removeFromCart } from "../redux/cart/cart.slice";
interface IPetWithNotify extends IPet {
  notifyBuying(): void;
  notifyRemove(): void;
  onBuy({
    categorieId,
    description,
    img,
    isPopular,
    petsId,
    price,
    stackNum,
    title,
  }: IPet): void;
}

const CartItem: React.FC<IPetWithNotify> = ({
  img,
  petsId,
  price,
  title,
  notifyBuying,
  notifyRemove,
  categorieId,
  description,
  isPopular,
  stackNum,
  onBuy,
}) => {
  const dispatch: Dispatch = useDispatch<AppDispatch>();
  const onRemove = (id: string) => {
    dispatch(removeFromCart(id));
    notifyRemove();
  };
  return (
    <article className="flex items-center justify-between bg-white p-3.75 rounded-[10px] mb-3.75 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <div className="h-25 w-25 flex justify-center items-center bg-gray-100 rounded-md text-2xl">
          {img}
        </div>
        <div>
          <h3
            className=" text-[18px] font-semibold text-[#4a6741] mb-1.25
"
          >
            {title}
          </h3>
          <p
            className=" text-[16px] font-medium text-[#f39c12]
"
          >
            $ {price}
          </p>
        </div>
      </div>
      <div className="flex gap-2.5">
        <button
          onClick={() => {
            notifyBuying();
            dispatch(removeFromCart(petsId));
            onBuy({
              categorieId,
              description,
              img,
              isPopular,
              petsId,
              price,
              stackNum,
              title,
            });
          }}
          className="bg-[#2ecc71] text-white py-2 px-3.75 rounded-sm cursor-pointer font-medium transition-all duration-300 ease-in-out hover:bg-[#25a65b]"
        >
          Buy Now
        </button>
        <button
          onClick={() => onRemove(petsId)}
          className="bg-white text-[#e74c3c] border border-[#e74c3c] py-2 px-3.75 rounded-sm cursor-pointer font-medium transition-all duration-300 ease-in-out hover:bg-[#e74c3c] hover:text-white"
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
