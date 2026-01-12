import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

const Layout: React.FC = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const whishlist = useAppSelector((state) => state.whishlistReducer);
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="bg-[#4a6741] text-white h-31">
        <div className="max-w-300 items-center justify-between flex h-full mx-auto px-5">
          <h1 className="text-2xl font-bold">PetShop</h1>
          <nav>
            <ul className="flex gap-5">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[#f39c12] border-b-2 border-b-[#f39c12] py-1"
                        : "text-white hover:text-[#f39c12] transition-colors"
                    }`
                  }
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative pe-6 ${
                      isActive
                        ? "text-[#f39c12] border-b-2 border-b-[#f39c12] py-1"
                        : "text-white hover:text-[#f39c12] transition-colors"
                    }`
                  }
                  to={"/whishlist"}
                >
                  Wishlist
                  <p className="absolute w-5 h-5 rounded-full top-[50%] left-[75%] -translate-y-[50%] text-sm bg-[#f39c12] flex justify-center items-center text-white">
                    {whishlist.counter}
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative pe-6 ${
                      isActive
                        ? "text-[#f39c12] border-b-2 border-b-[#f39c12] py-1"
                        : "text-white hover:text-[#f39c12] transition-colors"
                    }`
                  }
                  to={"/cart"}
                >
                  Cart
                  <p className="absolute w-5 h-5 rounded-full top-[50%] left-[65%] -translate-y-[50%] text-sm bg-[#f39c12] flex justify-center items-center text-white">
                    {cart.counter}
                  </p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-300 w-full mx-auto p-5 ">
        <Outlet />
      </main>
      <footer className="bg-[#4a6741] text-white pt-15 pb-10">
        <div className="max-w-300 grid grid-cols-3 h-full mx-auto px-5">
          <div>
            <h3 className="border-b-2 border-b-[#f39c12] py-2.5 w-fit mb-3.75 text-lg font-extrabold">
              About PetShop
            </h3>
            <p className="">
              We're dedicated to connecting loving homes with wonderful pets.
              Our mission is to ensure every pet finds a caring family.
            </p>
          </div>
          <div>
            <h3 className="border-b-2 border-b-[#f39c12] py-2.5 w-fit mb-3.75 text-lg font-extrabold">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  className="hover:text-[#f39c12] transition-colors"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#f39c12] transition-colors"
                  to={"/whishlist"}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#f39c12] transition-colors"
                  to={"/cart"}
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="border-b-2 border-b-[#f39c12] py-2.5 w-fit mb-3.75 text-lg font-extrabold">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-1.5">
              <li>
                <p>Email: info@petshop.com</p>
              </li>
              <li>
                <p>Phone: (123) 456-7890</p>
              </li>
              <li>
                <p>Address: 123 Pet Street, Animalville</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-0.5 w-full bg-[rgba(255,255,255,0.1)] mt-15 mb-5"></div>
        <p className="text-center">© 2025 PetShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
