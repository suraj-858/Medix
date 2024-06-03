import {  useRef, useState } from "react";
import { cartItemProps } from "../Types/authType";
import { useAppDispatch } from "../redux/store";
import { removeCart, updateQuantity } from "../redux/slice/cartSlice";
import Toast from "./Toast";
import { AxiosResponse } from "axios";
import axios from "../api/axios";

interface selectedArrayPropsType {
    productItem: cartItemProps;
}

const Cart_ItemHolder = ({ productItem }: selectedArrayPropsType) => {

    const [successMessageCarrier, setSuccessMessageCarrier] = useState<AxiosResponse<any | any> | undefined>(undefined)
    const [quantities, setQuantities] = useState(productItem?.productQuantity);
    const thisPrice = parseFloat(productItem.productPrice);
    const [isloading, setisloading] = useState(false)
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const userId = sessionStorage.getItem('userId')
    const cartDispatch = useAppDispatch();
    const quantityRef = useRef<any>();



    const updateCartQuantityHandler = async (productItem: cartItemProps) => {

        setisloading(true)
        cartDispatch(updateQuantity({ productId: productItem?.productId, productQuantity: quantities}))
        await axios.post(`/cart/update_cart_quantity/${userId}`, { productId: productItem?.productId, productQuantity: quantities})
            .then(response => {
                if (response.status === 200) {
                    setisloading(false)
                    setSuccessMessageCarrier(response)
                }
                setTimeout(() => {
                    setSuccessMessageCarrier(undefined)
                }, 6000);
            })
            .catch(error => { console.log(error); })
        

    }

    const handleRemoveCartItem = async(productId: string) =>{
        
        setIsLoadingRemove(true)
        cartDispatch(removeCart({productId: productId}))
        successMessageCarrier && setSuccessMessageCarrier(undefined)
        await axios.post(`/cart/remove_cart_item/${userId}`, {productId: productId})
        .then(response =>{
            if(response.status === 200){
                setIsLoadingRemove(false)
                setSuccessMessageCarrier(response)
            }
            setTimeout(() => {
                setSuccessMessageCarrier(undefined)
            }, 6000);
        }).catch(error =>{ console.log(error);
            
        })
    }

    return (
        <div>
            {!isloading && successMessageCarrier?.status === 200 && <Toast toastMessage={successMessageCarrier?.data?.message} />}

            {productItem !== undefined ? 
                    <section  className="w-[100%] my-2">
                        <div className="grid grid-cols-6 md:gap-10 w-[100%]">
                            <div className="md:col-span-3 col-span-2 flex justify-start my-5">
                                <img src={productItem.productImage} alt="" className="h-[100px] w-[100px] hidden md:block" />
                                <div className="md:ml-4 text-sm md:text-lg">
                                    <h1 className="py-1">{productItem.productName}</h1>
                                    <p className="py-1 md:block hidden">orderId: {productItem._id}</p>

                                    <div className="flex md:flex-row flex-col justify-start  md:justify-between max-w-[200px]">
                                    <button className="py-1 px-3 bg-red-100 text-red-500 font-semibold rounded-md mb-2 md:mb-0"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            handleRemoveCartItem(productItem?.productId)
                                        }}>{isLoadingRemove ? "Removing...":"Remove"}</button>
                                    <button className="py-1 px-3 bg-green-100 text-green-500 font-semibold rounded-md " onClick={async (e) => {
                                        e.preventDefault();
                                        successMessageCarrier === undefined && updateCartQuantityHandler(productItem)

                                    }} disabled = {isloading} >{isloading ? "Updating..." : !isloading && successMessageCarrier?.status === 200 ? "Updated": "Update"}</button>

                                    </div>
                                    
                                </div>
                            </div>

                            <div className="col-span-1 flex items-center justify-center">
                                <input
                                    ref={quantityRef}
                                    min={1}
                                    max={100}
                                    value={quantities}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        successMessageCarrier && setSuccessMessageCarrier(undefined)
                                        const newQuantity = parseInt(e.target.value);
                                        const validQuantity = isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity;
                                        setQuantities(validQuantity);
                                    }}
                                    className="md:text-base text-sm md:w-[100px] rounded-md border-[3px] border-slate-200 md:px-1 outline-none h-10 text-md text-center"
                                    type="number"
                                />
                            </div>

                            <div className="md:col-span-1 col-span-2 flex items-center justify-center">
                                <h1 className="text-slate-500 md:text-base text-sm">{thisPrice}</h1>
                            </div>

                            <div className="col-span-1 flex items-center justify-end">
                                <h1 className="text-slate-500 md:text-base text-sm md:mr-5">{quantities * thisPrice}</h1>
                            </div>
                        </div>
                        <hr />
                    </section>
                
             : <><div className="">
                <h1>No Items in cart</h1>
            </div></>}
        </div>
    );
};

export default Cart_ItemHolder;
