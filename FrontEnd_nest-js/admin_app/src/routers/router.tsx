import React from 'react'

import {Routes,Route} from 'react-router-dom'
import NotFoundPage from '../pages/notFound/NotFound.Page'
import ProductPage from '../pages/product/Product.Page'
import OrderPage from '../pages/Order/Order.Page'
import VersionPage from '../pages/Version/Version.Page'
import AdminPage from '../pages/admin/Admin.Page'
import UserPage from '../pages/user/User.Page'
import OrderItemPage from '../pages/Order/OrderItem.Page'
import AuthLayout from '../layouts/auth/Auth.Layout'
import LoginComponent from '../components/login/Login.Component'
import HomePage from '../pages/main/Main.Page'
import DashboardPage from '../pages/Dashboard/Dashboard.Page'


const Router:React.FC = () => {
  return (
    <>

      <Routes>
        <Route path="/"  element={<AuthLayout/>}>
          <Route path="" element={<LoginComponent/>}/>
        </Route>
        <Route path="/admin/" element={<HomePage/>}>
        <Route path="dashbord" element={<DashboardPage/>}/>
        <Route path="product" element={<ProductPage/>}/>
        <Route path="version" element={<VersionPage/>}/>
        <Route path="order" element={<OrderPage/>}/>
        <Route path="order-item" element={<OrderItemPage/>}/>
        <Route path="admin" element={<AdminPage/>}/>
        <Route path="user" element={<UserPage/>}/>
        </Route>
        
        {/* <Route path="/admin" element={<HomePage/>}>
        <Route path="users" element={<UserPage/>}/> */}
        {/* </Route> */}
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default Router