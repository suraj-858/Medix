import ContentWrapper from '../components/ContentWrapper'
import Navbar_loggedIn from '../components/Navbar_loggedIn'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { authContext } from '../context/AuthProvider'

type allowedRolesProps = {
  allowedRoles: number[]
  }


const Home_user = ({allowedRoles}:allowedRolesProps) => {
  const {auth} = useAuth();
  const roles = sessionStorage.getItem("Roles");
  var user:number[] = [];
  const {isOrderPlaced} = useContext(authContext);
  if(roles){
    const userRoles = parseInt(roles)
    user = [userRoles]
  }
  

  return (
    <div className='relative w-[100%]'>
          <Navbar_loggedIn /> 
             {isOrderPlaced && <div style={{height:"calc(100% - 64px"}} className="absolute bg-black opacity-50 w-[100%] z-10"></div>}
            <ContentWrapper>

              {user.find((role) => allowedRoles.includes(role))
              ?
               <div className="w-[100%] ">
              <Outlet/>
               </div>
              :auth?.email ?
              <Navigate to ="/page_Not_Found" replace />
              : <Navigate to="/" replace />
              
            }
            </ContentWrapper>

            <Footer/>
    </div>
  )
}

export default Home_user