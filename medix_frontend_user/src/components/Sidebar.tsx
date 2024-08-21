import { MdDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { useContext } from "react";
import { authContext } from "../context/AuthProvider";


interface sideBarProps {
    hideSideBar: boolean, 
    setHideSideBar: (hideSideBar: boolean) => void;
}

const Sidebar = ({hideSideBar}: sideBarProps) => {
    const {setAuth} = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();


  return (
    <div className=' absolute h-screen max-w-[280px] md:min-w-[200px] w-[20%] bg-[#454547] flex flex-col items-center md:justify-start '
    style={{transform:  hideSideBar ? "translateX(-100%)" : "translateX(0%)", transition: " transform 0.5s ease"}}
    >

        <div className="h-[30px] max-w-[100px] w-[50%] bg-green-500 mx-auto my-5">
        </div>

        <section className="flex justify-evenly md:justify-start flex-col w-[100%]">

            <Link to="/dashboard_editor">
            <div className= {`flex flex-col md:flex-row items-center md:justify-start justify-center my-3  ${location.pathname === '/dashboard_editor' ? "text-orange-500 hover:text-orange-500": "text-slate-300 hover:text-white"} hover:bg-slate-800/40  md:font-semibold w-[100%] md:py-3 md:pl-3 cursor-pointer`}>
            <span className=" md:text-2xl text-3xl md:mr-2 " ><MdDashboard /></span>
            <h1 className="md:text-xl text-sm ">Dashboard</h1>
            </div>
            </Link>

        <Link to= "/dashboard_editor/add_product">
        <div className= {`flex flex-col md:flex-row items-center md:justify-start justify-center my-3  ${location.pathname === '/dashboard_editor/add_product' ? "text-orange-500 hover:text-orange-500": "text-slate-300 hover:text-white"} hover:bg-slate-800/40  md:font-semibold w-[100%] md:py-3 md:pl-3 cursor-pointer`}>
            <span className=" md:text-2xl text-3xl md:mr-2 " ><FaBox /></span>
            <h1 className="md:text-xl text-sm ">Products</h1>
        </div>
        </Link>

        <Link to="/dashboard_editor/categories">
        <div className= {`flex flex-col md:flex-row items-center md:justify-start justify-center my-3 ${location.pathname === '/dashboard_editor/categories' ? "text-orange-500 hover:text-orange-500": "text-slate-300 hover:text-white"} hover:bg-slate-800/40  md:font-semibold w-[100%] md:py-3 md:pl-3 cursor-pointer`}>
            <span className=" md:text-2xl text-3xl md:mr-2 " ><MdCategory /></span>
            <h1 className="md:text-xl text-sm ">Categories</h1>
        </div>
        </Link>

        <div className=" flex flex-col md:flex-row items-center md:justify-start justify-center my-3 text-slate-300 hover:bg-slate-800/40 hover:text-white md:font-semibold w-[100%] md:py-3 md:pl-3 cursor-pointer" onClick={() =>{

                    sessionStorage.setItem('Roles', "")
                    const sessionTimeout = sessionStorage.getItem('Roles')
                    if(sessionTimeout === ""){
                        setAuth({email: "", password: "", roles: 0, accessToken: ""})
                        navigate('/', {replace: true});
                    }
        }}>
            <span className=" md:text-2xl text-3xl md:mr-2 " ><BiLogOutCircle /></span>
            <h1 className="md:text-xl text-sm ">Logout</h1>
        </div>
        </section>
        

    </div>
  )
}

export default Sidebar