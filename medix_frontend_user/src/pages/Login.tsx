
import { Outlet, useLocation } from 'react-router-dom'
import image from '../assets/Images/medix_img_01.jpg'


const Login = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className=" bg-custom-image ">
      <div className=" flex justify-center items-center  h-screen overflow-y-auto glass_container">

        <section className=" items-center md:h-[60%] w-[80%] lg:max-w-[850px] md:max-w-[650px] max-w-[350px] rounded-lg shadow-lg flex flex-row bg-white md:min-h-[500px] min-h-[380px]">
          {location.pathname !== "/user/editor_register" &&

            <div className={` w-[50%] h-[100%] hidden md:block rounded-lg `}>
              <img className=' rounded-l-lg bg-cover w-full h-full' src={image} alt="" />
            </div>
          }


          <div className={` ${location.pathname === "/user/editor_register" ? "md:w-[100%]" : "md:w-[50%]"} w-[100%] h-[100%]  relative`}>
            <Outlet />
          </div>
        </section>

      </div>
    </div>
  )
}

export default Login