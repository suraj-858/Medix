import Logo from '../../assets/Images/Revenue.png'
import Sold from '../../assets/Images/sold-stamp-3-1024x795.png'
import Rating from '../../assets/Images/Rating.png'
import Pending from '../../assets/Images/download.png'
import { FaDollarSign } from "react-icons/fa";

const Upper = () => {
  return (
    <section className="grid lg:grid-cols-4  gap-2 my-5 px-2  md:grid-cols-2 text-white">
        <div className=" border-2 rounded-md h-[100px] flex items-center  justify-evenly bg-gradient-to-r from-red-500 to-yellow-400 ">
          <span className='flex justify-center items-center'>
            <img src = {Logo} alt="" height={40} width={40} />
            <h1 className="lg:text-2xl text-xl px-1  ">Revenue:</h1>
          </span>
          <h1 className="lg:text-2xl text-xl flex justify-center items-center"><FaDollarSign/> 5234</h1>
        </div>
        <div className=" border-2 rounded-md h-[100px] flex items-center  justify-evenly bg-gradient-to-r from-yellow-400 to-green-400">
          <span className='flex justify-center items-center'>
            <img src = {Sold} alt="" height={40} width={40} />
            <h1 className="lg:text-2xl text-xl px-1  ">Total Sales:</h1>
          </span>
          <h1 className="lg:text-2xl text-xl flex justify-center items-center"> 312</h1>
        </div>

        <div className=" border-2 rounded-md h-[100px] flex items-center justify-evenly bg-gradient-to-r from-green-400 to-blue-400">
          <span className='flex justify-center items-center'>
            <img src = {Rating} alt="" height={40} width={40} />
            <h1 className="lg:text-2xl text-xl px-1  ">Rating</h1>
          </span>
          <h1 className="lg:text-2xl text-xl flex justify-center items-center">4.0</h1>
        </div>

        <div className=" border-2 rounded-md h-[100px] flex items-center justify-evenly bg-gradient-to-r from-blue-400 to-red-500">
          <span className='flex justify-center items-center'>
            <img src = {Pending} alt="" height={30} width={30} className='rounded-[50%]' />
            <h1 className="lg:text-2xl text-xl px-1  ">Pending:</h1>
          </span>
          <h1 className="lg:text-2xl text-xl flex justify-center items-center">39</h1>
        </div>

    </section>
  )
}

export default Upper