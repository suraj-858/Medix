import ContentWrapper from '../components/ContentWrapper'
import Navbar_loggedIn from '../components/Navbar_loggedIn'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Footer from '../components/Footer'

type allowedRolesProps = {
  allowedRoles: number[]
  }


const Home_user = ({allowedRoles}:allowedRolesProps) => {
  const {auth} = useAuth();
  const roles = sessionStorage.getItem("Roles");

  var user:number[] = [];

  if(roles){
    const userRoles = parseInt(roles)
    user = [userRoles]
  }
  

  return (
    <div className='relative'>
          <Navbar_loggedIn />
          
            <ContentWrapper>
              {user.find((role) => allowedRoles.includes(role))
              ?
               <div className="w-full">
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