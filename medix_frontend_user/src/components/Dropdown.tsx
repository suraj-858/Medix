import { useContext, useState } from "react";
import { authContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
    const { setAuth} = useContext(authContext);
    const navigate = useNavigate();
    const [dropdownopen, setdropdownopen] = useState(false);

    const handleLogOut = () =>{

            sessionStorage.setItem('Roles', "")
            const sessionTimeout = sessionStorage.getItem('Roles')
            if(sessionTimeout === ""){
                setAuth({email: "", password: "", roles: 0, accessToken: ""})
                navigate('/', {replace: true});
            }
    }

    return (

        <div

        onMouseEnter={() => { setdropdownopen(!dropdownopen) }} 
        onMouseLeave={() => setdropdownopen(!dropdownopen)}>

            <div className=" cursor-pointer py-2 text-xl text-white flex ">Suraj gahatraj</div>
            {dropdownopen && (

                <ul className={` ${dropdownopen ? "" : "hidden"}  absolute bg-slate-100 w-[150px] rounded-sm shadow-[-7px_10px_15px_4px_rgba(0,0,0,0.2)]`}>
                    <li className="px-2 py-2 hover:bg-yellow-600 cursor-pointer">My Orders</li>
                    <hr className=" border-black opacity-25" />
                    <li className="px-2 py-2 hover:bg-yellow-600 cursor-pointer">orders</li>

                    <hr className=" border-black opacity-25" />
                    <li className="px-2 py-2 hover:bg-yellow-600 cursor-pointer"
                    onClick={handleLogOut}
                    >Log out</li>

                </ul>


            )}

        </div>



    )
}

export default Dropdown;