import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '../../components/common/header/Header.Component'
import FooterComponent from '../../components/common/footer/Footer.Component'
import { IUser } from '../../models/user.Model'


const MainLayout:React.FC = () => {
  return (
<>
<HeaderComponent/>
        <Outlet/>
<FooterComponent/>
</>

  )
}

export default MainLayout