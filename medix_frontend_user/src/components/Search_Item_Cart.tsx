import { useContext, useState } from "react";
import { productModel } from "../redux/dataType"
import { authContext } from "../context/AuthProvider";
import { useAppDispatch } from "../redux/store";
import { AxiosResponse } from "axios";
import { addToCart, getCartTotal } from "../redux/slice/cartSlice";
import axios from "../api/axios";
import Toast from "./Toast";
import ScrollToTop from "./ScrollToTop";

interface productValueProps {
  product: productModel
}
const Search_Item_Cart = ({product}: productValueProps) => {

  const [isLoading, setIsLoading] = useState(false)
    const [isAddedToCart, setIsAddedToCart] = useState<AxiosResponse>();
    const {setCartLoading} = useContext(authContext);
    const productDispatch = useAppDispatch();

  const addToCartHandler = async (e: any) => {

    e.preventDefault();
    const customerId = sessionStorage.getItem('userId')

    const productDetails = {
        productId: product?._id,
        productName: product?.productName,
        productPrice: product?.Price,
        productQuantity: 1,
        productImage: product?.productImageDetails?.ImageURL
    }
    setCartLoading(true)
    setIsLoading(true)
    isAddedToCart && setIsAddedToCart(undefined)
    productDispatch(addToCart(productDetails))
    productDispatch(getCartTotal())
    await axios.post(`/cart/create_cart/${customerId}`, productDetails)
    .then(response => {
            response.status === 200 && setIsAddedToCart(response);
            setCartLoading(false);
            setTimeout(() => {
                setIsAddedToCart(undefined);
            }, 6000);
            setIsLoading(false)

        }).catch(error => {
            console.log(error);
        })
}
    
  return (
    <div className="md:flex m-5 max-w-[280px] md:max-w-[100%]">
      <ScrollToTop/>
      {isAddedToCart?.status === 200 && <Toast toastMessage="Product Added to cart successfully" />}
        <section className="flex md:float-left justify-center">
          <img src={product?.productImageDetails?.ImageURL} alt="search result images" className="  md:mr-5 h-[260px] w-[240px] border-2 object-cover object-center" />
        </section>

        <section className=" md:ml-12 md:w-[70%] flex flex-col justify-center items-center md:block">
          <h2 className='font-semibold text-slate-700 text-[16px] md:h-10 my-2 leading-5 px-1 hover:text-orange-700 cursor-pointer'>{product.productName}</h2>
          <div className="price_segment flex items-center justify-start my-2">

            <div className=" flex flex-row md:my-[3px]">
              <p className=' self-start px-1 text-slate-500'>Rs: </p>
              <p className=' md:text-3xl text-2xl '>{product?.Price}</p>
            </div>

            <div className=" relative mx-2 md:h-7  flex items-center" >
              <hr className='absolute h-[1px] w-[100%] top-[50%] border-0  bg-black z-10' />
              <p className='relative  text-sm text-slate-500'>Rs: 400</p>
            </div>

          </div>

          <div className="w-full flex justify-center my-3 max-w-[240px] md:max-w-[300px]">
                <button className='mx-1 bg-slate-100 text-slate-500  w-[100%]  py-2 bottom-2 border-2 hover:bg-slate-200
                transition ease-in-out duration-200 font-semibold md:text-[18px] text-[16px]
                '>Buy</button>
               <button className=' mx-1 bg-green-500  w-[100%]  py-2 bottom-2 text-white font-semibold md:text-[18px] text-[16px]
                transition ease-in-out duration-200 hover:bg-green-500/70
                 ' onClick={(e) => addToCartHandler(e)} disabled = {isLoading || isAddedToCart ? true: false}>{isLoading ? "Adding to cart..." : isAddedToCart?.status === 200 ? "Added to cart" : "Add to cart"}</button>
            </div>
        </section>

      </div>
  )
}

export default Search_Item_Cart