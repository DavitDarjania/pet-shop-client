import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import WhishlistItem from "../components/WhishlistItem";
import { ToastContainer, toast } from "react-toastify";

const WhishlistPage: React.FC = () => {
  const whishlist = useAppSelector((state) => state.whishlistReducer);
  const notifyMove = () => toast.info("Item Moved To Cart");
  const notifyRemove = () => toast.info("item Removed From Whishlist");
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
          Your Whishlist
        </h2>
        {whishlist.whishlist.length !== 0 && (
          <div>
            {whishlist.whishlist.map(
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
                <WhishlistItem
                  categorieId={categorieId}
                  description={description}
                  img={img}
                  isPopular={isPopular}
                  petsId={petsId}
                  price={price}
                  stackNum={stackNum}
                  title={title}
                  key={petsId}
                  notifyMove={notifyMove}
                  notifyRemove={notifyRemove}
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

export default WhishlistPage;
