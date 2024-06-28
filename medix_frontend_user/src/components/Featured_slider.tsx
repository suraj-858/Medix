import { useEffect, useState } from 'react'
import slider_01 from '../assets/Slider_image/slider_01.jpg'
import slider_02 from '../assets/Slider_image/slider_02.jpg'
import slider_03 from '../assets/Slider_image/slider_03.jpg'
import slider_04 from '../assets/Slider_image/slider_04.webp'
import slider_05 from '../assets/Slider_image/slider_05.jpg'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";


const Featured_slider = () => {
    const slides = [slider_01, slider_02, slider_03, slider_04, slider_05];

    const [currentIndex, setCurrentIndex] = useState(0);


    const nextSlide = () => {

        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const prevSlide = () => {

        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    useEffect(() => {
        const interValid = setInterval(() => {
            nextSlide();
        }, 5000)
        return () => {
            clearInterval(interValid);
        }
    }, [currentIndex]);

    return (
        <div className=" max-w-[1800px] lg:h-[680px] h-[400px] w-full m-auto py-3  relative group flex justify-center z-0">
            <div className="h-[100%] w-[100%] flex overflow-hidden rounded-lg">

                {slides.map((slide, slideIndex) => {

                    console.log(slide);
                    
                    return (
                        <div key={slideIndex}
                            style={{
                                backgroundImage: `url(${slides[slideIndex]})`,
                                translate: `${-100 * currentIndex}%`
                            }}
                            className=" w-full h-full duration-700 bg-cover ease-in-out flex flex-shrink-0 flex-grow-0 rounded-lg bg-center" >

                        </div>

                    )
                })}
            </div>



            {/* left arrow button */}
            <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-3xl rounded-full text-white py-1 px-2 pt-2 bg-black/20 cursor-pointer">
                <button><FaChevronLeft size={30} onClick={prevSlide} /></button>
            </div>

            {/* right arrow button */}
            <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-3xl rounded-full text-white py-1 px-2 pt-2  bg-black/20 cursor-pointer">
                <button ><FaChevronRight onClick={nextSlide} /></button>
            </div>

            <div className=" flex items-center justify-center gap-3 mx-1 bottom-5 absolute  -translate-x-[-50%] -translate-y-0 right-[50%] py-2">
                {slides.map((slide, slideIndex) => {

                    console.log(slide);
                    
                    return (

                        <div key={slideIndex}
                            className={`text-2xl cursor-pointer mx-1 self-center transition ${slideIndex === currentIndex ? "border-[5px] rounded-[50%] " : ""} text-slate-500 border-gray-400/60 duration-300 ease-in-out`}

                            onClick={() => {
                                setCurrentIndex(slideIndex);
                            }}
                        ><RiCheckboxBlankCircleFill size={20} /></div>
                    )
                })}

            </div>



        </div>

    )
}

export default Featured_slider