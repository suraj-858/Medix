import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import Search_Item_Cart from "../components/Search_Item_Cart";
import axios from "../api/axios";
import { productModel } from "../redux/dataType";
import SearchSkeleton from "../components/Skeleton_Loader/SearchSkeleton";


const SearchResult = () => {
  const location = useLocation().state;
  const searchValue = location?.searchValue
  const [searchValueResponse, setSearchValueResponse] = useState<productModel[]>([])
  const [serachDataLoading , setSearchDataLoading] = useState(false)
  console.log(searchValueResponse);
  
  useEffect(() =>{
    const searchData = async() =>{
      setSearchDataLoading(true);
      await axios.get(`/product/search_result?value=${searchValue}`)
      .then(response =>{
        setSearchDataLoading(false);
        if(response.status === 200){
          setSearchValueResponse(response?.data?.response)
        }
      }).catch(error =>{
        setSearchValueResponse(error)
      })
    }
    searchData();
  }, [searchValue])
  console.log(searchValueResponse);
  
  return (
    <div className=" min-h-[55vh]">
      <h3 className="my-3">Search Result for: {searchValue}</h3>
      <hr className="" />
      <div className="flex flex-wrap md:block justify-center">
      {
        serachDataLoading ? <>
        <SearchSkeleton/>
        <SearchSkeleton/>
        <SearchSkeleton/>
          </> :
        searchValueResponse.length >= 1 ? searchValueResponse.map((product, index) =>{
          
          return <Search_Item_Cart key={index} product = {product}/>
        }) : 
         <div>
          No product found!
        </div>
        }
        
        
      </div>

    </div>
  )
}

export default SearchResult