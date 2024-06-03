
import { useEffect, useState, useMemo, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { authContext } from '../context/AuthProvider';
import Loader from './Loader';


const C_login_01 = () => {

  const { auth } = useContext(authContext)
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isUserConfirmed, setIsUserConfirmed] = useState(true);


  const emailRef = useRef<any>();
  const errorRef = useRef<any>();


  useEffect(() => {
    emailRef?.current?.focus()
  }, [emailRef])

  const [iserromsg, setIserromsg] = useState({
    message: '',
    errcode: 0
  })

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (emailValue === "" || passwordValue === "") {
      setIserromsg({ message: '', errcode: 0 })
    }

  }, [emailValue, passwordValue, auth])


  const memonizedValue = useMemo(() => {

    if (emailValue !== undefined &&
      passwordValue !== undefined &&
      passwordValue.length >= 8) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(emailValue);

      return isValid
    }

  }, [emailValue, passwordValue])



  return (

    <div className="w-[100%] h-[100%] flex items-center justify-evenly flex-col ">

      <div className='flex items-center mt-4 justify-center'>
        <h1 className='md:text-2xl text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-400'>Login </h1>
      </div>

      <div className="h-4">
        <p ref={errorRef} className=' font-semi-bold md:text-md text-sm' aria-live='assertive'>{iserromsg.errcode === 0 || iserromsg.errcode === 404 || iserromsg.errcode === 101 ? iserromsg.message : ""}</p>
      </div>
      <div className='w-full flex justify-center items-center flex-col'>
        <label className="relative w-[90%] flex justify-center my-2">
          <input id='emailText'
            type='text'
            className="md:h-14 h-10 w-[100%] md:px-5 px-2 md:pb-1 flex justify-center lg:text-xl md:text-base text-sm border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required
            value={emailValue}
            ref={emailRef}
            autoComplete='off'
            onChange={(e) => { setEmailValue(e.target.value) }}
          />

          <span className="md:text-base lg:text-xl text-sm text-slate-500 text-opacity-80 absolute left-0 md:top-4 top-2 md:mx-5 mx-3  px-1 transition duration-200 input-text">Email</span>
        </label>

        <label className="relative w-[90%] flex justify-center my-2">
          <input id='passwordText'
            type='password'
            className="md:h-14 h-10 w-[100%] px-5 pb-1 flex justify-center lg:text-xl md:text-base text-sm border-slate-500 border-[2px] focus:border-[3px] valid:border-[3px] rounded-md border-opacity-50 outline-none focus:border-blue-500 valid:border-blue-500  transition duration-100" required
            value={passwordValue}
            autoComplete='off'
            onChange={(e) => { setPasswordValue(e.target.value) }}
          />

          <span className="md:text-base lg:text-xl text-sm  text-slate-500 text-opacity-80 absolute left-0 md:top-4 top-2 md:mx-5 mx-3  px-1 transition duration-200 input-password ">Password</span>
        </label>
        <div className="md:h-5 h-2 flex w-[90%] px-2">
          <p className='font-semi-bold md:text-base text-sm text-red-500'>{iserromsg.errcode === 400 || iserromsg.errcode === 401 ? iserromsg.message : ""}</p>
        </div>

        <button className=' mt-4 w-[90%] bg-blue-500 md:h-14 h-10 rounded-md text-white lg:text-xl md:text-base text-sm font-semi-bold disabled:opacity-75 flex justify-center items-center pr-14' disabled={memonizedValue ? false : true} onClick={async (e) => {
          e.preventDefault();
          try {
            setIsUserConfirmed(false);
            const response = await axios.post('/auth/login', {
              email: emailValue,
              password: passwordValue
            }, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            })
            if (response && emailValue !== undefined && passwordValue !== undefined) {

              setIsUserConfirmed(true);
              const role = response.data.roles;
              const userId = response?.data?.userId;
              const accessToken = response.data.accessToken;
              const username = response?.data?.username;

              setAuth({ email: emailValue, password: passwordValue, roles: role, accessToken: accessToken })
              sessionStorage.setItem('username', username)
              sessionStorage.setItem("Roles", role);
              sessionStorage.setItem("accessToken", accessToken)
              sessionStorage.setItem("userId", userId)

              if (role === 2001) {

                navigate('/costumer', { replace: true });
              }
              if (role === 1984) {

                navigate('/dashboard_editor', { replace: true });
              }
              setEmailValue("")
              setPasswordValue("")

            }
          }
          catch (error: any) {
            setIsUserConfirmed(true);
            if (!error?.response) {
              setIserromsg({ message: "No server Response", errcode: 100 })

            } else if (error.response?.status === 404) {
              setIserromsg({ message: "User not found!", errcode: 404 })


            } else if (error.response?.status === 400) {
              setIserromsg({ message: "Missing email or password", errcode: 400 })


            } else if (error.response?.status === 401) {
              setIserromsg({ message: "Incorrect email or password", errcode: 401 })

            } else {
              setIserromsg({ message: "Failed to login", errcode: 101 })

            }
            errorRef?.current?.focus();

          }

          return (<>

          </>)
        }}>

          <div className="w-6 h-6 md:mx-4 mx-2">
            {!isUserConfirmed && (<>
              <Loader />
            </>)}
          </div>
          Login
        </button>

      </div>


      <div className=" md:mt-6 mt-4 h-2 flex flex-row w-[90%] justify-center items-center text-center  my-2">
        <hr className=' md:border-2 border-slate-400 w-full ' />
        <span className='mx-2 md:text-xl text-sm'>or</span>
        <hr className=' md:border-2 border-slate-400 w-full ' />

      </div>

      <div className="flex flex-row w-[90%] md:my-8 my-4 justify-between">
        <button className='hover:bg-red-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-red-600 font-medium md:text-base text-sm'>Forget Password?</button>

        <Link to='/user/register_n&e'>
          <button className='hover:bg-blue-400 hover:bg-opacity-10 px-2 py-1 rounded-md text-blue-600 font-medium md:text-base text-sm'>Create account</button>
        </Link>

      </div>
    </div>
  )
}

export default C_login_01