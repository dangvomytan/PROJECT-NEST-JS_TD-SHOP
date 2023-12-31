import React, { useEffect, useState } from 'react'
import { IUser } from '../../models/user.Model';
import { ICart } from '../../models/cart.Model';
import { ICartItem, cartItemApi } from '../../models/cartItem.Model';
import DeleteModal from '../modal/Delete.Modal.ts/Delete.Modal';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const CartComponent: React.FC = () => {

  const [cart, setCart] = useState<ICart[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false)
  const [itemDel, setItemDel] = useState({})

  const navigate = useNavigate();

  const userLogin: IUser | null = JSON.parse(localStorage.getItem('userLogin') || 'null');

  if (userLogin === null) {
    window.location.href = '/login';
  }
  // console.log(userLogin?.id);
 
  const handleCallData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataApi: any = await cartItemApi.getCartItemByUser(userLogin?.id) || null;
    setCart(DataApi);
  };
  useEffect(() => {
    handleCallData();
  }, []);


  // handle tang qty
  const clickIncrease = (item: ICart) => {
    const newQuantity = Number(item.quantity) + 1;
    const updateCart = cart?.map((product) => {
      if (product.id === item.id) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCart(updateCart);
    updateCartToServer(Number(item.id), newQuantity);
  }

  // handle giam qty
  const clickReduce = (item: ICart) => {
    const newQuantity = Number(item.quantity) - 1;
    if (newQuantity > 0) {
      const updateCart = cart?.map((product) => {
        if (product.id === item.id) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      setCart(updateCart);
      updateCartToServer(Number(item.id), newQuantity);
    } else {
      setModalOpen(true);
      setItemDel(item);
    }
  }

  //handle update quantity
  const updateCartToServer = async (id: number, qty: number) => {
    const itemUpdate = { id:id, quantity: qty };
    try {
      await cartItemApi.updateQuantiyCartItem(itemUpdate);
      handleCallData()
      const notify = () => toast.success("Successfully update !");
      notify();
    }
    catch (error: any) {
      const notify = () => toast.error("Update unsuccessful ");
      notify();
    }
  }


  //Dung userEffect de cap nhat subtotal
  useEffect(() => {
    let sumtotal = 0;
    if (cart.length > 0) {
      cart?.map((item) => {
        const price = Number(item.quantity) * Number(item.tbl_version.price); // Giá của CartItem
        sumtotal += price;
      })
      setSubTotal(sumtotal);
    }
  }, [cart])

  //set trang thai modal
  const setStatusModal = (status: boolean): void => {
    setModalOpen(status)
  }


  const clickDelete = (item: object) => {
    setModalOpen(true);
    setItemDel(item);
  }

 console.log(22,cart);
 
  //handle xoa item trong cart
  const handleDelCartItem = async (item: ICartItem) => {
    const itemId = item.id;
    try {
      await cartItemApi.deleteCartItem(itemId);
      handleCallData()
      const notify = () => toast.success("Successfully deleted !");
      notify();
    }
    catch (error: any) {
      const notify = () => toast.error("Delete unsuccessful ");
      notify();
    }
  }


  const clickCheckOut = () => {
    if (cart.length === 0) {
      const notify = () => toast.error("please select products add to cart");
      notify();

    }
    else {
      navigate('/checkout');
    }
  }



  return (
    <>
      <DeleteModal
        itemDel={itemDel}
        modalOpen={modalOpen}
        setStatusModal={setStatusModal}
        handleDelCartItem={handleDelCartItem}
      />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <section className="h-screen bg-gray-100 py-0">
        <div className='bg-white'>
          <div className="max-w-6xl m-auto flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <a href="/cart" className="text-2xl font-bold text-gray-800">Cart</a>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
              <div className="relative">
                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" 
                    href="/shop"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </a>
                    <span className="font-semibold text-gray-900">Shop</span>
                  </li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                    <span className="font-semibold text-gray-900">Cart</span>
                  </li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                    <span className="font-semibold text-gray-500">Checkout</span>
                  </li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">4</a>
                    <span className="font-semibold text-gray-500">Payment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {
                      cart?.length > 0 && cart?.map((item) => {
                        return (
                          <li key={item.id}
                            className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                            <div className="shrink-0">
                              <img className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={item.tbl_version.image} alt="" />
                            </div>

                            <div className="relative flex flex-1 flex-col justify-between">
                              <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                <div className="pr-8 sm:pr-5">
                                  <p className="text-base font-semibold text-gray-900">{item.tbl_product.product_Name} {item.tbl_version.version_Name}</p>
                                  {/* <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p> */}
                                </div>

                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                  <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${Number(item.quantity) * Number(item.tbl_version.price)}</p>

                                  <div className="sm:order-1">
                                    <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                      <button onClick={() => clickReduce(item)}
                                        className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                                      <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                                      <button onClick={() => clickIncrease(item)}
                                        className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button onClick={() => clickDelete(item)}
                                  type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                    {
                      cart?.length == 0 && <li className='mt-3'>No product</li>
                    }
                  </ul>
                </div>

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">${cart?.length > 0 ? subTotal : 0}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$0</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span> {cart?.length > 0 ? subTotal : 0}</p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => clickCheckOut()}
                    type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}

export default CartComponent