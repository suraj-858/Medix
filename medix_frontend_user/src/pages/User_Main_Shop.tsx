
import Cat_Result from "../components/Cat_Result"
import Category_desktop from "../components/Category_desktop"
import Featured_slider from "../components/Featured_slider"
import Crousel from "../components/Crousel"
import { useAppDispatch } from "../redux/store"
import { useContext, useEffect } from "react"
import { allProduct } from "../redux/slice/productSlice"
import { authContext } from "../context/AuthProvider";

const User_Main_Shop = () => {
  const { selectSubCategoryName } = useContext(authContext);
  const productDispatch = useAppDispatch();
 
  useEffect(() => {
    let isCanceled = false
    if (!isCanceled) {
      productDispatch(allProduct())
    }
    return () => {
      isCanceled = true
    }
  }, [productDispatch])
  
  return (
    <div className="z-0 flex justify-center flex-col mx-auto px-5">
      <Featured_slider />
      <div className="flex flex-col">
        <h1 className=" text-2xl md:text-left text-center font-semi-bold my-1">Browse Categories</h1>
        <hr className="mb-3 md:w-[20%] border-0 h-1 md:min-w-[250px] w-full bg-slate-500 bg-gradient-to-r from-blue-600 to-cyan-500" />
        <div className="lg:flex">
          <Category_desktop />
          <Cat_Result selectedSubCategory={selectSubCategoryName} />
        </div>
      </div>
      <div className="my-8">
        <h3 className="text-2xl font-semibold">Recent Launch</h3>
        <hr className="mb-3 w-[20%]  border-0 h-1 min-w-[220px] bg-slate-500 bg-gradient-to-r from-blue-600 to-cyan-500" />
        <Crousel />
      </div>
    </div>
  )
}

export default User_Main_Shop