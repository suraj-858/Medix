import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import './Skeleton_Loader/Skeleton.css'
import Product_cat from './Product_cat'
import { productsType } from '../Types/authType'
import axios from '../api/axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { pushLatestProduct } from '../redux/slice/productSlice'
import SkeletonItem from './Skeleton_Loader/SkeletonItem'


interface selectedSubCategoryProps {
    selectedSubCategory: string
}

const Cat_Result = ({ selectedSubCategory }: selectedSubCategoryProps) => {

    const { latestProduct, isloading } = useAppSelector(state => state.GetProduct)
    const productDispatch = useAppDispatch();
    const [isIndexFull, setIsIndexFull] = useState(false);
    const [haveArrayData, setHaveArrayData] = useState(false);

    const memonizedLatestProduct = useMemo((): productsType => {

        if (selectedSubCategory === "") {
            return latestProduct && latestProduct?.stableProduct
        } else {
            return latestProduct && latestProduct?.stableProduct?.filter(product => product?.Sub_Category === "parafixin")
        }
    }, [latestProduct, selectedSubCategory])

    const loadMoreData = async () => {
        await axios.get(`/product/get_latest_products?lastIndex=${latestProduct.nextIndex}`)
            .then(response => {
                if (response.status === 200) {
                    productDispatch(pushLatestProduct(response?.data))
                }
                if (response.status === 204) {
                    setIsIndexFull(true)
                }
            })
            .catch(error => {
                console.log(error);

            })
    }
    useEffect(() => {
        if(memonizedLatestProduct.length === undefined){
            alert('Please connect to the internet')
        }

        const timmer = setTimeout(() => {
            if (memonizedLatestProduct?.length < 1 && memonizedLatestProduct !== undefined) {
                setHaveArrayData(true);
            } else {
                setHaveArrayData(false)
            }
        }, 6000);

        return () => {
            clearTimeout(timmer)
            setHaveArrayData(false)
        }

        
    }, [memonizedLatestProduct])

    
    
    return (
        <div id='scrollablediv' className='flex flex-wrap bg-gray-100/10 md:mx-auto w-[100%] md:h-[630px] lg:ml-3 justify-center items-center rounded-lg overflow-y-scroll border-2 border-slate-300' >
            {memonizedLatestProduct?.length < 1 || isloading ? <div className='w-[100%] flex justify-around flex-wrap align-center m-3 gap-[10px] overflow-y-hidden'>{
                haveArrayData ? <>
                    <div>No product found in selected category</div>
                </> :
                    <>
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                        <SkeletonItem result={true} />
                    </>
            }
            </div> :

                <InfiniteScroll
                    className='flex flex-wrap justify-around w-[100%] h-full mx-auto'
                    dataLength={memonizedLatestProduct ? memonizedLatestProduct?.length: 0}
                    next={loadMoreData}
                    hasMore={!isIndexFull}
                    loader={<div className='w-[100%] flex flex-wrap justify-around items-center align-middle m-10 gap-[10px] overflow-y-hidden'>
                        {memonizedLatestProduct?.length >= 1 ?
                        <>
                            <SkeletonItem result={true} />
                            <SkeletonItem result={true} />
                            <SkeletonItem result={true} />
                            <SkeletonItem result={true} />
                        </> : ""}</div>}
                    endMessage={
                        <p style={{ textAlign: 'center', width: '100%', margin: '10px 0' }}>
                            {memonizedLatestProduct?.length >= 1 ? <b>No product to show</b> : ""}
                        </p>
                    }
                    scrollableTarget='scrollablediv'
                >
                    {memonizedLatestProduct && memonizedLatestProduct.length >= 1 &&
                        memonizedLatestProduct?.map((product, index) => <div key={index}><Product_cat product={product} /></div>)
                    }

                </InfiniteScroll>

            }
        </div>
    )
}

export default Cat_Result;
