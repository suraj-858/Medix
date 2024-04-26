import Dropdown_Cat from "./Dropdown_Cat";
import { useAppSelector } from "../redux/store";
import Loader from "./Loader";
import { useState } from "react";
import { subCategoryItemHolder } from "../Types/authType";

interface categoryProps {
    mobileisLoading: boolean
}



const Cat_mobile = ({ mobileisLoading}: categoryProps) => {   

    const { isLoading, userCategory} = useAppSelector(state => state.category)
    const [subCategoryItemHolder, setSubCategoryItemHolder] = useState<subCategoryItemHolder>([])


  return (

        <div className="flex h-10 border-[1px] my-2  justify-evenly ">
            { mobileisLoading ? <Loader/> : userCategory && userCategory?.map((category, categoryIndex) =>{

                return(
                    <div key={categoryIndex} className="h-[100%]"
                     onMouseEnter={() =>{
                        setSubCategoryItemHolder(category?.subCategory)
                     }}
                     >
                        <Dropdown_Cat categoryHeader={category?.categoryName} categoryItem={subCategoryItemHolder} isLoading = {isLoading} />
                       
                    </div>
                )
            })}
        </div>
  )
}

export default Cat_mobile