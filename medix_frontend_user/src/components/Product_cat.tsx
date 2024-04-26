
import { useNavigate } from "react-router-dom";
import { singleProductsType } from "../Types/authType";
import { useContext, useState } from "react";
import axios from "../api/axios";
import Toast from "./Toast";
import { AxiosResponse } from "axios";
import { authContext } from "../context/AuthProvider";
import { useAppDispatch } from "../redux/store";
import { addToCart, getCartTotal } from "../redux/slice/cartSlice";


interface product_catProps {
    product: singleProductsType
}

const Product_cat = ({ product }: product_catProps) => {

    const navigate = useNavigate();
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
        <div className='md:max-h-[480px] md:max-w-[360px] bg-white
            h-auto min-w-[180px] md:w-[340px] w-[280px] m-2 p-1 relative md:flex-shrink-0'>
            {isAddedToCart?.status === 200 && <Toast toastMessage="Product Added to cart successfully" />}

            {product?.Discount !== "" ?
                <div className=' rounded-ss-md absolute text-white bg-red-600  py-1 pl-2 pr-6 rounded-ee-[40px]'>{product?.Discount}</div>
                : <></>}
            <div className="md:h-[260px] h-[200px] w-full rounded-md">
                <img src={product?.productImageDetails?.ImageURL} alt="" className="h-full w-full object-center object-cover" />

            </div>
            <h2 className='font-semibold text-slate-700 text-[16px] md:h-10 my-2 leading-5 px-1 hover:text-orange-700 cursor-pointer'

                onClick={() => {
                    navigate(`/costumer/product_page/${product?._id}`, { state: { ...product } })
                }}
            >{product?.productName}</h2>
            <div className="price_segment flex items-center justify-start my-2">

                <div className=" flex flex-row md:my-[3px]">
                    <p className=' self-start px-1 text-slate-500'>Rs: </p>
                    <p className=' md:text-3xl text-2xl '>{product?.Price}</p>
                </div>

                <div className=" relative mx-2 md:h-7  flex items-center" >
                    <hr className='absolute h-[1px] w-[100%] top-[50%] border-0  bg-black z-10' />
                    <p className='relative  text-sm text-slate-500'>Rs: {product?.Price}</p>
                </div>

            </div>
            {/* <div className="  px-2 flex justify-between md:my-4 my-1 items-start ">

               <p className="text-slate-500 flex flex-wrap">{supplierCompany}</p>
               
                <p className={` ${stockLeft !== 0 ? "bg-green-200/50 text-green-600": "bg-red-200/50 text-red-600 text-sm"} py-1 px-1 md:px-2 font-semibold rounded-sm flex justify-center items-center flex-wrap md:text-[18px] text-[16px] w-fit`}>{stockLeft === 0 ? "No Stock": `${stockLeft} left`}</p>
            </div> */}  


            <div className="w-full flex justify-center my-3">
                <button className='mx-1 bg-slate-100 text-slate-500  w-[100%]  py-2 bottom-2 border-2 hover:bg-slate-200
                transition ease-in-out duration-200 font-semibold md:text-[18px] text-[16px]
                '>Buy</button>
                <button className=' mx-1 bg-green-500  w-[100%]  py-2 bottom-2 text-white font-semibold md:text-[18px] text-[16px]
                transition ease-in-out duration-200 hover:bg-green-500/70
                 ' onClick={(e) => addToCartHandler(e)} disabled = {isLoading || isAddedToCart ? true: false}>{isLoading ? "Adding to cart..." : isAddedToCart?.status === 200 ? "Added to cart" : "Add to cart"}</button>
            </div>

        </div>
    )
}

export default Product_cat