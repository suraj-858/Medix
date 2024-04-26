import axios from "../api/axios";
import useAuth from "./useAuth";
import { Auth } from "../Types/authType";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {

        try {
            const response = await axios.get('/auth/refresh', {
                withCredentials: true
            })
            if(response){

                setAuth((prev: Auth) => {
                return { ...prev, accessToken: response.data.accessToken }
                })

                return response.data.accessToken;
            }
            
        } catch (error) {
            throw error;
        }

    }       
    return refresh;
}

export default useRefreshToken;