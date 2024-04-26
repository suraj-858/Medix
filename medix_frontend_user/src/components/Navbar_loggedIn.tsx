import { useEffect, useMemo, useRef } from 'react';
import Dropdown from './Dropdown'
import { BsCart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getCartTotal } from '../redux/slice/cartSlice';
import Loader from './Loader';


const Navbar_loggedIn = () => {

    const { userCart, totalQuantity, isLoading } = useAppSelector(state => state.createCart);
    const memonizedTotalQuantity = useMemo(() => totalQuantity, [totalQuantity])
    const cartDispatch = useAppDispatch();
    console.log(isLoading);
    
    useEffect(() => {
        cartDispatch(getCartTotal())
    }, [userCart, totalQuantity])

    const myInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className=' bg-blue-700 h-16 flex flex-row justify-evenly items-center sticky top-0 z-20 w-full'>
            <div className="h-12 w-12 bg-slate-400">
            </div>

            <div className="mx-1 w-[50%]  max-w-[800px] flex justify-center">
                <input ref={myInputRef} onChange={() => { console.log(myInputRef?.current?.value) }} 
                className='w-full h-12 rounded-l-md  px-4 outline-none ' type="text" placeholder='Search medicine' />
                <button className='bg-white pr-6 text-2xl rounded-r-md'><IoSearch /></button>
            </div>
            <Link to="/costumer/cart">

                <div className="mx-1 flex items-center">
                    <span className='relative text-[50px] mr-8 text-white  flex justify-center items-center'>
                        <span className=' absolute font-bold text-[24px] text-yellow-300 left-[10px] top-[10px]'>
                            {isLoading ? <Loader/> : memonizedTotalQuantity}
                        </span>
                        <BsCart size={60} />
                    </span>
                    <div className="mx-2 z-30">
                        <Dropdown />
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default Navbar_loggedIn