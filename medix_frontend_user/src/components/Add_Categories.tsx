
import { AxiosResponse } from "axios";
import { useRef, useState, memo, useEffect } from "react"
import Toast from "./Toast";
import Loader from "./Loader";
import { BiCheck, BiError } from "react-icons/bi";
import { fetchCategory, fetchSubCategory } from "../redux/slice/categorySlice";
import { useAppDispatch } from "../redux/store";

interface addCatProps {
    Cat_Header: string,
    SCat_Adder: (categoryName: string) => Promise<any>, 
    categoryAddress?: string
}

const Add_Categories = ({ Cat_Header, SCat_Adder, categoryAddress }: addCatProps) => {

    const [showCategoryAdder, setShowCategoryAdder] = useState(false);
    const [categoryName, setCategoryName] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);
    const [newCatData, setNewCatData] = useState<AxiosResponse>()
    const CategoryDispatch = useAppDispatch();
    const categoryNameRef = useRef<any>();

    useEffect(() => {
        let isCancelled = false;
        if (newCatData && newCatData?.status >= 200 && !isCancelled) {
            setTimeout(() => {
                setNewCatData(undefined)
            }, 6500);
        }
        return () => {
            isCancelled = true
        }
    }, [newCatData])

    console.log(newCatData)
    return (
        <div className="w-[100%]">
            {newCatData && <Toast toastMessage={newCatData.data?.message} />}
            <div className="flex justify-between items-center md:mt-5 mt-3 mb-2">
                <h1 className=" font-semibold md:text-xl text-base">{Cat_Header}</h1>
                <button className=" bg-green-500 px-3 py-1 md:text-lg text-sm rounded-md text-white font-semibold" onClick={() => { setShowCategoryAdder(!showCategoryAdder) }}>{showCategoryAdder ? "Hide" : "Add +"}</button>
            </div>
            <hr className="mb-5 border-0 h-[2px] bg-slate-300" />

            <div className={`${!showCategoryAdder ? "h-0 overflow-hidden" : "max-h-[100px] md:h-[80px] h-[60px]"} transition-all duration-300 ease-in-out`}>
                <section className=" flex justify-center items-center mb-3">
                    <input type="text"
                        ref={categoryNameRef}
                        value={categoryName}
                        id="pname" className=" md:w-[70%] w-[100%]  my-1 border-2 md:p-2 p-1 rounded-md
                     border-slate-400 outline-none focus:border-blue-500 
                     focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)] md:mx-2"
                     disabled = {newCatData === undefined ? false : true}
                        required placeholder="Add Category"
                        onChange={(e) => {
                            e.preventDefault();
                            setCategoryName(e.target.value)
                        }}
                    />
                    <button className="mx-2 bg-blue-500  md:px-5 px-3 md:py-2 py-1 h-[44px] w-[80px] flex justify-center items-center rounded-md md:font-semibold md:text-lg text-base text-white"
                        onClick={async () => {
                                setIsLoading(true)
                                const userConsoledata = await SCat_Adder(categoryName)
                                console.log(userConsoledata)
                                if (userConsoledata?.data) {
                                    setNewCatData(userConsoledata);
                                    setCategoryName("")
                                    setIsLoading(false);
                                    if(userConsoledata?.status === 201 && categoryAddress)
                                    CategoryDispatch(fetchSubCategory(categoryAddress));
                                    
                                    if(userConsoledata?.status === 200)
                                    CategoryDispatch(fetchCategory());
                                    
                                }else{
                                    setNewCatData(userConsoledata?.response);
                                    setCategoryName("")
                                    setIsLoading(false);
                                }
                        }}

                    >{isLoading ? <Loader/> : newCatData?.status === 200 || newCatData?.status === 201 ? <BiCheck size={30} /> : newCatData && newCatData?.status >= 202 ? <BiError size={30} /> : "save"}</button>
                </section>
                <hr className="mb-2 h-[1px] border-slate-300" />
            </div>

        </div>
    )
}

export default memo(Add_Categories)