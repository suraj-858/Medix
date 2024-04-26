
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {


    return (
        <div className=' h-16 shadow-xl flex items-center justify-evenly'>
            <div className="h-12 w-12 bg-slate-400">

            </div>

            <div className=" w-[60%] flex justify-evenly items-center font-semibold">

                <ul className='w-[70%] max-w-[500px] flex justify-evenly mr-10'>

                    <li>
                        <Link className={useLocation().pathname === '/' ? ' text-red-700' : ''} to="/">Shop</Link>
                    </li>

                    <li>
                        <Link className={useLocation().pathname === '/customer_support' ? ' text-red-700' : ''} to='/customer_support' >Customer Support</Link>
                    </li>

                    <li>
                        <Link className={useLocation().pathname === '/about_us' ? ' text-red-700' : ''} to='/about_us'>About Us</Link>
                    </li>

                </ul>

                <Link to='/user'>
                    <button className=' bg-blue-700 px-5 py-2 text-white rounded-lg hover:opacity-90 text-center '>Login</button>
                </Link>
            </div>
        </div>
    )
}


export default Navbar 