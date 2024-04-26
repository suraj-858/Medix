import Add_Categories from "./Add_Categories"
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import { fetchSubCategory } from "../redux/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Sub_Category = () => {

    const { data, isLoading } = useAppSelector(state => state.subCategory)
    const memonizeSubCatData = useMemo(() => data, [data])
    const subCategoryDispatch = useAppDispatch();
    const recievedData = useLocation().state

    const newSubCatHandler = useCallback(async (categoryName: string) => {
        return await axios.post(`/category/create_sub_category/${recievedData}`, { subCatName: categoryName })
            .then((response) => response)
            .catch((error) => error)
    }, [])

    useEffect(() => {

        let isCancelled = false;
        if (recievedData) {
            if (!isCancelled) {
                subCategoryDispatch(fetchSubCategory(recievedData))
            }
        }
        return () => {
            isCancelled = true
        }
    }, [recievedData])

    return (
        <div>
            <div className="">
                <h1 className="text-3xl font-semibold">Sub Categories</h1>
                <hr className="border-0 h-[2px] bg-black my-2 rounded-full bg-gradient-to-r from-black to-white to-70%" />
            </div>

            <section className="md:w-[70%] w-[100%] mx-auto max-w-[800px]">
                <Add_Categories Cat_Header="Add Sub Category" SCat_Adder={newSubCatHandler} categoryAddress = {recievedData}/>

            </section>

            <section className=" w-full md:w-[70%] max-w-[800px] flex justify-center mx-auto flex-col">
                <h1 className="md:text-xl font-semibold mt-1">Paracetamol</h1>
                <hr className="mb-4 border-0 h-[2px] bg-slate-300" />
                <table className=" w-[100%]">
                    <th>SN</th>
                    <th>Sub Category</th>
                    <th>Items</th>
                    <th>Modify</th>
                    {recievedData?.isloading ? <h1>Loading</h1> :
                        !isLoading && memonizeSubCatData.map((element, index) => {
                            return <tr key={index} className=" text-center h-[80px]">
                                <td className="text-sm md:text-base border-b-2">{index + 1}</td>
                                <td className="text-sm md:text-base border-b-2">{element?.name}</td>
                                <td className="text-sm md:text-base border-b-2">{element?.products.length}</td>
                                <td className=" flex justify-between py-2 flex-col items-center text-sm md:text-base border-b-2 h-[80px]">
                                    <button className="px-3 bg-slate-400 text-white py-[2px] rounded-md">edit</button>
                                    <button className="px-2 bg-red-500 text-white py-[2px] rounded-md">remove</button>
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