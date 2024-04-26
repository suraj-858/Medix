import { useState } from "react"

import { useNavigate } from "react-router-dom"
import axios from "../api/axios"

const E_signUp = () => {


    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("")
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [liscense, setLiscense] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isErrorMessage, setIsErrorMessage] = useState("");


    const handleRegister = async() =>{
        console.log("hellos rauj");
        axios.post('/user/editor_register', {

            email: email, 
            password: password, 
            companyName: companyName, 
            address: address, 
            Liscense: liscense, 
            phoneNumber: phoneNumber
            
        })
        .then(response =>{
            if(response.status === 204){
                setIsErrorMessage("All fields are required")
            }
            else if(response.status === 201){
                setIsErrorMessage("Successfully Registered")
                navigate('/user')
            }
            console.log(response)

        }).catch(error =>{
            if(error?.response?.status === 500){
                setIsErrorMessage("No server response")

            }
            else{
                setIsErrorMessage("Failed to register")
            }

            console.log(error);
        })
    }

  return (
    <div className="p-3 flex flex-col items-center justify-center h-full">
        <h1 className="lg:text-3xl md:text-2xl my-1 font-semibold">Sign Up form</h1>
        
           <section className="md:flex w-[100%] ">
           <form className="mx-5 md:w-[50%]"> 
                <div className=" flex flex-col md:my-4">
                    <label className="text-slate-600 md:text-base text-xs">Company's Name</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]"
                    onChange={(e) =>{
                        setCompanyName(e.target.value)
                    }}
                    />
                </div>

                <div className=" flex flex-col md:my-4">
                    <label className="text-slate-600 md:text-base text-xs">Email Address</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]" 
                     onChange={(e) =>{
                        setEmail(e.target.value)
                    }}
                    />
                </div>

                <div className=" flex flex-col md:my-4">
                    <label className="text-slate-600 md:text-base text-xs" aria-required>Address</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]"
                     onChange={(e) =>{
                        setAddress(e.target.value)
                    }}
                    />
                </div>

                <div className=" flex flex-col md:my-4">
                    <label  className="text-slate-600 md:text-base text-xs" aria-required>Liscense. Number</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]" 
                     onChange={(e) =>{
                        setLiscense(e.target.value)
                    }}
                    />
                </div>

                <div className=" flex flex-col md:my-4">
                    <label className="text-slate-600 md:text-base text-xs">Phone Number</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 md:focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]"
                     onChange={(e) =>{
                        setPhoneNumber(e.target.value)
                    }}
                    />
                </div>
                
            </form>

            <div className="mx-5 my-2 md:w-[50%]"> 
               

                <div className=" flex flex-col md:my-4">
                    <label className="text-slate-600 md:text-base text-xs">Password</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]"
                     onChange={(e) =>{
                        setPassword(e.target.value)
                    }}
                    />
                </div>

                <div className=" flex flex-col md:my-4">
                    <label className="text-slate-600 md:text-base text-xs" aria-required>Confirm Password</label>
                    <input type="text" className="border-2 md:py-2 py-1 px-2 mt-1 rounded-md outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(0,100,255,0.4)]"

                     onChange={(e) =>{
                        setConfirmPassword(e.target.value)
                    }}
                    />
                </div>
                <p className="h-4 my-1 flex items-center md:text-base text-sm text-red-500 ">{isErrorMessage}</p>

                <div className=" flex flex-col md:my-3 my-2">
                    <button className="md:py-3 py-1 rounded-md md:text-[18px] text-[16px] font-semibold text-white bg-blue-500"
                    onClick={() =>{
                        handleRegister();
                    }}
                    >Register</button>
                </div>

                <div className=" flex flex-col md:my-2 items-center">
                <p className="md:text-2xl text-xl font-semibold text-slate-500">or</p>
                </div>
                <div className=" flex flex-col md:my-2">
                    <p className="text-slate-500 md:text-md text-sm">Already have an account ?</p>

                    <button className="md:py-3 py-1 rounded-md md:text-[18px] text-[16px] font-semibold text-white bg-blue-500"
                    onClick={() =>{
                        navigate('/user')
                    }}
                    >Login</button>

                </div>
                
            </div>
           </section>


    </div>
  )
}

export default E_signUp