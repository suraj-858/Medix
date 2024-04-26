import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import Editor_Navbar from "../components/Editor_Navbar";
import Sidebar from "../components/Sidebar"
import { useState } from "react";
import Footer from "./Footer";

interface allowedRolesProps {
    allowedRoles: number[]
}
const RequireAuth = ({allowedRoles}:allowedRolesProps) => {
    const {auth} = useAuth();
    const roles = sessionStorage.getItem("Roles");
    const [hideSideBar, setHideSideBar] = useState(true);

    var editor:number[] = [];
    
    if(roles){
        const editorRoles = parseInt(roles);
        editor = [editorRoles]
    }
  return (
    <div>
            {editor.find((roles) => allowedRoles.includes(roles))
            ?
            <div className="min-h-screen flex flex-col items-center">
      <section className=" w-[100%] sticky top-0 z-20 ">
        <Editor_Navbar hideSideBar = {hideSideBar} setHideSideBar = {setHideSideBar} />
        <Sidebar hideSideBar = {hideSideBar} setHideSideBar = {setHideSideBar}/>
      </section>

        <Outlet/>

            </div>
            : auth?.email ? 
            <Navigate to = "/page_not_Fount" />
            : <Navigate to =  "/" replace />

            }
            <Footer/>
    </div>
  )
}

export default RequireAuth