import {  useState } from "react";
import Loader from "./Loader";
import { subCategoryItemHolder } from "../Types/authType";

type DropdownCatProps = {
    categoryHeader: string, 
    categoryItem: subCategoryItemHolder,
    isLoading: boolean

}

const Dropdown_Cat = ({categoryHeader, categoryItem, isLoading}: DropdownCatProps) => {

    const [dropdownopen, setdropdownopen] = useState(false);

    return (

        <div
        onMouseEnter={() => { setdropdownopen(!dropdownopen) }} 
        onMouseLeave={() => setdropdownopen(!dropdownopen)} 
        className=""
        >

            <div className=" cursor-pointer h-[100%] md:text-xl py-1 text-black  justify-center items-center border-[1px]
          hover:bg-green-100/70 hover:text-green-600 md:px-8 px-2 text-md ">{categoryHeader}</div>
            {dropdownopen && (

                <ul className={` ${dropdownopen ? "" : "hidden"}  absolute md:translate-x-0 translate-x-[-15%]
                bg-slate-100 md:w-[150px] flex flex-col flex-shrink-0 rounded-sm shadow-[-7px_10px_15px_4px_rgba(0,0,0,0.2)]`}>
                   
                    { isLoading ? <div className="w-full flex justify-center"><Loader/></div> : categoryItem && categoryItem.map((subcategory, subCategoryIndex) =>{
                        return( 
                        <div key={subCategoryIndex} className="">
                         <li className="px-4 py-2 hover:bg-green-500/10 hover:text-green-600 cursor-pointer">{subcategory?.subCategoryName}</li>
                            <hr className="border-slate-300" />
                        </div>)
                    })}

                </ul>


            )}

        </div>



    )
}

export default Dropdown_Cat;