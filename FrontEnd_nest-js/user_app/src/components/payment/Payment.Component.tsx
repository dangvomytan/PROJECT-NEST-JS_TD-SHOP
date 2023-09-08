import React, { useEffect, useState } from 'react';
import { cartItemApi } from '../../models/cartItem.Model';
import { ICart } from '../../models/cart.Model';
import { IUser } from '../../models/user.Model';
import { Toaster, toast } from 'react-hot-toast';
import { OrderApi } from '../../models/order.Model';
import { useNavigate } from 'react-router-dom';

const PaymentComponent: React.FC = () => {
  const [cart, setCart] = useState<ICart[]>([]);
  const navigate = useNavigate();


  const userLogin: IUser | null = JSON.parse(localStorage.getItem('userLogin') || 'null');
  if (userLogin === null) {
    window.location.href = '/login';
  }

  const [formData, setFormData] = useState({
    email:userLogin?.email ||'',
    name:userLogin?.first_Name+' '+userLogin?.last_Name  ||'',
    address:"",
    phone:"",
    method:"",
    status:0,
  });

  const handleCallData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataApi: any = await cartItemApi.getCartItemByUser(userLogin?.tbl_cart.id) || null;
    setCart(DataApi);
  };
  useEffect(() => {
    handleCallData();
  }, []);


    // handle xu ly lay du lieu tu from
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
     const clickOrder = async () => {

    }

  return (
    <>
          <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <div className='bg-white'>
        <div className="max-w-6xl m-auto flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-2xl font-bold text-gray-800">Payment</a>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Cart</span>
                </li>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Checkout</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">3</a>
                  <span className="font-semibold text-gray-900">Payment</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>

              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className=" max-w-5xl m-auto flex justify-between gap-3 mt-3 sm:px-10 lg:grid-cols-2 lg:px-10 xl:px-10">
        <div className="w-full px- py-8  bg-white">
          <p className="text-xl text-center font-medium px-4">Thanks order</p>

        </div>
      
      </div>

    </>
  );
};
export default PaymentComponent