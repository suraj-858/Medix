import Cart_ItemHolder from "../components/Cart_ItemHolder";
import ContentWrapper from "../components/ContentWrapper";
import { useContext, useMemo, useState } from "react";
import {  useAppDispatch, useAppSelector } from "../redux/store";
import ScrollToTop from "../components/ScrollToTop";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import gifLoader from '../assets/Images/Successfully_Done.gif'
import { authContext } from "../context/AuthProvider";
import { addRecentOrder } from "../redux/slice/orderSlice";
import noCartItem from "../assets/Images/empty_cart.png"

const CartPage = () => {

  const userId = sessionStorage.getItem('userId')
  const { userCart, totalPrice, totalQuantity} = useAppSelector(state => state.createCart);
  const memonizedMainUserCart = useMemo(() => userCart, [userCart])
  const [isLoading, setIsLoading] = useState(false);
  const {setIsOrderPlaced, isOrderPlaced} = useContext(authContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const handleOrderPlaced = async() =>{
    
    setIsLoading(true);
    await axios.post(`/order/createOrder/${userId}`, {
      cartArrayDetails:memonizedMainUserCart, 
      deliveryAddress: "Kathmandu"

    }).then(response =>{
      response && setIsLoading(false)
      response && setIsOrderPlaced(true)
      const createdOrder = response?.data?.response
      dispatch(addRecentOrder(createdOrder))

    }).catch(error =>{
      error && setIsLoading(false)
    })

    setTimeout(() => {
      setIsOrderPlaced(false)
      navigate('/costumer/order')
    }, 3000);
  }
  
  return (
    <ContentWrapper>
      <div className=" mt-6 md:mx-0 lg:px-5 flex w-[100%]  lg:justify-evenly flex-wrap">
        { isOrderPlaced && <img className="absolute w-[100%] h-[100%] object-contain object-center z-10" src={gifLoader}/>}
        <ScrollToTop/>
        <div className=" lg:w-[70%] w-full">
          <div>
            <div className="flex justify-between">
              <h1 className=" lg:text-[26px] md:text-[22px] text-[18px] font-semibold">Shoping Cart</h1>
              <h1 className="lg:text-[26px] md:text-[22px] text-[18px] font-semibold mx-5">{totalQuantity} items</h1>
            </div>
            <hr className=" h-[2px] my-2 border-0 bg-slate-400/60" />
          </div>
        {memonizedMainUserCart.length >= 1 ? 
                  <section className="mb-10">
                  <div className=" w-[100%]">
                    <div className=" grid grid-cols-6 gap-10 font-semibold">
                      <h1 className="md:col-span-3 col-span-2 lg:text-xl md:text-base text-sm ">Name</h1>
                      <h1 className="col-span-1 lg:text-xl md:text-base text-sm justify-center flex">Quantity</h1>
                      <h1 className="md:col-span-1 col-span-2 lg:text-xl md:text-base text-sm justify-center flex ">price</h1>
                      <h1 className="col-span-1 lg:text-xl md:text-base text-sm justify-end hidden md:flex ">sub total</h1>
                      <h1 className="col-span-1 lg:text-xl md:text-base text-sm justify-end md:hidden  flex">s-total</h1>

                    </div>
      
                    {memonizedMainUserCart && memonizedMainUserCart.map((product, productIndex) =>{
                      return <div key={productIndex}><Cart_ItemHolder productItem  = {product}/></div>
                    })}
                    
                  </div>
      
                  <hr className=" h-[2px] my-2 border-0 bg-slate-400/60" />
                  <div className=" justify-between flex w-[100%]items-center ">
                    <h2 className="md:text-base text-sm font-semibold text-slate-500">Total</h2>
                    <h2 className="md:text-base text-sm font-semibold mr-5 text-slate-600">Rs: {totalPrice}</h2>
                  </div>
                </section>
                :
                <img className=" max-h-[500px] w-full m-4 object-contain object-center" src={noCartItem} alt="" />
        }

        </div>


        <section className="lg:w-[26%] md:w-[45%] w-[100%] max-w-[450px] md:min-w-[450px] mx-auto md:my-5 border-[2px] border-slate-200
        h-[600px] bg-blue-800 rounded-md p-5 text-slate-300 md:text-base text-sm flex flex-col items-center">
          <h1 className=" md:text-xl text-md font-semibold py-3 text-white">Summary</h1>
          <hr className="border-0 h-[1px] w-[100%] bg-slate-400" />
          <div className="flex justify-between items-center px-2 mt-5 mb-2 w-[100%]" >
            <h1 className="">Sub Total</h1>
            <h1 className="">Rs: {totalPrice.toFixed(2)}</h1>
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-[100%]" >
            <h1 className="">Tax</h1>
            <h1 className="">Rs: {(totalPrice * 0.13).toFixed(2)}</h1>
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-[100%]" >
            <h1 className="">Shipping Charge</h1>
            <h1 className="">Rs: {totalPrice === 0 || NaN ? 0: 150.00}</h1>
          </div>
          <hr className="border-0 h-[1px] bg-slate-400 my-4 w-[100%]" />

          <div className="flex justify-between px-2 mb-6 w-[100%]">
            <h1 className="">Amount:</h1>
            <h1 className="">Rs: {(totalPrice + totalPrice * 0.13 + 150).toFixed(2)}</h1>
          </div>
          <p className="my-1 text-sm">Apply Discount Token</p>
          <div className="flex justify-center relative max-w-[400px] w-[100%]">
            <input type="text" className=" px-3 h-12 w-[100%] rounded-3xl" placeholder="Coupon Code" />
            <button className=" text-center absolute right-0 border-[2px]  text-white bg-green-500 px-4 h-12 text-md rounded-3xl">Apply</button>
          </div>

          <div className="flex 
           justify-center mt-6 mb-2 w-[100%] max-w-[400px]">
            <button className="bg-green-500 md:text-base  text-sm
          font-semibold text-white h-12 rounded-3xl w-[100%]"
          disabled = {memonizedMainUserCart.length >= 1 ? false : true}
          onClick={async(e) =>{
            e.preventDefault();
            handleOrderPlaced()
          }}

          >{isLoading ? ( <div className="flex justify-center items-center">Checking out... 
          <span className="mx-4"><Loader/></span>
          </div>): isOrderPlaced ? "Order Placed" : "Proceed to check out"}</button>
          </div>
          <p>or</p>
          <div>

          </div>
        </section>


      </div>
    </ContentWrapper>
  )
}

export default CartPage