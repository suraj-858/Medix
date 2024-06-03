import ContentWrapper from "../components/ContentWrapper"
import '../App.css';
import AddProduct from "../components/AddProduct";
import Recent_Product from "../components/Recent_Product";
import Editor_All_Product from "../components/Editor_All_Product";
import React, { useContext, useEffect, useRef, useState } from "react";
import { singleProductsType } from "../Types/authType";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Toast from "../components/Toast";
import { authContext } from "../context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchAllUserProduct } from "../redux/slice/productSlice";
import { fetchCategory } from "../redux/slice/categorySlice";


const Product: React.FC = () => {
  const {isProduct} = useContext(authContext);
  const productDispatch = useAppDispatch()
  const ProductRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(false);
  const { userCategory, isLoading } = useAppSelector(state => state.category)

  const [singleProduct, setSingleProducts] = useState<singleProductsType>({
    _id: "",
    userId: "", 
    productName: "",
    Price: "",
    Discount: "",
    Category: "",
    Sub_Category: "",
    Composition: "",
    Shipping: "",
    Description: "",
    productImageDetails:{
      ImageURL: "",
      publicId: ""
    },
    createdAt:  new Date(),
  });

  const AxiosPrivate = useAxiosPrivate();

  const userId = sessionStorage.getItem('userId')
  
  useEffect(() =>{
    userId && productDispatch(fetchAllUserProduct({AxiosPrivate, userId}))
    productDispatch(fetchCategory())
  },[])

  useEffect(() => {

    if (scrollTop) {
      const productRefHandler = () => {
        if (ProductRef.current) {
          ProductRef.current.scrollIntoView({ block: "end", behavior: "smooth" })
        }
      }
      productRefHandler();
    }
    setScrollTop(false);
  }, [scrollTop])

  return (
    <ContentWrapper>
     { isProduct.state && <Toast toastMessage={isProduct.message}/>}
      <h1 className="lg:text-3xl ml-8 mt-8 mb-4 md:text-2xl text-xl font-semibold" ref={ProductRef}>Add Product</h1>
      <section className="flex w-[100%] lg:flex-row flex-col lg:justify-evenly justify-center items-center">

        <AddProduct ProductRef={ProductRef} scrollTop = {scrollTop} singleProduct = {singleProduct} data = {userCategory} isloading = {isLoading} />

        <div className="lg:w-[30%] w-[95%] max-h-[650px] lg:my-0 my-10 max-w-[600px] rounded-md bg-[#faf8fa] overflow-y-auto">
          <Recent_Product />
        </div>
      </section>
      <section className="flex justify-center flex-col items-center mt-6 w-[90%] mx-auto">
        <h1 className="lg:text-2xl md:text-xl text-base font-semibold">Your Products</h1>
        <hr className="border-none h-[3px] bg-gradient-to-r from-cyan-500 to-blue-500 my-2 w-[20%] min-w-[180px]" />
        <Editor_All_Product setScrollTop={setScrollTop} setSingleProducts = {setSingleProducts} data = {userCategory} isLoading = {isLoading} />
      </section>
    </ContentWrapper>
  )
}

export default Product