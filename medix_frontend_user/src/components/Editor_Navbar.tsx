import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

interface sideBarProps {
    hideSideBar: boolean, 
    setHideSideBar: (hideSideBar: boolean) => void;
}

const Editor_Navbar = ({hideSideBar, setHideSideBar}: sideBarProps) => {
  return (
    <section className=" md:w-[100%] h-16 flex items-center sticky top-0  bg-[#454547] justify-between md:px-10 px-2 shadow-[7px_10px_20px_7px_rgba(0,0,0,0.3)]">
    <div className="  m-3 text-3xl cursor-pointer text-white" 
    onClick={() =>{
      setHideSideBar(!hideSideBar);
    }}>
      {hideSideBar? 
        <RxHamburgerMenu />
      :
<   RxCross2 />
    }

    </div>
  
      <div className="flex items-center justify-evenly">
          <div className="">
            <h2 className="text-white font-semibold md:text-3xl text-2xl md:mx-4 cursor-pointer"><IoIosNotifications /></h2>
          </div>
          <div className="md:mx-4  mx-2 flex justify-center items-center">
            <span className="mx-3 md:text-xl text-md text-white"><FaUserAlt /></span>
            <h1 className="text-white font-semibold md:text-xl text-base">Suraj Bishwakarma</h1>
          </div>
      </div>

    </section>
  )
}

export default Editor_Navbar