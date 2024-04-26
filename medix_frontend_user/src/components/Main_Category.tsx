import { useNavigate } from "react-router-dom"
import Add_Categories from "./Add_Categories";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "../api/axios";
import Toast from "./Toast";
import { AxiosResponse } from "axios";
import { fetchCategory } from "../redux/slice/categorySlice";


const Main_Category = () => {

    const categoryDispatch = useAppDispatch();

    //fetching category response
    const { data, isLoading } = useAppSelector(state => state.category)
    const memonizedCategoryData = useMemo(() => data, [data])


    const [removeCatResponse, setRemoveCatResponse] = useState<AxiosResponse>()
    const userId = sessionStorage.getItem("userId");

    const handleNewCategory = useCallback(async (categoryName: string) => {
        return await axios.post('/category/create_category', { catName: categoryName, creatorId: userId })
            .then(response => response)
            .catch(error => error)

    }, [])

    const handleRemoveCategory = useCallback(async (categoryId: string) => {
        return await axios.delete(`/category/delete_category/${categoryId}`)
            .then(response => response)
            .catch(error => error)

    }, [])


    const navigate = useNavigate();
    console.log(removeCatResponse)

    useEffect(() =>{
        let isCanceled = false;
        if(!isCanceled && removeCatResponse){
            setTimeout(() => {
                setRemoveCatResponse(undefined)
            }, 6500);
        }
        return() =>{
            isCanceled = true
        }
    },[removeCatResponse])

   
    return (
        <div className="w-full">
            {removeCatResponse?.status === 200 && <Toast toastMessage={removeCatResponse?.data?.message} />}

            <div className=" mb-8">
                <h1 className="text-3xl font-semibold">Categories</h1>
                <hr className="border-0 h-[2px] bg-black my-2 rounded-full bg-gradient-to-r from-black to-white to-70%" />
            </div>

            <section className="md:w-[70%] w-[100%] mx-auto max-w-[800px]">
                <Add_Categories Cat_Header="Add New Category" SCat_Adder={handleNewCategory} />
            </section>

            <section className="w-full flex justify-center flex-col items-center ">
                <div className=" w-[100%] flex flex-col items-center">
                    <p className="md:text-lg text-base font-semibold text-slate-600">Categories created by you</p>
                    <hr className="  w-[100%] md:w-[50%] border-0 bg-gradient-to-r from-white from-0% via-slate-500 via-50% to-white to-100% h-[3px]  mt-1 mb-3" />
                </div>
                <table className="md:w-[70%] w-[100%] max-w-[800px]">
                    <th className="text-sm md:text-base bg-slate-200 py-1">SN</th>
                    <th className="text-sm md:text-base bg-slate-200">Category</th>
                    <th className="text-sm md:text-base md:block hidden bg-slate-200 py-1">Sub Category</th>
                    <th className="text-sm md:text-base md:hidden block bg-slate-200">Sub-Cat</th>
                    <th className="text-sm md:text-base bg-slate-200">Items</th>
                    <th className="text-sm md:text-base bg-slate-200">Modify</th>


                    {memonizedCategoryData.map((category, categoryIndex) => {

                        return <tr key={categoryIndex} className=" text-center h-[80px] cursor-pointer hover:bg-slate-200" onClick={() => {
                            const selectedCatId = category?._id;
                            navigate("/dashboard_editor/categories/sub_category", { state: selectedCatId })

                        }}>
                            <td className="text-sm md:text-base border-b-2">1</td>
                            <td className="text-sm md:text-base border-b-2">{category?.categoryName}</td>
                            <td className="text-sm md:text-base border-b-2">{category?.subCategory?.length}</td>
                            <td className="text-sm md:text-base border-b-2">13</td>
                            <td className=" flex justify-between py-2 flex-col items-center text-sm md:text-base border-b-2 h-[80px]">

                                <button className="px-3 bg-slate-400 text-white py-[2px] rounded-md">edit</button>
                                <button className="px-2 bg-red-400 text-white py-[2px] rounded-md hover:bg-red-600"
                                    onClick={async (event) => {
                                        event.stopPropagation();

                                        if (category) {
                                            const removeDataRes = await handleRemoveCategory(category?._id)
                                            if (removeDataRes.status === 200) {
                                                categoryDispatch(fetchCategory())
                                                setRemoveCatResponse(removeDataRes)
                                            }
                                        }
                                    }}
                                >remove</button>
                            </td>
                        </tr>
                    })
                    }
                </table>
            </section>
        </div>

    )
}

export default Main_Category