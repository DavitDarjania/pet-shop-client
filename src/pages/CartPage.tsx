import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import type { IPet } from "../interfaces/Pet";

const CartPage: React.FC = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const notifyBuying = () => toast.info("You Bought An Item");
  const notifyRemove = () => toast.info("item Removed From Cart");
  const onBuy = ({
    categorieId,
    description,
    img,
    isPopular,
    petsId,
    price,
    stackNum,
    title,
  }: IPet): void => {
    const fullObj: IPet = {
      categorieId,
      description,
      img,
      isPopular,
      petsId,
      price,
      stackNum: stackNum - 1,
      title,
    };
    console.log(fullObj);

    fetch(`http://localhost:3000/pets/${petsId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(fullObj),
    });
  };
  return (
    <>
      <div className="flex justify-end mt-4">
        <select
          className="border border-[#ddd] px-3 py-2 rounded-sm bg-white"
          name=""
          id=""
        >
          <option value="USD">USD ($)</option>
          <option value="GEL">GEL (₾)</option>
        </select>
      </div>
      <section>
        <h2 className="border-s-4 border-s-[#f39c12] py-1 px-2 text-[#4a6741] text-[24px] font-semibold rounded-s-lg mb-4 mt-4">
          Your Cart
        </h2>
        {cart.cart.length !== 0 && (
          <div>
            {cart.cart.map(
              ({
                categorieId,
                description,
                img,
                isPopular,
                petsId,
                price,
                stackNum,
                title,
              }) => (
                <CartItem
                  categorieId={categorieId}
                  description={description}
                  img={img}
                  isPopular={isPopular}
                  petsId={petsId}
                  price={price}
                  stackNum={stackNum}
                  title={title}
                  key={petsId}
                  notifyBuying={notifyBuying}
                  notifyRemove={notifyRemove}
                  onBuy={onBuy}
                />
              )
            )}
          </div>
        )}
      </section>
      <ToastContainer position="top-left" theme="light" />
    </>
  );
};

export default CartPage;
