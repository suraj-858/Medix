import { createContext,ReactNode, useState } from "react";

import { Auth, UserContextInterface, cartLoading, isOrderPlacedType, isProducType, selectSubCategoryName, selectedCatIdType } from "../Types/authType";

const defaultState  = {
  auth: {
    email: "", 
    password: "",
    roles: 0, 
    accessToken: ""
  }, 
  isProduct:{
    state: false,
    message: ""
  },
  isOrderPlaced: false,
  setIsOrderPlaced: (isOrderPlaced: isOrderPlacedType) => isOrderPlaced,
  selectedCatId: "",
  setSeletedCatId : (selectedCatId: selectedCatIdType) => selectedCatId,
  setIsProduct: (isProduct: isProducType) => isProduct,
  setAuth: (auth:Auth) => auth,
  selectSubCategoryName: "",
  setSelectSubCategoryName: (selectSubCategoryName: selectSubCategoryName) => selectSubCategoryName,
  cartLoading: false,
  setCartLoading: (cartLoading: cartLoading) => cartLoading

} as UserContextInterface

export const authContext = createContext(defaultState);

type UserProviderProps = {
  children: ReactNode
}

export default function AuthProvider({children}: UserProviderProps)
{

  const [auth, setAuth] = useState<Auth>({
    email: "", 
    password: "",
    roles: 0, 
    accessToken: ""
  });

  const [isProduct, setIsProduct] = useState<isProducType>({
    state: false, 
    message: ""
  })

  const [selectedCatId, setSeletedCatId] = useState<selectedCatIdType>("");
  const [selectSubCategoryName, setSelectSubCategoryName] = useState("")
  const [cartLoading , setCartLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  return (
    <authContext.Provider value={{auth , setAuth, isProduct, setIsProduct, selectedCatId, setSeletedCatId, setSelectSubCategoryName, selectSubCategoryName, setCartLoading, cartLoading, setIsOrderPlaced, isOrderPlaced}}>
      {children}
      </authContext.Provider>
  )

}