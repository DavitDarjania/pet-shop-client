import React, { useEffect, useState } from "react";
import MySwiper from "../components/MySwiper";
import Card from "../components/Card";
import { type IPet } from "../interfaces/Pet";
import { useDispatch } from "react-redux";
import type { Dispatch } from "redux";
import { addToCart, removeFromCart } from "../redux/cart/cart.slice";
import type { AppDispatch } from "../redux/store";
import {
  addToWhishlist,
  removeFromWhishlist,
} from "../redux/whishlist/whishlist.slice";
import { ToastContainer, toast } from "react-toastify";
const MainPage: React.FC = () => {
  // const [cart, setCart] = useState<IPet[]>([]);
  const [petList, setPetList] = useState<IPet[]>([]);
  const dispatch: Dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    fetch("http://localhost:3000/pets")
      .then((res) => res.json())
      .then((data) => setPetList(data));
  }, []);

  const onCartClick = (id: string, active: boolean): void => {
    const findedItem = petList.find((el) => el.petsId == id);
    if (active) {
      const notify = () => toast.info("Item Removed From Cart!");
      notify();
      dispatch(removeFromCart(id));
    } else {
      const notify = () => toast.info("Item Added To Cart!");
      notify();
      dispatch(addToCart(findedItem));
    }
  };
  const onHeartClick = (id: string, active: boolean): void => {
    const findedItem = petList.find((el) => el.petsId == id);
    if (active) {
      const notify = () => toast.info("Item Removed From Whishlist!");
      notify();
      dispatch(removeFromWhishlist(id));
    } else {
      const notify = () => toast.info("Item Added To Whishlist!");
      notify();
      dispatch(addToWhishlist(findedItem));
    }
  };
  return (
    <>
      <MySwiper />
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
        <h2 className="border-s-4 border-s-[#f39c12] py-1 px-2 text-[#4a6741] text-[24px] font-semibold rounded-s-lg mb-4">
          Our Pets
        </h2>
        <div className="grid grid-cols-4 gap-7.5">
          {petList.map((el) => (
            <Card
              categorieId={el.categorieId}
              description={el.description}
              img={el.img}
              isPopular={el.isPopular}
              onCartClick={onCartClick}
              petsId={el.petsId}
              price={el.price}
              stackNum={el.stackNum}
              title={el.title}
              key={el.petsId}
              onHeartClick={onHeartClick}
            />
          ))}
        </div>
      </section>
      <ToastContainer position="top-left" theme="light" />
    </>
  );
};

export default MainPage;
