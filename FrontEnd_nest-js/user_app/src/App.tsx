
import { BrowserRouter } from 'react-router-dom'
// import './App.css'
import  Router  from './routers/router'
import store from './redux/store/store'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



function App() {
  const PAYPAL_CLIENT =
    "Ad5zlqPMe2l2srZQe-HuGPDXAiH_Tk3u94t5bO_ESV5zGwYpPKbq8xk7sYpLSlJ03X4nj9v_ZTbX5bgR";
  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT }}>
  <Provider store={store}>
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
  </Provider>
  </PayPalScriptProvider>
  )
}

export default App
