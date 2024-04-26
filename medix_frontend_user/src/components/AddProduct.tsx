import React, { useContext, useEffect, useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { axiosPrivate } from "../api/axios";
import { singleProductsType } from "../Types/authType";
import Loader from "./Loader";
import { FaCheck } from "react-icons/fa6";
import { authContext } from "../context/AuthProvider";
import { categoryModel } from "../redux/dataType";

interface productRefProps {
  ProductRef: any,
  scrollTop: boolean,
  singleProduct: singleProductsType,
  data: categoryModel[],
  isloading: boolean
}
type subCategoryTypes = {
  subCategoryId: string,
  subCategoryName: string
}[]

const AddProduct = ({ ProductRef, scrollTop, singleProduct, data, isloading }: productRefProps) => {

  const { isProduct, setIsProduct } = useContext(authContext)
  const [productName, setProductName] = useState<string>("haha");
  const [Price, setPrice] = useState<string>();
  const [discount, setDiscount] = useState<string>();
  const [category, setCategory] = useState<string>("hello");
  const [Sub_Category, setSubCategory] = useState<string>("hello");
  const [composition, setComposition] = useState<string>();
  const [Description, setDescription] = useState<string>();
  const [shipping, setShipping] = useState<string>("free");
  const [productPicture, setProductPicture] = useState<File>();
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const [isRetrivedImage, setIsRetrivedImage] = useState<string>();
  const [isValidEntry, setIsValidEntry] = useState(false);
  const [requiredMessage, setRequiredMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [subCategoryArray, setSubCategoryArray] = useState<subCategoryTypes>();

  console.log(data);

  const shippingRef = useRef<any>();
  const ProductNameRef = useRef<any>();
  const PriceRef = useRef<any>();
  const discountRef = useRef<any>();
  const categoryRef = useRef<any>();
  const Sub_CategoryRef = useRef<any>();
  const compositionRef = useRef<any>();
  const DescriptionRef = useRef<any>();

  useEffect(() => {
    if (scrollTop && singleProduct) {

      setIsUpdateProduct(true);
      setProductName(singleProduct.productName);
      setPrice(singleProduct.Price);
      setDiscount(singleProduct.Discount);
      setCategory(singleProduct.Category);
      setSubCategory(singleProduct.Sub_Category);
      setComposition(singleProduct.Composition);
      setDescription(singleProduct.Description);
      setShipping(singleProduct.Shipping);
      setIsRetrivedImage(singleProduct.productImageDetails.ImageURL)

    }

  }, [scrollTop])

  const userId = sessionStorage.getItem('userId')

  const productHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    const productDetails = new FormData();

    if (productName && Price && discount && category && Sub_Category && composition && Description && shipping) {
      if (productPicture) {
        productDetails.append("imageProduct", productPicture)
      }
      productDetails.append("productName", productName)
      productDetails.append("price", Price)
      productDetails.append("discount", discount)
      productDetails.append("category", category)
      productDetails.append("subCategory", Sub_Category)
      productDetails.append("composition", composition)
      productDetails.append("shipping", shipping)
      productDetails.append("description", Description)
    }

    try {

      if (isValidEntry) {

        if (isUpdateProduct) {
          const response = await axiosPrivate.post(`/product/updateProduct/${singleProduct?._id}`, productDetails);
          if (response.status === 200) {
            setIsProduct({ state: true, message: "Product Updated" })
            setIsLoading(false);
            setProductName("");
            setPrice("");
            setDiscount("");
            setCategory("");
            setSubCategory("");
            setComposition("");
            setDescription("");
            setShipping("");
            setIsRetrivedImage("")
            setProductPicture(undefined)
            setRequiredMessage("")

          }

        } else {
          const response = await axiosPrivate.post(`/product/createProduct/${userId}`, productDetails);
          if (response.status === 200) {
            console.log(response, "Product Created Successfully");
            setIsProduct({ state: true, message: "Product Added" })
            setIsLoading(false);
            setRequiredMessage("")
            setProductName("");
            setPrice("");
            setDiscount("");
            setCategory("");
            setSubCategory("");
            setComposition("");
            setDescription("");
            setShipping("");
            setIsRetrivedImage("")
            setIsUpdateProduct(false);
            setProductPicture(undefined)
          }
        }

      } else {
        setRequiredMessage("All Fields are required!")
      }


    } catch (error) {
      setIsProduct({ state: false, message: "Error Occured" })
      setIsLoading(false);
      console.log(error);
    }
  }
  setTimeout(() => {
    if (isProduct.state) {
      setIsProduct({ state: false, message: "" })
      setIsUpdateProduct(false);
    }
  }, 5500);

  useEffect(() => {

    if (productName && Price && discount && composition && Description) {
      if (productPicture || isRetrivedImage) {

        setIsValidEntry(true);
        setRequiredMessage("")

      }
      else {
        setIsValidEntry(false);
        setRequiredMessage("All Fields are required!")

      }

    } else {
      setIsValidEntry(false);

    }

  }, [productName, Price, discount, composition, Description, productPicture, isRetrivedImage])


  return (
    <section className="mt-5 flex justify-center flex-shrink lg:w-[60%] w-[95%] lg:max-w-[900px] max-w-[600px] gap-10 z-0 " ref={ProductRef}>
      <form className="lg:flex p-4 bg-[#faf8fa] rounded-lg border-slate-400 w-full " encType="multipart/form-data" method="post">
        <div className=" mx-4 lg:w-[50%]">
          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required className="flex">Product Name{!productName && <p className="ml-2 text-red-500">*</p>}</label>
            <input type="text" id="pname" className={` my-1 border-2 p-2 rounded-md
               border-slate-400 outline-none focus:border-blue-500 
               focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)]`}
              ref={ProductNameRef}
              value={productName}
              onChange={(e) => {
                e.preventDefault();
                setProductName(e.target.value);
              }} required />
          </div>

          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required className="flex">Price{!Price && <p className="ml-2 text-red-500">*</p>}</label>
            <input type="text" id="pname" className=" my-1 border-2 p-2 rounded-md
               border-slate-400 outline-none focus:border-blue-500 
               focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)]"
              ref={PriceRef}
              value={Price}
              onChange={(e) => {
                e.preventDefault();
                setPrice(e.target.value);
              }} required />
          </div>

          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required className="flex">Discount{!discount && <p className="ml-2 text-red-500">*</p>}</label>
            <input type="text" id="pname" className=" my-1 border-2 p-2 rounded-md border-slate-400 outline-none
               focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)]"
              ref={discountRef}
              value={discount}
              onChange={(e) => {
                e.preventDefault();
                setDiscount(e.target.value);
              }}
              required
            />
          </div>

          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required >Category</label>
            <select name="" id="category" defaultValue={data[0]?.subCategory[0]?.subCategoryName} className=" my-1 border-2 p-2 rounded-md border-slate-400 outline-none"
              ref={categoryRef}
              value={category}
              onChange={(e) => {
                e.preventDefault();
                setCategory(e.target.value)

                data.forEach(element => {
                  if(element.categoryName === e?.target?.value){
                    setSubCategoryArray(element?.subCategory);
                  }
                });

              }} required>
              {data && data.map((category, index) => {
                return <option key={index} value={category?.categoryName}>{category?.categoryName}</option>
              })}

            </select>
          </div>

          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required>Sub Category</label>
            <select name="" id="category" className=" my-1 border-2 p-2 rounded-md border-slate-400 outline-none"
              ref={Sub_CategoryRef}
              value={Sub_Category}
              onChange={(e) => {
                e.preventDefault();
                setSubCategory(e.target.value)
              }} required>

              {subCategoryArray ? subCategoryArray?.map((subCategory, index) => {
                return <option key={index} value={subCategory?.subCategoryName}>{subCategory?.subCategoryName}</option>

              }): data && data[0]?.subCategory?.map((subCategory, index) => {
                return <option key={index} value={subCategory?.subCategoryName}>{subCategory?.subCategoryName}</option>
              })}
            </select>
          </div>

          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required className="flex">Composition {!composition && <p className="ml-2 text-red-500">*</p>}</label>
            <textarea name="composition_name" rows={4} className=" w-[100%] my-1 border-2 p-2 rounded-md
               border-slate-400 outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)]"
              ref={compositionRef}
              value={composition}
              onChange={(e) => {
                e.preventDefault();
                setComposition(e.target.value)
              }} required />
          </div>
        </div>

        <div className="mx-4 lg:w-[50%] flex flex-col flex-wrap">

          <div className=" flex flex-col my-4">
            <label htmlFor="pname" aria-required>Shipping Cost</label>
            <input type="text" id="pname" className=" my-1 border-2 p-2 rounded-md border-slate-400 outline-none
               focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)]"
              ref={shippingRef}
              value={shipping}
              onChange={(e) => {
                e.preventDefault();
                setShipping(e.target.value)
              }} required />
          </div>
          <div className=" flex flex-col my-2">
            <label htmlFor="pname" aria-required className="flex">Description {!Description && <p className="ml-2 text-red-500">*</p>}</label>
            <textarea name="composition_name" rows={4} className=" w-[100%] my-1 border-2 p-2 rounded-md
               border-slate-400 outline-none focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)]"
              ref={DescriptionRef}
              value={Description}
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value)
              }} required />
          </div>

          <div className=" flex flex-col  my-2">
            <label htmlFor="pname" aria-required className="flex">Product Image {!productPicture && <p className="ml-2 text-red-500">*</p>}</label>

            <span className="relative w-[12em] h-[12em]">
              <input type="file" id="file_input" name="imageProduct" className="hidden"

                onChange={async (e) => {
                  const files = e.target.files;
                  if (files && files?.length > 0) {
                    const file = files[0]
                    setProductPicture(file);
                    setIsRetrivedImage(URL.createObjectURL(file));
                  }
                }}
                required
              />
              <label htmlFor="file_input" className=" absolute productImage my-1 border-[3px] p-2
               rounded-md border-dashed border-slate-400 outline-none focus:border-blue-500
                focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)] w-full h-full z-20 "></label>

              <img src={isRetrivedImage} className={`w-full h-full p-2 z-0 object-cover
               object-center ${productPicture ? "bg-black/10" : ""} rounded-lg `} />

              <LuPlus className="absolute top-[45%] left-[45%] text-2xl text-slate-400" />
              <p className="text-sm text-slate-400 py-2 flex flex-wrap h-10 ">{productPicture?.name}</p>
            </span>
          </div>
          <p className="h-6 mt-5 text-center font-semibold text-red-600">{requiredMessage}</p>
          <div className=" w-full mt-1 flex justify-center items-center">

            <button className={` ${isUpdateProduct ? "bg-green-500" : "bg-blue-500"} ${!isValidEntry ? "opacity-75 cursor-not-allowed" : " cursor-pointer"} flex justify-center items-center w-[100%] px-3 py-3 text-white font-semibold`}
              onClick={(e) => {
                productHandler(e)
                setIsLoading(true);
              }}
              disabled={!isValidEntry ? true : false}
            > <span className="mx-3">{isProduct.state ? <FaCheck size={24} /> : isLoading ? <Loader /> : ""}</span>{isUpdateProduct ? isProduct.state ? isProduct.message : "Update Product" : isProduct.state ? isProduct.message : "Add Product"}</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddProduct