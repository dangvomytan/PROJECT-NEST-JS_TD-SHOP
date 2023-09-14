import React, { useEffect, useState } from 'react';
import { cartItemApi } from '../../models/cartItem.Model';
import { ICart } from '../../models/cart.Model';
import { IUser } from '../../models/user.Model';
import { Toaster, toast } from 'react-hot-toast';
import { OrderApi } from '../../models/order.Model';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';

const CheckoutComponent: React.FC = () => {
  const [cart, setCart] = useState<ICart[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const navigate = useNavigate();
  const [paystatus, setPayStatus] = useState(false)


  const userLogin: IUser | null = JSON.parse(localStorage.getItem('userLogin') || 'null');
  if (userLogin === null) {
    window.location.href = '/login';
  }

  const [formData, setFormData] = useState({
    email: userLogin?.email || '',
    name: userLogin?.first_Name + ' ' + userLogin?.last_Name || '',
    address: "",
    phone: "",
    method: "",
    status: 0,
  });

  const handleCallData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataApi: any = await cartItemApi.getCartItemByUser(userLogin?.id) || null;
    setCart(DataApi);
    let sumTotal = 0;
    DataApi?.map((item: { quantity: number; tbl_version: { price: number; }; }) => {
      sumTotal += item.quantity * item.tbl_version.price
    })
    setSubTotal(sumTotal);
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
    setPayStatus(true)
  }
  useEffect(() => {
    if (paystatus) {


      if (cart.length > 0 && userLogin) {
        const order = {
          address: formData.address,
          phone: Number(formData.phone),
          method: formData.method,
          status: formData.status,
          user_Id: userLogin?.id,
          total: subTotal
        }
        try {
          OrderApi.createOrder({ cart, order });
          handleCallData()
          const notify = () => toast.success("Successfully deleted !");
          notify();
          navigate('/payment');
        }
        catch (error: any) {
          const notify = () => toast.error("Error ");
          notify();
        }
      }
      else {
        const notify = () => toast.error("please select products add to cart");
        notify();
      }
    }
  }, [paystatus]);

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <div className='bg-white'>
        <div className="max-w-6xl m-auto flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-2xl font-bold text-gray-800">Checkout</a>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a href="/shop"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a href="/cart"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Cart</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a href="/checkout"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" >2</a>
                  <span className="font-semibold text-gray-900">Checkout</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className=" max-w-5xl m-auto flex justify-between gap-3 mt-3 sm:px-10 lg:grid-cols-2 lg:px-10 xl:px-10">
        <div className="w-2/5 px- pt-8  bg-white">
          <p className="text-xl font-medium px-4">Product order</p>
          <div className="mt-8 space-y-3 rounded-lg bg-white px-2 py-4 sm:px-6">

            {cart.length > 0 && cart.map((item) => {
              return (
                <div key={item.id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.tbl_version.image} alt="" />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.tbl_product.product_Name} {item.tbl_version.version_Name}</span>
                    <span className="float-right text-gray-400">Quantity: {item.quantity}</span>
                    <p className="text-lg font-bold">$ {item.quantity * item.tbl_version.price}</p>
                  </div>
                </div>
              )
            })}
            {
              cart.length == 0 && <p> No product</p>
            }
          </div>
        </div>
        <div className="w-3/5 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>

          <div className="">
            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
              <input type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                value={formData?.email}
                readOnly
                onChange={handleChange}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
                  <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>

              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Name</label>
            <div className="relative">
              <input type="text"
                id="name" name="full_Name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                value={formData?.name}
                onChange={handleChange}
                readOnly  
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>

              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Address</label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                value={formData?.address}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your address here"
                onChange={handleChange}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6  text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Phone</label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData?.phone}
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Phone"
                  onChange={handleChange}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5  text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>

                </div>
              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Method pay </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <select
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                  name="method"
                  value={formData.method}
                >
                  <option>--- Select ---</option>
                  <option value="paypal">Paypal</option>
                </select>
              </div>
            </div>

            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">$ {subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$ 0</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">$ {subTotal}</p>
            </div>
          </div>
          <div className='mt-5'> 
          </div>
          <PayPalButtons
            style={{
              layout: "horizontal",
              height: 48,
            }}
            createOrder={(data, actions) => {
              {
                console.log(data);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: '2000', // Sử dụng giá trị totalAmount ở đây
                      },
                      description: `Purchase at ${new Date().toLocaleString()}`,
                    },
                  ],
                });
              }
            }}
            onApprove={(_, actions): any => {
              return actions.order
                ?.capture()
                // .then(() => handlePaymentSuccess());
                .then(() => clickOrder());
            }}
          />
        </div>
      </div>

    </>
  );
};
export default CheckoutComponent