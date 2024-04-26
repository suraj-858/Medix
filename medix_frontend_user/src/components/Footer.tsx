import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
const Footer = () => {
  return (
    <footer className="md:h-[400px] bottom-0 w-[100%] bg-slate-800  pt-12 text-slate-500">
      <section className="flex md:flex-row flex-col  md:justify-evenly md:px-0 px-10 w-full">
      <div>
        <h1 className="md:text-2xl font-semibold text-slate-300 my-1">Menu</h1>
        <hr className=" border-0 h-[1px] bg-slate-400 my-1 lg:min-w-[250px]" />
        <ul>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Recent Launch</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Shipping</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Affiliate Marketing</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Sales</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Sponsorship</li>

        </ul>
      </div>
      <div>
        <h1 className="md:text-2xl font-semibold text-slate-300 my-1" >Company</h1>
        <hr className=" border-0 h-[1px] bg-slate-400 my-1 lg:min-w-[250px]" />
        <ul>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Top Brands</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Distribution</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Patnerships</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Sell with us</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Branches</li>

        </ul>
      </div>
      <div>
        <h1 className="md:text-2xl font-semibold text-slate-300 my-1">Contact us</h1>
        <hr className=" border-0 h-[1px] bg-slate-400 my-1 lg:min-w-[250px]" />
        <ul>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Contact Sales</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">About us</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Future agenda</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">FAQs</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Payments</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Privacy Policy</li>
          <li className="my-1 hover:text-orange-500 transition duration-500 ease-in-out cursor-pointer">Terms & Conditions</li>

        </ul>
      </div>

      <div>
        <h1 className="md:text-2xl font-semibold text-slate-300 my-1">Social Handles</h1>
        <hr className=" border-0 h-[1px] bg-slate-400 my-1 " />
        <ul className="flex justify-center items-center">
          <li className=" cursor-pointer text-3xl border-2 border-slate-400 rounded-[50%] px-2 py-2 m-2 hover:scale-105 hover:text-blue-500 hover:border-blue-500 hover:shadow-[0px_0px_8px_4px_rgba(33,150,243,0.7)] transition duration-400 ease-in-out"><FaFacebook /></li>

          <li className=" cursor-pointer text-3xl border-2 border-slate-400 rounded-[50%] px-2 py-2 m-2 hover:scale-105 hover:text-white hover:border-white hover:bg-black hover:shadow-[0px_0px_8px_8px_rgba(0,0,0,0.7)] transition duration-400 ease-in-out"><FaXTwitter /></li>
        </ul>

        <ul className="flex justify-center items-center">
        <li className=" hover:text-pink-500 cursor-pointer text-3xl border-2 border-slate-400 rounded-[50%] px-2 py-2 m-2 hover:scale-105 hover:border-pink-500 hover:shadow-[0px_0px_8px_4px_rgba(233,30,99,0.7)] transition duration-400 ease-in-out"><RiInstagramFill /></li>

          <li className=" cursor-pointer text-3xl border-2 border-slate-400 rounded-[50%] px-2 py-2 m-2 hover:scale-105 hover:text-blue-500 hover:border-blue-500 hover:shadow-[0px_0px_8px_4px_rgba(33,150,243,0.7)] transition duration-400 ease-in-out"><FaLinkedin/></li>
        </ul>
      </div>
      </section>

      <hr className=" border-0 h-[1px] bg-slate-400 my-1 mt-12" />
      <section className=" flex justify-center items-center h-[50px]">
      <p className="">Copyright &#169; 2024 Veda Traders. All Right Reserved</p>
      </section>
      

    
    </footer>

  )
}

export default Footer