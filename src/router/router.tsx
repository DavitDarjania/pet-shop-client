import CartPage from "../pages/CartPage";
import MainPage from "../pages/MainPage";
import { createBrowserRouter } from "react-router-dom";
import WhishlistPage from "../pages/WhishlistPage";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <MainPage />,
        path: "/",
      },
      {
        element: <CartPage />,
        path: "/cart",
      },
      {
        element: <WhishlistPage />,
        path: "/whishlist",
      },
    ],
  },
]);
