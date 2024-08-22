import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import noProductImage from '../assets/Images/noImage.png'
import { singleProductsType } from '../Types/authType';
import { useAppSelector } from '../redux/store';
import { categoryModel, productModel } from '../redux/dataType';
import Loader from './Loader';
import axios from '../api/axios';

interface refHandlerProps {
  setScrollTop: Dispatch<SetStateAction<boolean>>
  setSingleProducts: Dispatch<SetStateAction<singleProductsType>>
  data: categoryModel[]
  isLoading: boolean
}

const Editor_All_Product = ({ setScrollTop, setSingleProducts, data, isLoading }: refHandlerProps) => {

  const { productData } = useAppSelector(state => state.Product)

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const [filteredProduct, setFilteredProduct] = useState<productModel[]>()
  const [isRemovedItemRolling, setIsRemovedItemRolling] = useState<boolean>(false);

  useEffect(() =>{
    let isCanceled = false;
    if(!isCanceled){
      setFilteredProduct(productData);
    } 

    return () =>{
      isCanceled = true;
    }
  },[productData])

  const handleRemoveItems = async(product:productModel) =>{
    try {
      setIsRemovedItemRolling(true)
      await axios.post(`/product/remove_product/${product?._id}`).then(response =>{
        console.log(response)
          setIsRemovedItemRolling(false);
      })
      .catch(error =>{
        console.log(error);
        setIsRemovedItemRolling(false);
      })
    } catch (error) {
      console.log(error);
      setIsRemovedItemRolling(false);
    }
  }

  return (
    <div className="w-full bg-[#faf8fa] my-5 rounded-md">
      <nav className="h-16 bg-slate-300 rounded-t-md justify-evenly items-center flex">
        <input type="text" id="pname" className=" my-1 border-2 p-2 rounded-md border-slate-400 outline-none
         focus:border-blue-500 focus:shadow-[0px_0px_1px_4px_rgba(28,134,238,0.5)] max-w-[500px] w-[40%] " placeholder='Search Product' onChange={(e) =>{
          e.preventDefault();
          const searchValue = e?.target?.value;
          const filteredArray = productData.filter(item =>{
            return Object.values(item).some(value =>{
             return typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
            })
          }) 
          if(filteredArray){
            setFilteredProduct(filteredArray);
          }

         }} />
        <select name="" id="myProduct_Cat" defaultValue ="All" className='p-2 rounded-lg text-slate-600 cursor-pointer outline-none' onChange={e => {
            const selectedCategory = e?.target?.value;
            if(selectedCategory === 'All'){
              setFilteredProduct(productData);
            }
            else{
              const filteredProjection = productData.filter(product => product?.Category === "hello")
              setFilteredProduct(filteredProjection);
            }
        }}>
          <option value="All" className=''>All</option>
          {data && data.map((category, categoryIndex) => {
            return <option key={categoryIndex} value={category?.categoryName} className=' cursor-pointer'>{category?.categoryName}</option>
          })}

        </select>
      </nav>
      <section className="max-h-[600px] flex flex-wrap justify-evenly  overflow-y-scroll  min-h-[40px] px-4">

        { isLoading ? <Loader/> : filteredProduct && filteredProduct.map((product, productIndex) => {

          const date = product.createdAt;
          const dateObject = new Date(date);
          const fullYear = dateObject.getFullYear();
          const fullMonth = dateObject.getMonth();
          const fullDate = dateObject.getDate();

          const actualDate = fullYear + "-" + monthNames[fullMonth] + "-" + fullDate;

          return (
            <div className=" bg-white w-fit border-2 m-4 lg:min-h-[430px] lg:max-w-[320px] min-h-[390px] max-h-[410px] max-w-[280px] " key={productIndex}>

              <img src={product?.productImageDetails?.ImageURL ? product?.productImageDetails?.ImageURL : noProductImage} alt="No image found"
                className={`h-[60%] md:h-[65%] w-full flex object-cover object-center ${product?.productImageDetails?.ImageURL ? "" : "opacity-60"} `} />

              <h1 className='lg:ml-6 ml-3 font-semibold lg:text-xl text-md my-1'>{product?.productName}</h1>

              <span className='flex justify-between lg:px-6 px-3'>
                <h2 className=' font-semibold lg:text-xl text-md'>Price: {product?.Price}</h2>
                <h2 className='font-semibold lg:text-xl text-md text-green-500'>500 left</h2>
              </span>
              <p className='lg:mr-6 mr-3 text-slate-400 text-sm text-right'><i>Created At: {actualDate}</i></p>
              <div className="button_component flex justify-between lg:px-6 px-3">
                <button className='px-5 py-2 my-3 bg-slate-300 font-semibold text-slate-600 rounded-lg flex justify-evenly hover:bg-slate-300/80 transition duration-200 ease-in-out items-center' onClick={() => {
                  setScrollTop(true)
                  product && setSingleProducts(product);

                }}> <MdEditDocument /> Edit</button>
                <button className='px-3 py-2 my-3 bg-red-500 font-semibold text-white rounded-lg flex justify-evenly hover:bg-red-500/80 transition duration-200 ease-in-out items-center' onClick={async() =>{
                 handleRemoveItems(product);
                 
                }}><MdDelete />{isRemovedItemRolling ? <Loader/> : "Remove"}</button>
              </div>
            </div>)

        })}
      </section>
    </div>
  )
}

export default Editor_All_Product