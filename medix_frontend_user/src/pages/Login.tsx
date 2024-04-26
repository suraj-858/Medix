
import { Outlet, useLocation } from 'react-router-dom'
import image from '../assets/Images/medix_img_01.jpg'


const Login = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className= " bg-custom-image ">
      <div className=" flex justify-center items-center  h-screen overflow-y-auto glass_container">

<section className="md:h-[60%] w-[80%] max-w-[950px] rounded-lg shadow-lg flex flex-row bg-white min-h-[500px]">
  {location.pathname !== "/user/editor_register" && 

    <div className= {` w-[50%] h-[100%] hidden md:block rounded-lg `}>
      <img className=' rounded-l-lg bg-cover w-full h-full' src= {image} alt="" />
    </div>
  }


<div className= {` ${location.pathname === "/user/editor_register" ? "md:w-[100%]": "md:w-[50%]" } w-[100%] h-[100%]  relative`}>
<Outlet/>
</div>
</section>
    
      </div>
    </div>
  )
}

export default Login