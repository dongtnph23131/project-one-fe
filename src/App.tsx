import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/home";
import LayoutWebsite from "./components/layout/LayoutWebsite";
import NotFound from "./pages/notfound";
import ShopPage from "./pages/shop";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import DetailProduct from "./pages/detail-product";
import ProductManagement from "./pages/admin/product";
import ProductEdit from "./pages/admin/product/edit";
import ProductAdd from "./pages/admin/product/add";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import CategoryAdd from "./pages/admin/category/add";
import { Toaster } from "./components/ui/toaster";
import CategoryList from "./pages/admin/category";
import CategoryEdit from "./pages/admin/category/edit";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import DashboardPage from "./pages/admin";
import CartPage from "./pages/cart";
import PrivateRoute from "./router/PrivateRouter";
import OrderPage from "./pages/order";
import PrivateRouteWebsite from "./router/PrivateRouterWebsite";
import OrderPageAdmin from "./pages/admin/order";
import DetailOrderAdmin from "./pages/admin/order/detail";
import MyOrders from "./pages/my-orders";
import MyOrderDetail from "./pages/order-detail";
const user = JSON.parse(localStorage.getItem("user")!);
const router = createBrowserRouter([
  {
    path: "",
    element: <LayoutWebsite />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "products/:id", element: <DetailProduct /> },
      {
        path: "cart",
        element: <PrivateRouteWebsite user={user} />,
        children: [{ index: true, element: <CartPage /> }],
      },
      {
        path: "order",
        element: <PrivateRouteWebsite user={user} />,
        children: [{ index: true, element: <OrderPage /> }],
      },
      {
        path: "orders/user",
        element: <PrivateRouteWebsite user={user} />,
        children: [{ index: true, element: <MyOrders /> }],
      },
      {
        path: "orders/:id/user",
        element: <PrivateRouteWebsite user={user} />,
        children: [{ index: true, element: <MyOrderDetail /> }],
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute user={user}>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "products/add",
        element: <ProductAdd />,
      },
      {
        path: "products/:id/edit",
        element: <ProductEdit />,
      },
      {
        path: "categories",
        element: <CategoryList />,
      },
      { path: "categories/add", element: <CategoryAdd /> },
      { path: "categories/:id/edit", element: <CategoryEdit /> },
      { path: "orders", element: <OrderPageAdmin /> },
      { path: "orders/:id", element: <DetailOrderAdmin /> },
    ],
  },
  { path: "signin", element: <SigninPage /> },
  { path: "signup", element: <SignupPage /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
