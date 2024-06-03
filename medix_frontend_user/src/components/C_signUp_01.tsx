
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

  const userData = { emailValue: inputValue, userValue: username };

  const nameRef = useRef<any>();
  useEffect(() => {
    // setEditorRegister(false);
    nameRef?.current?.focus();
  }, [nameRef])

  const memonizedValue = useMemo(() => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputValue);

    return isValid

  }, [inputValue])



  console.log(validatorResponse);

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">

<div className='flex items-center mb-4 md:mb-6 justify-center'>
        <h1 className='md:text-2xl text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-400'>Sign up</h1>
      </div>

      <label className="relative w-[90%] flex justify-center my-3">
        <input
          type='text'
          ref={nameRef}
          className="md:h-12 h-10 w-[100%] md:px-5 px-2 md:pb-1 flex justify-center lg:text-xl md:text-base text-sm border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required
          onChange={(e) => { setUsername(e.target.value) }} />

        <span className="md:text-base lg:text-xl text-sm text-slate-500 text-opacity-80 absolute left-0 md:top-3 top-2 md:mx-5 mx-3  px-1 transition duration-200 input-text">Name</span>
      </label>

      <label className="relative w-[90%] flex justify-center my-3">
        <input type='text'
          className="md:h-12 h-10 w-[100%] px-5 pb-1 flex justify-center lg:text-xl md:text-base text-sm border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required
          onChange={(e) => { setInputValue(e.target.value) }} />

        <span className="md:text-base lg:text-xl text-sm  text-slate-500 text-opacity-80 absolute left-0 md:top-3 top-2 md:mx-5 mx-3  px-1 transition duration-200 input-text">Email</span>
      </label>

      <div className='relative w-[90%] h-4 flex items-center'>
        <span className={`mx-1 ${memonizedValue ? "text-green-500" : "text-red-500"}`}>{inputValue === "" ? "" : memonizedValue ? "" : "Incorrect email"}</span>
        <span className={`mx-1 ${validatorResponse !== undefined && validatorResponse ? "text-red-500" : ""}`}>{validatorResponse !== undefined && validatorResponse ? "Email already exists" : ""}</span>

      </div>


      <div className="flex justify-end w-[90%]">

        <button className={` px-5 bg-blue-500 md:h-12 h-8 rounded-md text-white lg:text-xl md:text-base text-sm font-semi-bold disabled:opacity-75 flex justify-center items-center `} disabled={memonizedValue && username.length > 0 ? false : true} onClick={async () => {

          try {
            await axios.post('/user/verify_email', {
              email: inputValue
            }).then(Response => {

              if (Response.status === 202) {
                setValidatorResponse(Response?.data?.isExists)

                if (!Response?.data?.isExists && Response?.data?.isExists !== undefined) {

                  navigate('/user/register_ph&ps', { state: userData, replace: true })
                }

              }
              if (Response.status === 208) {
                setValidatorResponse(Response.data.isExists);
                setInputValue("");
              }


            }).catch(error => {
              console.log(error);

            })

          } catch (error) {
            console.log(error);

          }
        }}>Next</button>

      </div>

      <div className="h-2 flex flex-row w-[90%] justify-center items-center text-center my-4">
        <hr className=' md:border-2 border-1 border-slate-400 w-full ' />
        <span className='mx-2 md:text-xl text-base'>or</span>
        <hr className=' md:border-2 border-1 border-slate-400 w-full ' />

      </div>

      <div className="flex flex-row w-[90%] md:mt-4 mt-2 justify-between">
        <button className='hover:bg-red-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-red-600 font-medium md:text-base text-sm'>Forget Password?</button>
        <Link to="/user" replace={true}>
          <button className='hover:bg-blue-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-blue-600 font-medium md:text-base text-sm'>Login</button>
        </Link>
      </div>
      <div className="md:mt-6 mt-4">
        <Link to='/user/editor_register'>
          <button className=' px-5 bg-blue-500 md:h-12 h-8 rounded-md text-white lg:text-xl md:text-base text-sm font-semi-bold disabled:opacity-75 flex justify-center items-center'
            onClick={() => {

            }}
          >Register as seller</button>
        </Link>
      </div>
    </div>
  )
}

export default C_signUp_01