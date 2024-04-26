import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import ContentWrapper from './ContentWrapper'
import Recent_launch from './Recent_launch'
import { allUserProduct } from '../redux/slice/productSlice'


const Crousel = () => {

  const {productData} = useAppSelector(state => state.GetProduct)
  const productDispatch = useAppDispatch();
  useEffect(() =>{
    let isCanceled = false;
    productDispatch(allUserProduct())
  if(!isCanceled){
  }
  return () =>{
    isCanceled = true
  }

  }, [productData])

  return (
    <div className='flex justify-center items-center'>
        <ContentWrapper>
            <Recent_launch />
        </ContentWrapper>
        
    </div>
  )
}

export default Crousel