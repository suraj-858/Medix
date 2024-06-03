
import {useMemo, useState, useRef, useEffect} from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import axios from '../api/axios';

const C_signUp_02 = () => {

  const [passwordValue, setPasswordValue] = useState("");
  const [numberValue, setNumberValue] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const recievedData = location.state;

  const phoneRef = useRef<any>();
  useEffect(() =>{
    phoneRef?.current?.focus();
  },[phoneRef])

  const passwordValidator = useMemo(() =>{


  switch (passwordValue !== "") {

    case passwordValue.length >=8 === false:
        return "Must Be 8 character"
      case /[A-Z]/.test(passwordValue) === false:
        return "Atleast one capital letter"

      case /[a-z]/.test(passwordValue) === false:
        return "Atleast one small letter"

      case /\d/.test(passwordValue) === false:
        return "Atleast one number"

      case /[!@#$%^&*()?]/.test(passwordValue) === false:
        return "Atleast one special character"
        break;     
  
    default:
      return ""
      break;
  }

  }, [passwordValue]);

  console.log(recievedData.userValue, recievedData.emailValue)

  const createAccountHandler = async() =>{

    try {
      await axios.post('/user/user_register', {
        username: recievedData.userValue, 
        email: recievedData.emailValue, 
        phone: numberValue,
        password: passwordValue

      }).then(response =>{
        console.log(response)
        if(response.status === 201){
          navigate('/user', {replace: true})
          
        }
      }).catch(error =>{
        if(error?.response?.status === 500){
          console.log("Internal server error");
        }
      })
      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center flex-col relative ">
      <div className='flex items-center md:mb-8 justify-center'>
        <h1 className='md:text-2xl text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-400'>Sign up </h1>
      </div>
    <label className = "relative w-[90%] flex justify-center mb-3">
      <input 
      ref={phoneRef}
      type='text' 
      className= "md:h-12 h-10 w-[100%] md:px-5 px-2 md:pb-1 flex justify-center lg:text-xl md:text-base text-sm border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required 
      autoComplete='off'
      onChange={(e) =>{
        setNumberValue(e.target.value)
      }}/>
      <span className= "md:text-base lg:text-xl text-sm text-slate-500 text-opacity-80 absolute left-0 md:top-3 top-2 md:mx-5 mx-3  px-1 transition duration-200 input-text">Phone Number</span>
    </label>
    <label className = "relative w-[90%] flex justify-center mt-2 ">
      <input type='password' className= "md:h-12 h-10 w-[100%] md:px-5 px-2 md:pb-1 flex justify-center lg:text-xl md:text-base text-sm border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required onChange={(e) =>{setPasswordValue(e.target.value)}}/>

      <span className= "md:text-base lg:text-xl text-sm  text-slate-500 text-opacity-80 absolute left-0 md:top-4 top-2 md:mx-5 mx-3  px-1 transition duration-200 input-password ">Password</span>
    </label>

    <div className="h-4 my-2 flex items-center justify-start w-[90%] ml-2">
      <span className= {`${passwordValidator.length > 0 ? "text-red-500": ""}`}>{passwordValidator}</span>
      </div>

    <div className="flex justify-between w-[90%]">
        <Link to= "/user/register_n&e">
    <button className='px-5 bg-gray-300 md:h-12 h-8 rounded-md text-gray-600 lg:text-xl md:text-base text-sm font-semi-bold disabled:opacity-75 flex justify-center items-center '>Back</button>
    </Link>
    <button className='px-5 bg-blue-500 md:h-12 h-8 rounded-md text-white lg:text-xl md:text-base text-sm font-semi-bold disabled:opacity-75 flex justify-center items-center ' disabled = {passwordValidator === "" && numberValue.length === 10 && passwordValue.length >=8 ? false : true} onClick={createAccountHandler}>Create Account</button>
    </div>

    <div className="h-2 flex flex-row w-[90%] justify-center items-center text-center my-4">
    <hr className=' md:border-2 border-1 border-slate-400 w-full ' />
      <span className='mx-2 md:text-xl text-base'>or</span>
    <hr className=' md:border-2 border-1 border-slate-400 w-full ' />
    </div>

    <div className="flex flex-row w-[90%]  md:mt-6 mt-4 justify-between">
      <button className='hover:bg-red-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-red-600 font-medium text-sm md:text-base'>Forget Password?</button>
        <Link to= "/user">
      <button className='hover:bg-blue-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-blue-600 font-medium text-sm md:text-base'>Login</button>
        </Link>
    </div>
   
</div>
  )
}

export default C_signUp_02