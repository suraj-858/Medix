
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link ,  useNavigate} from 'react-router-dom'
import axios from '../api/axios'


interface validatorData {
  isExists: boolean, 
  message: string
}

const C_signUp_01 = () => {
  const navigate = useNavigate();
  
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [validatorResponse, setValidatorResponse] = useState<validatorData | any>()

  const userData = {emailValue:inputValue, userValue:username};

  const nameRef = useRef<any>();
  useEffect(() =>{
    // setEditorRegister(false);
    nameRef?.current?.focus();
  },[nameRef])
  
  const memonizedValue = useMemo(() =>{
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputValue); 
    
    return isValid

  }, [inputValue])



  console.log(validatorResponse);

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">

    <label className = "relative w-[90%] flex justify-center my-4">
      <input 
      type='text' 
      ref = {nameRef}
      className= "h-16 w-[100%] px-5 pb-1 flex justify-center text-2xl border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required 
      onChange={(e) =>{setUsername(e.target.value)}}/>

      <span className= "text-2xl text-slate-500 text-opacity-80 absolute left-0 top-3 mx-5  px-2 transition duration-200 input-text">Name</span>
    </label>

    <label className = "relative w-[90%] flex justify-center mt-2">
      <input type='text' className= "h-16 w-[100%] px-5 pb-1 flex justify-center text-2xl border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required  onChange={(e) =>{setInputValue(e.target.value)}}/>

      <span className= "text-2xl text-slate-500 text-opacity-80 absolute left-0 top-3 mx-5  px-2 transition duration-200 input-text">Email</span>
    </label>

    <div className='relative w-[90%] h-4 my-2 flex items-center'>
      <span className={`mx-1 ${memonizedValue ? "text-green-500":"text-red-500"}`}>{inputValue === "" ? "" : memonizedValue ? "" : "Incorrect email" }</span>
      <span className={`mx-1 ${validatorResponse !== undefined && validatorResponse ? "text-red-500":""}`}>{validatorResponse !== undefined && validatorResponse ? "Email already exists" : ""}</span>

    </div>


    <div className="flex justify-end w-[90%]">

    <button className={`px-6 bg-blue-500 h-12 rounded-md text-white text-lg font-semi-bold disabled:opacity-70`} disabled={memonizedValue && username.length > 0 ? false : true} onClick={async() =>{

      try {
        await axios.post('/user/verify_email', {
          email: inputValue
      }).then(Response =>{

        if(Response.status === 202){
          setValidatorResponse(Response?.data?.isExists)

          if(!Response?.data?.isExists && Response?.data?.isExists !== undefined ){

            navigate('/user/register_ph&ps', {state: userData, replace: true})
          }

        }
        if(Response.status === 208){
          setValidatorResponse(Response.data.isExists);
          setInputValue("");
        }
         
        
      }).catch(error =>{
        console.log(error);

      })

      } catch (error) {
        console.log(error);
        
      }
    }}>Next</button>
        
    </div>

    <div className="h-2 flex flex-row w-[90%] justify-center items-center text-center my-8">
    <hr className=' border-2 border-slate-400 w-full ' />
      <span className='mx-2 text-xl'>or</span>
    <hr className=' border-2 border-slate-400 w-full ' />

    </div>

    <div className="flex flex-row w-[90%] mt-8 justify-between">
      <button className='hover:bg-red-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-red-600 font-medium text-[18px]'>Forget Password?</button>
        <Link to= "/user" replace = {true}>
      <button className='hover:bg-blue-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-blue-600 font-medium text-[18px]'>Login</button>
        </Link>
    </div>
    <div className="mt-10">
      <Link to='/user/editor_register'>
      <button className=' font-semibold text-[18px] px-5 py-3 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition duration-500 ease-in-out'
      onClick={() =>{

      }}
      >Register as seller</button>
      </Link>
    </div>
</div>
  )
}

export default C_signUp_01