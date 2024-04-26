import { useMemo } from 'react'
import { useAppSelector } from '../redux/store'
import Loader from './Loader'
import Product_cat from './Product_cat'
import { productsType } from '../Types/authType'

interface selectedSubCategoryProps {
    selectedSubCategory: string
}

const Cat_Result = ({selectedSubCategory}: selectedSubCategoryProps) => {

    const { stableProduct, isloading, productData } = useAppSelector(state => state.GetProduct)
    
    const memonizedStableProduct = useMemo(():productsType => {

        if(selectedSubCategory === ""){
            return stableProduct && stableProduct
        }else{
            return stableProduct && stableProduct.filter(product => product?.Sub_Category === "selectedSubCategory")
        }
    }, [stableProduct, selectedSubCategory])
        

    const memonizedproductData = useMemo(():productsType => {

        if(selectedSubCategory === ""){
            return productData && productData
        }else{
            return productData && productData.filter(product => product?.Sub_Category === "selectedSubCategory")
        }
    }, [productData, selectedSubCategory])
    

    return (
        <div className=' flex flex-wrap bg-gray-100/10  items-center w-[100%] md:h-[630px] lg:ml-3 lg:justify-start justify-center  rounded-lg overflow-y-scroll border-2 border-slate-300'>

            {memonizedStableProduct.length >= 1 ?
             memonizedStableProduct.map((product, index) => <div key={index}><Product_cat product={product}/></div>)
            : isloading ?
             <div className='w-[100%] flex justify-center items-center'><Loader /></div> 

            : memonizedproductData.length >=1 ?
            memonizedproductData.map((product, index) => <div key={index}><Product_cat product={product}/></div>)
            : <div className='w-[100%] flex justify-center items-center'>Sorry No Product Found</div>}
        </div>
    )
}

export default Cat_Result;