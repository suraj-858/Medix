import Cart_ItemHolder from "../components/Cart_ItemHolder";
import ContentWrapper from "../components/ContentWrapper";
import { useMemo } from "react";
import {  useAppSelector } from "../redux/store";


const CartPage = () => {

  const { userCart, totalPrice, totalQuantity} = useAppSelector(state => state.createCart);
  const memonizedMainUserCart = useMemo(() => userCart, [userCart])
  console.log(userCart);
  

  return (
    <ContentWrapper>
      <div className="leading-14 md:mt-6 mt-6 md:mx-0 px-2 lg:px-5 flex w-[100%] lg:flex-row flex-col lg:justify-evenly">
        <div className=" lg:w-[70%] w-full">
          <div className="">
            <div className="flex justify-between">
              <h1 className=" lg:text-[32px] md:text-[27px] text-[22px] font-semibold">Shoping Cart</h1>
              <h1 className=" lg:text-[32px] md:text-[27px] text-[22px] font-semibold mx-5">{totalQuantity} items</h1>
            </div>
            <hr className=" h-[2px] my-2 border-0 bg-slate-400/60" />
          </div>

          <section className="mb-10">
            <div className=" w-[100%]">
              <div className=" grid grid-cols-6 gap-10 font-semibold">
                <h1 className="col-span-3 text-md lg:text-xl ">Product details</h1>
                <h1 className="col-span-1 text-md lg:text-xl justify-center flex">Quantity</h1>
                <h1 className="col-span-1 text-md lg:text-xl justify-center flex">price</h1>
                <h1 className="col-span-1 text-md lg:text-xl justify-end mr-5 flex">sub total</h1>
              </div>

              {memonizedMainUserCart && memonizedMainUserCart.map((product, productIndex) =>{
                return <div key={productIndex}><Cart_ItemHolder productItem  ={product}/></div>
              })}
              
            </div>

            <hr className=" h-[2px] my-2 border-0 bg-slate-400/60" />
            <div className=" justify-between flex w-[100%]items-center ">
              <h2 className="md:text-2xl text-xl font-semibold text-slate-500">Total</h2>
              <h2 className="md:text-2xl text-xl font-semibold mr-5 text-slate-600">Rs: {totalPrice}</h2>
            </div>
          </section>
        </div>


        <section className="lg:w-[26%] md:w-[45%] w-[100%] md:mx-auto md:my-5 lg:ml-5 border-[2px] border-slate-200
        h-[600px] bg-blue-800 rounded-md p-5 text-slate-300 md:text-xl flex flex-col items-center sticky">
          <h1 className=" md:text-3xl text-xl font-semibold py-3 text-white">Summary</h1>
          <hr className="border-0 h-[1px] w-[100%] bg-slate-400" />
          <div className="flex justify-between items-center px-2 mt-5 mb-2 w-[100%]" >
            <h1 className="">Sub Total</h1>
            <h1 className="">Rs: 459900</h1>
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-[100%]" >
            <h1 className="">Tax</h1>
            <h1 className="">Rs: 459</h1>
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-[100%]" >
            <h1 className="">Shipping Charge</h1>
            <h1 className="">Rs: 459</h1>
          </div>
          <hr className="border-0 h-[1px] bg-slate-400 my-4 w-[100%]" />

          <div className="flex justify-between px-2 mb-6 w-[100%]">
            <h1 className="">Amount:</h1>
            <h1 className="">Rs: 459000</h1>
          </div>
          <p className="my-1 text-sm">Apply Discount Token</p>
          <div className="flex justify-center relative max-w-[400px] w-[100%]">
            <input type="text" className=" px-3 h-12 w-[100%] rounded-3xl" placeholder="Coupon Code" />
            <button className=" text-center absolute right-0 border-[2px]  text-white bg-green-500 px-4 h-12 text-md rounded-3xl">Apply</button>
          </div>

          <div className="flex 
           justify-center mt-6 mb-2 w-[100%] max-w-[400px]">
            <button className="bg-green-500 md:text-xl  text-md
          font-semibold text-white h-12 rounded-3xl w-[100%]">Proceed to checkout</button>
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