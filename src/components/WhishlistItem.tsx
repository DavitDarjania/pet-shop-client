import React from "react";
import type { IPet } from "../interfaces/Pet";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { removeFromWhishlist } from "../redux/whishlist/whishlist.slice";
import { addToCart } from "../redux/cart/cart.slice";
interface IPetWithToast extends IPet {
  notifyMove(): void;
  notifyRemove(): void;
}
const WhishlistItem: React.FC<IPetWithToast> = ({
  categorieId,
  description,
  img,
  isPopular,
  petsId,
  price,
  stackNum,
  title,
  notifyMove,
  notifyRemove,
}) => {
  const dispatch: Dispatch = useDispatch<AppDispatch>();
  const onRemove = (id: string) => {
    notifyRemove();
    dispatch(removeFromWhishlist(id));
  };
  const onMove = (id: string) => {
    const itemToAdd: IPet = {
      categorieId,
      description,
      img,
      isPopular,
      petsId,
      price,
      stackNum,
      title,
    };
    notifyMove();
    dispatch(removeFromWhishlist(id));
    dispatch(addToCart(itemToAdd));
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
          onClick={() => onMove(petsId)}
          className="bg-[#2d8652] text-white py-2 px-3.75 rounded-sm cursor-pointer font-medium transition-all duration-300 ease-in-out hover:bg-[#1a4e30]"
        >
          Move To Cart
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

export default WhishlistItem;
