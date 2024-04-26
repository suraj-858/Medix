import { useContext, useMemo, useState } from 'react'
import { useAppSelector } from '../redux/store';
import Loader from './Loader';
import { authContext } from '../context/AuthProvider';
import { subCategoryItemHolder } from '../Types/authType';

interface categoryProps {
  isloading: boolean
}

const Cat_sideExp = ({isloading }: categoryProps) => {
  const {categoryData, userCategory } = useAppSelector(state => state.category)

  const memonizedCategoryValue = useMemo(() =>{
    if(userCategory.length >= 1){
      return userCategory
    }else{
      return categoryData && categoryData
    }
  }, [userCategory, categoryData])

  const [subCategoryExtract, setSubCategoryExtract] = useState<subCategoryItemHolder>([])
  const { selectSubCategoryName, setSelectSubCategoryName } = useContext(authContext);
  const [sideExpand, setSideExpand] = useState(false)

  return (
    <div className='w-full h-aut0 absolute bg-white rounded-lg border-2 border-slate-300 z-0'>

      {isloading ? (<div className='w-[full] flex justify-center items-center'>
        <Loader />
      </div>) :
        (
          <>
            <div className=" hover:bg-green-100/70 hover:text-green-700 cursor-pointer  px-2 py-2 text-slate-600 font-semibold text-md" onClick={() =>{
              if(selectSubCategoryName !== ""){
                setSelectSubCategoryName("")
              }
            }}>
              All
            </div>
            <hr className='border-slate-300' />

            {memonizedCategoryValue && memonizedCategoryValue?.map((category, catIndex) => {

              return (
                <div key={catIndex}>
                  <div className=" hover:bg-green-100/70 hover:text-green-700 cursor-pointer  px-2 py-2 text-slate-600 font-semibold text-md" onMouseEnter={() => {
                    setSideExpand(true)
                      setSubCategoryExtract(category.subCategory)
                  }}
                  onMouseLeave={() => setSideExpand(false)}
                  > {category?.categoryName}</div>
                  <hr className='border-slate-300' />
                </div>
              )
            })}
          </>
        )
      }

      <div className={` ${sideExpand ? "" : "hidden"}  h-full top-0 left-[100%] absolute w-[250px]`}onMouseEnter={() => setSideExpand(true)}onMouseLeave={() => setSideExpand(false)} >

        <ul className=" h-auto w-[240px] float-right bg-white rounded-lg border-2 border-slate-300 py-2 " >

          { subCategoryExtract.length === 0 ? <span className=' flex justify-center'>No sub category added</span> : subCategoryExtract && subCategoryExtract?.map((subCategory, carBrandIndex) => {

            return (<div key={carBrandIndex}>
              <li className=' cursor-pointer p-2 font-semibold hover:bg-green-100/70 hover:text-green-600' onClick={() => {

                setSelectSubCategoryName(subCategory?.subCategoryName)

              }} >{subCategory?.subCategoryName}</li>
              <hr />
            </div>)
          })}

        </ul>
      </div>
    </div>
  )
}

export default Cat_sideExp