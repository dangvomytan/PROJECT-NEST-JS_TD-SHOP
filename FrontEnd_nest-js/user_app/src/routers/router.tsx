import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.Layout";
import RegisterComponent from "../components/register/Register.Component";
import LoginComponent from "../components/login/Login.Component";
import NotFoundPage from "../pages/notFound/NotFound.Page";
import HomeComponent from "../components/home/Home.Component";
import MainLayout from "../layouts/main/main.Layout";
import RequireLogin from "../middleware/RequireLogin/RequireLogin";
import DetailComponent from "../components/detail/Detail.Component";
import CheckoutComponent from "../components/checkout/Checkout.Component";
import CartComponent from "../components/cart/Cart.Component";
import PaymentComponent from "../components/payment/Payment.Component";
import ShopComponent from "../components/shop/shop/Shop.Component";
import ProfileComponent from "../components/profile/Profile.Component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<RegisterComponent />} />
      </Route>
      {/* <Route element={<RequireLogin/>}> */}
      <Route path="/" element={<MainLayout/>}>
        <Route element={<HomeComponent/>} index/>
        <Route path="shop" element={<ShopComponent/>} />
        <Route path="shop/detail" element={<DetailComponent/>} />
        <Route path="cart" element={<CartComponent/>} />
        <Route path="checkout" element={<CheckoutComponent/>} />
        <Route path="payment" element={<PaymentComponent/>} />
        <Route path="profile" element={<ProfileComponent/>} />
      </Route>
      {/* </Route> */}
     

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
