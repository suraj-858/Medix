import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { fetchCategory } from "../redux/slice/categorySlice"
import { useAppDispatch} from "../redux/store";
// import Order_Table from "../components/Order_Table";

const Categories = () => {

  const categoryDispatch = useAppDispatch();

  useEffect(() =>{
    let isCancelled = false
    if(!isCancelled){
        categoryDispatch(fetchCategory())
    }
    return () =>{
        isCancelled = true
    }
}, [])
  return (
    <section className="w-[100%] py-4 px-6">
      <Outlet/>
    </section>
  )
}

export default Categories