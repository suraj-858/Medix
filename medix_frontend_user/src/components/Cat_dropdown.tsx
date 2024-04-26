import { useState } from "react";

const Cat_dropdown = () => {
    const [dropdownopen, setdropdownopen] = useState(false);

    return (

        <div className="relative"

        onMouseEnter={() => { setdropdownopen(!dropdownopen) }} 
        onMouseLeave={() => setdropdownopen(!dropdownopen)}>

            <div className=" cursor-pointer px-2 py-4 text-xl text-black">Suraj gahatraj</div>
            {dropdownopen && (
                <div className="absolute w-[150px] left-2 bg-slate-800">
                     <ul className={` ${dropdownopen ? "" : "hidden"} border-2 bg-slate-100 w-full rounded-sm shadow-[-7px_10px_15px_4px_rgba(0,0,0,0.2)]`}>

                    <li className="px-2 py-2 hover:bg-yellow-600 cursor-pointer">My Orders</li>
                    <hr className=" border-black opacity-25" />
                    <li className="px-2 py-2 hover:bg-yellow-600 cursor-pointer">orders</li>

                    <hr className=" border-black opacity-25" />
                    <li className="px-2 py-2 hover:bg-yellow-600 cursor-pointer">Log out</li>

                </ul>


                </div>
               

            )}

        </div>



    )
}

export default Cat_dropdown;