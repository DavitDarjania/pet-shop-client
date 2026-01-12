import React, { useEffect, useState } from "react";
import HeartImg from "../assets/heart-2.png";
import TrolleyImg from "../assets/trolley-2.png";
import type { IPet } from "../interfaces/Pet";
import { useAppSelector } from "../hooks/useAppSelector";

interface IPetAndTrolley extends IPet {
  onCartClick(id: string, active: boolean): void;
  onHeartClick(id: string, active: boolean): void;
  rate: number;
}

const Card: React.FC<IPetAndTrolley> = ({
  petsId,
  img,
  price,
  title,
  onCartClick,
  onHeartClick,
  rate,
}) => {
  const [activeList, setActiveList] = useState({
    activeHeart: false,
    activeTrolley: false,
  });
  const cart = useAppSelector((state) => state.cartReducer);
  const whishlist = useAppSelector((state) => state.whishlistReducer);
  useEffect(() => {
    const itemExistsInCart = cart.cart.some((el) => el.petsId == petsId);
    const itemExistsInWhishlist = whishlist.whishlist.some(
      (el) => el.petsId == petsId
    );
    setActiveList({
      activeHeart: itemExistsInWhishlist,
      activeTrolley: itemExistsInCart,
    });
  }, [cart.cart]);
  return (
    <article className="rounded-[10px] group/card overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all">
      <div className="h-50 w-[267.5px] overflow-hidden flex justify-center items-center">
        <p className="group-hover/card:scale-120 transition-all text-4xl">
          {img}
        </p>
      </div>
      <div className="p-3.75 bg-white">
        <h4 className="text-[18px] font-semibold mb-2.5 text-[#4a6741]">
          {title}
        </h4>
        <p className="text-[16px] font-medium text-[#f39c12] mb-3.75">
          {rate == 1 ? "$" : "₾"} {(Number(price) * rate).toFixed(2)}
        </p>
        <div className="flex justify-between">
          <div className="bg-[#4a6741] text-white flex items-center px-3 rounded-sm hover:bg-[#3c5434] transition-colors w-fit">
            Details
          </div>
          <div className="">
            <button
              onClick={() => {
                onHeartClick(petsId, activeList.activeHeart);
                setActiveList((prevState) => ({
                  ...prevState,
                  activeHeart: !prevState.activeHeart,
                }));
              }}
              className="w-10 h-10 border-2 rounded-full flex items-center justify-center group/heart hover:bg-[rgba(231,76,60,0.1)] transition-colors"
            >
              {!activeList.activeHeart ? (
                <img
                  className={
                    !activeList.activeHeart
                      ? "w-4.5 h-4.5 brightness-0 group-hover/heart:brightness-100"
                      : "w-4.5 h-4.5"
                  }
                  src={HeartImg}
                  alt=""
                />
              ) : (
                <img className="w-4.5 h-4.5" src={HeartImg} alt="" />
              )}
            </button>
            <button
              onClick={() => {
                onCartClick(petsId, activeList.activeTrolley);
                setActiveList((prevState) => ({
                  ...prevState,
                  activeTrolley: !prevState.activeTrolley,
                }));
              }}
              className="w-10 h-10 border-2 rounded-full flex items-center justify-center group/heart hover:bg-[rgba(231,76,60,0.1)] transition-colors"
            >
              <img
                className={
                  !activeList.activeTrolley
                    ? "w-4.5 h-4.5 brightness-0 group-hover/heart:brightness-100 me-1"
                    : "w-4.5 h-4.5 me-1"
                }
                src={TrolleyImg}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
