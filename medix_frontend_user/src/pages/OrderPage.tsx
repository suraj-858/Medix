import ContentWrapper from "../components/ContentWrapper"
import { FaLocationDot } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";


const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <div className=" lg:w-[80%] w-full mx-auto min-h-[500px]">
        <div className="my-5">
          <div className="flex justify-between">
            <div className="flex md:flex-row flex-col justify-between md:w-[60%] ">
            <h3 className=" lg:text-lg md:text-base text-sm font-semibold mb-2 md:mb-0">{location.pathname === "/costumer/order" ? "Orders on progress" : "Order History"}</h3>
            <h3 className={`flex justify-center items-center cursor-pointer  ${location.pathname === "/costumer/order" ? "flex" : "hidden"}`}
              onClick={(e) => {
                e.preventDefault();
              }}>

              <span className="md:mx-4 text-gray-500"><FaLocationDot size={20} /></span>Bhaktapur, Radhe Radhe</h3>

            </div>
            
            <span className="mr-4 cursor-pointer" onClick={(e) => {
              e.preventDefault();
              if (location.pathname === "/costumer/order" || location.pathname === '/dashboard_editor/order') {
                
                navigate('order_history')
              }
              else {
                navigate('')
              }

            }}>{location.pathname === "/costumer/order" ? <FaHistory size={25} /> : <MdOutlineShoppingCartCheckout size={25} />
              }</span>
          </div>
          <hr className=" h-[2px] w-[100%] my-2 border-0 bg-slate-400/60" />
        </div>

        <Outlet />

      </div>
    </ContentWrapper>
  )
}

export default OrderPage