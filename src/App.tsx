import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="products/:id" element={<DetailProduct />} />
          <Route
            path="cart"
            element={
              <PrivateRouteWebsite>
                <CartPage />
              </PrivateRouteWebsite>
            }
          ></Route>
          <Route
            path="order"
            element={
              <PrivateRouteWebsite>
                <OrderPage />
              </PrivateRouteWebsite>
            }
          ></Route>
        </Route>
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <LayoutAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="categories" element={<CategoryList />}></Route>
          <Route path="categories/:id/edit" element={<CategoryEdit />} />
          <Route path="orders" element={<OrderPageAdmin/>}/>
          <Route path="orders/:id" element={<DetailOrderAdmin/>}/>
        </Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="signin" element={<SigninPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
