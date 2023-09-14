import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.Layout";
import RegisterComponent from "../components/register/Register.Component";
import LoginComponent from "../components/login/Login.Component";
import NotFoundPage from "../pages/notFound/NotFound.Page";
import HomeComponent from "../components/home/Home.Component";
import MainLayout from "../layouts/main/main.Layout";
import DetailComponent from "../components/detail/Detail.Component";
import CheckoutComponent from "../components/checkout/Checkout.Component";
import CartComponent from "../components/cart/Cart.Component";
import PaymentComponent from "../components/payment/Payment.Component";
import ShopComponent from "../components/shop/shop/Shop.Component";
import SearchComponent from "../components/search/Search.Component";
import ProfileLayout from "../layouts/profile/Profile.Layout";
import InfoUserComponent from "../components/profile/InfoUser.Component";
import HistoryOrderComponent from "../components/profile/HistoryOrder.Component";
import OrderItemComponent from "../components/profile/OrderItem.Component";

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
        <Route path="search" element={<SearchComponent/>} />
        <Route path="search/detail" element={<DetailComponent/>} />
        <Route path="detail" element={<DetailComponent/>} />
        <Route path="shop/detail" element={<DetailComponent/>} />
        
        <Route path="cart" element={<CartComponent/>} />
        <Route path="checkout" element={<CheckoutComponent />} />
        <Route path="payment" element={<PaymentComponent/>} />
      </Route>
      <Route path="/" element={<ProfileLayout/>}>
        <Route path="info-user" element={<InfoUserComponent/>} />
        <Route path="history-order" element={<HistoryOrderComponent/>} />
        <Route path="history-orderitem" element={<OrderItemComponent/>} />
      </Route>
      {/* </Route> */}
     

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
