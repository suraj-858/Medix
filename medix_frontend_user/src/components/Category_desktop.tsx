import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import Cat_mobile from "./Cat_mobile"
import Cat_sideExp from "./Cat_sideExp"
import { CategoryHolder } from "../redux/slice/categorySlice"

const Category_desktop = () => {
  const {categoryData, isLoading} = useAppSelector(state => state.category)
  const categoryDispatch = useAppDispatch();
  useEffect(() =>{
    
    let isCanceled = false;
      categoryDispatch(CategoryHolder())
    if(!isCanceled){
    }
    return () =>{
      isCanceled = true
    }
  }, [categoryData])

  return (
    <div className="flex relative min-w-[260px] z-10">
      <div className="lg:block hidden">
        <Cat_sideExp isloading = {isLoading}/>
      </div>
        <div className="lg:hidden flex w-[100%] items-center justify-center">
        <Cat_mobile mobileisLoading = {isLoading}/>
        </div>
        
    </div>
  )
}

export default Category_desktop