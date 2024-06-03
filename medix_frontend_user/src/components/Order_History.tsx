import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/store";
import noProduct from '../assets/Images/noProduct.jpg';


const Order_History = () => {

  const navigate = useNavigate();
  const { orderData } = useAppSelector(state => state.getOrder)
  

  return (
    <div className="">
      {orderData.length !== 0 ?

        <table className=" md:w-[90%] w-[100%] mx-auto my-6 ">
          <th className=" py-2 border-[3px] border-blue-500 bg-blue-500 text-white">SN</th>
          <th className="border-[3px] py-3 border-blue-500 bg-blue-500 text-white">order_Id</th>
          <th className="border-[3px]  border-blue-500 bg-blue-500 text-white">Products</th>
          <th className="border-[3px]  border-blue-500 bg-blue-500 text-white">Quantity</th>
          <th className="border-[3px]  border-blue-500 bg-blue-500 text-white">Total Price</th>
          <th className="border-[3px]  border-blue-500 bg-blue-500 text-white">State</th>

          {orderData?.map((order, Index) => {
            let summedQuantity = 0;
            let summedTotalPrice = 0;
            order.productDetails.forEach(product => {
              summedQuantity += product?.productQuantity
              summedTotalPrice += product.productPrice
            })

            return (
              <tr key={Index} className="text-center border-[3px] py-2 
                        cursor-pointer hover:bg-slate-200 hover:transition
                         duration-150 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/costumer/order', {state: [order]})

                }}
              >
                <td className=" py-4">{Index + 1}</td>
                <td className="">{order?._id.slice(18, 24)}</td>
                <td className="">{order.productDetails.length}</td>
                <td className="">{summedQuantity}</td>
                <td className="">{summedTotalPrice}</td>
                <td className={`${order.state === "delivered" ? " text-green-500": order.state === "canceled" ? "text-red-500": "text-blue-500"}`}>{order?.state}</td>
              </tr>
            )
          })}

        </table> :
        <img className=" max-h-[500px] w-full m-4 object-contain object-center" src={noProduct} alt="" />

      }


    </div>
  )
}

export default Order_History