import Order_Progress from "../components/Order_Progress";
import { useAppDispatch, useAppSelector } from "../redux/store";
import axios from "../api/axios";
import { removeRecentProduct } from "../redux/slice/orderSlice";
import noProduct from '../assets/Images/noProduct.jpg';
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { recentOrderTypes } from "../Types/authType";
import isCanceledImagePrev from '../assets/Images/order_canceled.png'

type stateHandlerProps = {
    state: string,
    orderId: string
}

const Recent_Order = () => {
    var progressValue = 0;
    const { recentOrder } = useAppSelector(state => state?.getOrder);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const memonizedOrderData: recentOrderTypes[] = useMemo(() => {
        if (location?.state?.length >= 1) {
            return location.state
        } else {
            return recentOrder
        }
    }, [recentOrder, location]);

    const stateHandler = async ({ state, orderId }: stateHandlerProps) => {
        await axios.post(`/order/updateOrders/${orderId}`, { state: state })
            .then(response => {
                if (response.status === 200) {
                    dispatch(removeRecentProduct(orderId));
                }
            }).catch(error => {
                console.log(error);
            });
    }

    const handleCancel = async (orderId: string) => {
        setIsLoading(orderId);
        await axios.post(`/order/updateOrders/${orderId}`, { state: "canceled" })
            .then(response => {
                if (response.status === 200) {
                    dispatch(removeRecentProduct(orderId));
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(null);
            });
    }

    return (
        <div>
            {memonizedOrderData?.length !== 0 && memonizedOrderData[0].state !== "canceled" ?
                memonizedOrderData?.map((singleOrder, index) => {
                    if (singleOrder?.state === "In Process") {
                        progressValue = 0;
                        setTimeout(() => {
                            stateHandler({ state: "delivered", orderId: singleOrder?._id });
                        }, 90000000);
                    } else progressValue = 100;

                    return (
                        <section key={index} >
                            <div className="flex justify-between mx-auto w-[90%]">
                                <h2 className="md:ml-16 text-center text-lg font-semibold">
                                    Order Id: <span className="font-normal">{singleOrder?._id.slice(18, 24)}</span>
                                </h2>
                                <button
                                    className={`bg-red-600 p-2 rounded-md text-white ${singleOrder.state !== "In Process" ? "hidden" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCancel(singleOrder?._id);
                                    }}
                                >
                                    {isLoading === singleOrder._id ? "Canceling..." : "Cancel"}
                                </button>
                            </div>

                            <section className="md:my-14 my-10">
                                <Order_Progress progressValue={progressValue} />
                                <ul className="mx-auto flex justify-between w-[83%] text-base text-gray-500">
                                    <li className="text-orange-600 font-semibold">Order Received</li>
                                    <li className={`${progressValue >= 33 ? "text-orange-600 font-semibold" : "text-gray-400"}`}>Order Ready to ship</li>
                                    <li className={`${progressValue >= 66 ? "text-orange-600 font-semibold" : "text-gray-400"}`}>Handed over shipping company</li>
                                    <li className={`${progressValue >= 99 ? "text-orange-600 font-semibold" : "text-gray-400"}`}>Delivered</li>
                                </ul>
                            </section>

                            <section className="my-10 w-[80%] mx-auto">
                                <div className="flex justify-between">
                                    <h2>Item List</h2>
                                    <h2>Total Quantity: {singleOrder?.productDetails?.length}</h2>
                                </div>
                                <hr className="h-[2px] w-[100%] my-2 border-0 bg-slate-400/60" />
                                {singleOrder?.productDetails?.map((product, index) => (
                                    <section key={index} className="md:w-[90%] w-[100%] my-1 mx-auto">
                                        <div className="grid grid-cols-6  w-[100%]">
                                            <div className="col-span-2 flex items-center my-5">
                                                <img src={product?.productImage} alt="product Images" className="h-[70px] w-[70px] hidden md:block object-cover object-center" />
                                                <div className="md:ml-4 text-sm md:text-base text-center">
                                                    <h1 className="py-1">{product.productName}</h1>
                                                </div>
                                            </div>

                                            <div className="col-span-2 flex items-center justify-center">
                                                <p className="text-slate-500 md:text-base text-md">Quantity: {product?.productQuantity}</p>
                                            </div>

                                            <div className="col-span-1 flex items-center justify-center">
                                                <h1 className="text-slate-500 md:text-base text-md">{product?.productPrice}</h1>
                                            </div>

                                            <div className="col-span-1 flex items-center justify-end">
                                                <h1 className="text-slate-500 md:text-base text-md md:mr-5">{product?.productQuantity * product?.productPrice}</h1>
                                            </div>
                                        </div>
                                        <hr />
                                    </section>
                                ))}
                            </section>
                        </section>
                    );
                })
                : <img className="max-h-[500px] w-full m-4 object-contain object-center" src={memonizedOrderData[0].state === "canceled" ? isCanceledImagePrev  : noProduct} alt="No Product" />
            }
        </div>
    )
}

export default Recent_Order;
