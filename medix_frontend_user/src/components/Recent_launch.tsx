import {  useMemo, useRef } from "react";
import Product_cat from "./Product_cat"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import 'react-multi-carousel/lib/styles.css';
import {  useAppSelector } from "../redux/store";
import { productsType } from "../Types/authType";
import SkeletonItem from "./Skeleton_Loader/SkeletonItem";




const Recent_launch = () => {

  
  const { stableProduct, isloading, productData } = useAppSelector(state => state.GetProduct)
  
    
  const memonizedStableProduct = useMemo(():productsType => stableProduct.slice(0, 10), [stableProduct])
  const memonizedproductData = useMemo(():productsType => productData.slice(0, 10), [productData])

  const carouselContainer = useRef<HTMLDivElement>(null);

  const navigation = (dir: string) => {

    const container = carouselContainer.current;

    if (container) {
      const scrollAmount = dir === "left" ? container?.scrollLeft -
        (container?.offsetWidth + 20) : container?.scrollLeft + (container?.offsetWidth + 20)
      container?.scrollTo({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className=" my-3">

      <div className="relative w-full border-2 group min-h-[100px]">

        <div className={` z-10 hidden group-hover:block absolute  left-0 w-[50px] h-full cursor-pointer bg-gradient-to-r from-black/50 `}
          onClick={() => { navigation("left") }} >
          <button className=" absolute top-[45%] text-white left-0 translate-x-[50%]"><FaChevronLeft size={25} /></button>
        </div>
        <div className={` z-10 hidden group-hover:block absolute right-0 w-[50px] h-full cursor-pointer  bg-gradient-to-l from-black/50 `}
          onClick={() => { navigation("Right") }}>
          <button className="absolute top-[45%] text-white right-0 translate-x-[-50%]"><FaChevronRight size={25} /></button>
        </div>

        <div className=" flex overflow-hidden" ref={carouselContainer}>
          { memonizedStableProduct.length >= 1 ?
            memonizedStableProduct.map((product, index) =>{ 
            
              return <div key={index} className=" flex flex-shrink-0 mx-1">
                  <Product_cat product={product}/>
                </div>
            })
           : isloading ?
            <div className='w-[100%] flex justify-around items-center'>
              <SkeletonItem result = {false}/>
              <SkeletonItem result = {false}/>
              <SkeletonItem result = {false}/>
              <SkeletonItem result = {false}/>

            </div> 

           : memonizedproductData.length >=1 ?
           memonizedproductData.map((product, index) => {
            
            return <div key={index} className=" flex flex-shrink-0 mx-1">
                  <Product_cat product={product}/>
                </div>
          })
           : <div className='w-[100%] flex justify-center items-center'>Sorry No Product Found</div>
          
          
          }
        </div>

      </div>

    </div>
  )
}

export default Recent_launch;
