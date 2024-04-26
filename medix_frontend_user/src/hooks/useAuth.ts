import { useContext, useDebugValue } from "react"
import {authContext} from "../context/AuthProvider"

const useAuth = () =>{

    const {auth} = useContext(authContext);

    useDebugValue(auth, (auth) => auth?.email ? "Logged In" : "Logged Out")
    return useContext(authContext);
}
export default useAuth;