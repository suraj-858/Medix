import Add_Categories from "./Add_Categories"
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import {  useCallback, useMemo, useState } from "react";
import { fetchCategory, removeCreatorSubCategory } from "../redux/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { subCategoryModel } from "../redux/dataType";
import Loader from "./Loader";

const Sub_Category = () => {

    const { subCategoryData, isLoading } = useAppSelector(state => state.category)
    const subCategoryDispatch = useAppDispatch();
    const memonizeSubCatData = useMemo(() => subCategoryData, [subCategoryData])
    const creatorId = useLocation().state
    const newSubCatHandler = useCallback(async (categoryName: string) => {
        return await axios.post(`/category/create_sub_category/${creatorId}`, { subCatName: categoryName })
            .then((response) => response)
            .catch((error) => error)
    }, [])
    

    const [subCatLoading, setSubCatLoading] = useState(false)

    const handleRemoveSubCategory = async(element: subCategoryModel) => {
        setSubCatLoading(true)
        await axios.post(`/category/remove_sub_category/${element?._id}`)
            .then(response => {
                if (response.status === 200) {
                    setSubCatLoading(false)
                    subCategoryDispatch(removeCreatorSubCategory(element?._id))
                    subCategoryDispatch(fetchCategory())
                }
            }).catch(error => {
                console.log(error);
                setSubCatLoading(false)
            })

    }

    return (
        <div>
            <div className="">
                <h1 className="text-3xl font-semibold">Sub Categories</h1>
                <hr className="border-0 h-[2px] bg-black my-2 rounded-full bg-gradient-to-r from-black to-white to-70%" />
            </div>

            <section className="md:w-[70%] w-[100%] mx-auto max-w-[800px]">
                <Add_Categories Cat_Header="Add Sub Category" SCat_Adder={newSubCatHandler} categoryAddress={creatorId} />
            </section>

            <section className=" w-full md:w-[70%] max-w-[800px] flex justify-center mx-auto flex-col">
                <h1 className="md:text-xl font-semibold mt-1">Paracetamol</h1>
                <hr className="mb-4 border-0 h-[2px] bg-slate-300" />
                <table className=" w-[100%]">
                    <th>SN</th>
                    <th>Sub Category</th>
                    <th>Items</th>
                    <th>Modify</th>
                    {isLoading ? <h1>Loading</h1> :
                        !isLoading && memonizeSubCatData.map((element, index) => {
                            return <tr key={index} className=" text-center h-[90px]">
                                <td className="text-sm md:text-base border-b-2">{index + 1}</td>
                                <td className="text-sm md:text-base border-b-2">{element?.name}</td>
                                <td className="text-sm md:text-base border-b-2">{element?.products.length}</td>
                                <td className=" flex justify-between py-2 flex-col items-center text-sm md:text-base border-b-2 h-[90px]">
                                    <button className="px-3 bg-slate-400 text-white py-[2px] rounded-md" >edit</button>
                                    <button className="px-4 bg-red-500 text-white py-[6px] mt-2 rounded-md" onClick={async (e) => {
                                        e.preventDefault();
                                        handleRemoveSubCategory(element)
                                    }}>{subCatLoading ? <div className="px-4"><Loader/></div> : "Remove"}</button>
                                </td>
                            </tr>
                        })
                    }
                </table>
            </section>
        </div>

    )
}

export default Sub_Category