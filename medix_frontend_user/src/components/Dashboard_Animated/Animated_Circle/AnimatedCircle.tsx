
import { useEffect, useState } from 'react';
import './style.css'

const AnimatedCircle = () => {

    const [userNumber, setUserNumber] = useState(0)

   
   useEffect(() =>{
       let number = 0
    const userCounter = setInterval(() => {
        if(number === 65){
            clearInterval(userCounter);
        }
        else{
            number += 1
            setUserNumber(number);
        }
    }, 30)
   },[])
   
  return (
    <div className ='circleAnim'>
        <div className="skill">
            <div className="outer">
                <div className="inner">
                        <div id="number">{userNumber}%</div>
                </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px" className='Icon'>
            <defs>
            <linearGradient id="GradientColor">
               <stop offset="0%" stopColor="#e91e63" />
               <stop offset="100%" stopColor="#673ab7" />
            </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" strokeLinecap="round"  id='circle1'/>
            </svg>

        </div>
        <style>
            
        </style>
    </div>
  )
}

export default AnimatedCircle