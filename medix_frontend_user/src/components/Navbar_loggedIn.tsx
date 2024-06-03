import React, { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from './Dropdown'
import { BsCart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getCartTotal } from '../redux/slice/cartSlice';
import Loader from './Loader';
import medicineLogo from '../assets/Images/logo.png'
import { RxCross2 } from "react-icons/rx";


const Navbar_loggedIn = () => {

    const navigate = useNavigate();

    const { userCart, totalQuantity, isLoading } = useAppSelector(state => state.createCart);
    const memonizedTotalQuantity = useMemo(() => totalQuantity, [totalQuantity])
    const cartDispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const [mobileSearchBar, setMobileSearchBar] = useState(false);

    useEffect(() => {
        cartDispatch(getCartTotal())
    }, [userCart, totalQuantity])

    const navigationHandler = () => {
        if (searchValue) {
            const encodedQuery = encodeURIComponent(searchValue).replace(/%20/g, '+');
            navigate(`/costumer/search?=${encodedQuery}`, { state: { searchValue } });
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            navigationHandler();
        }
    };

    const myInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className= {` bg-blue-700  h-16 flex md:justify-evenly ${mobileSearchBar ? "justify-center": " justify-around"} items-center sticky top-0 z-20 `}>
            <div className="md:h-12 h-8 w-8  md:w-12 mr-4">
                <img src={medicineLogo} hidden = {mobileSearchBar } alt="Logo" className=' object-contain object-center cursor-pointer' onClick={(e) =>{
                    e.preventDefault();
                    navigate('/costumer')
                }} />
            </div>

            <div className= {`mx-1 md:w-[50%] w-[90%]  max-w-[800px] ${!mobileSearchBar ? "hidden": ""} md:flex md:relative absolute flex justify-center items-center  z-30 `}>
                <input 
                    ref={myInputRef}
                    className=' w-full h-12 rounded-l-md  px-4 outline-none ' type="text" placeholder='Search medicine'
                    value={searchValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchValue(e.target.value)} />

                <button className='bg-white pr-6 text-2xl rounded-r-md h-12' onClick={() => {

                    if(mobileSearchBar){
                        setMobileSearchBar(false)
                    }else{
                        navigationHandler()
                    }
                    }}>{mobileSearchBar ? <RxCross2 />: <IoSearch/>}</button>
            </div>


            <div hidden = {mobileSearchBar} className=" flex justify-evenly w-[30%] md:w-auto  items-center">
            <button className=' text-white md:hidden ml-2 text-3xl rounded-r-md h-12' onClick={() => setMobileSearchBar(!mobileSearchBar)}><IoSearch /></button>

                <Link to="/costumer/cart">
                    <div className='relative md:mr-8 text-white'>
                        <div className='absolute inset-0 flex items-center justify-center font-bold md:text-[24px] text-yellow-300'>
                            {isLoading ? <Loader /> : <div>{memonizedTotalQuantity}</div>}
                        </div>
                        <div className='flex items-center justify-center'>
                            <BsCart  className=' md:text-[60px] text-[40px]' />
                        </div>
                    </div>
                </Link>
                <div className="mx-2 z-20">
                    <Dropdown />
                </div>

            </div>
        </div>
    )
}

export default Navbar_loggedIn