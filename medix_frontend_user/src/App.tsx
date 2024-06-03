import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CustomerSupport from './pages/CustomerSupport'
import AboutUs from './pages/AboutUs'
import C_login_01 from './components/C_login_01'
import C_signUp_01 from './components/C_signUp_01'
import C_signUp_02 from './components/C_signUp_02'
import User_Main_Shop from './pages/User_Main_Shop'
import Home_user from './pages/Home_user'
import ProductPage from './pages/ProductPage'
import Page_NotFound from './pages/Page_NotFound'
import Container from './pages/Container'
import CartPage from './pages/CartPage'
import RequireAuth from './components/RequireAuth'
import Dashboard_editor from './pages/Dashboard_editor'
import E_signUp from './components/E_signUp'
import Product from './pages/Product'
import Categories from './pages/Categories'
import Main_Category from './components/Main_Category'
import Sub_Category from './components/Sub_Category'
import { useEffect } from 'react'
import { useAppDispatch } from './redux/store'
import {  fetchAllProduct, fetchLatestProduct } from './redux/slice/productSlice'
import { fetchCategory } from './redux/slice/categorySlice'
import { getUserCart } from './redux/slice/cartSlice'
import SearchResult from './pages/SearchResult'
import OrderPage from './pages/OrderPage'
import Order_History from './components/Order_History'
import Recent_Order from './components/Recent_Order'
import { fetchOrder } from './redux/slice/orderSlice'

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const App = () => {
  const productDispatch = useAppDispatch()
  const customerId = sessionStorage.getItem('userId');
  useEffect(() =>{

    let isCanceled = false
    if(!isCanceled){
      productDispatch(fetchLatestProduct())
      productDispatch(fetchAllProduct())
      productDispatch(fetchCategory())
      customerId && productDispatch(getUserCart(customerId)) 
      customerId && productDispatch(fetchOrder(customerId))

    }
    return () =>{
      isCanceled = true
    }
  }, [])
  
  return (
      <Routes >
              <Route path='/' element={<Container />}>

              //general routes for every user
                <Route path='/*' element= {<Home/>}>
                   <Route index element={<Shop />} />
                   <Route path='customer_support' element={<CustomerSupport />} />
                   <Route path='about_us' element={<AboutUs />} />
                </Route> 

            //user login & signup routes
              <Route path='/user/*' element={<Login />}>
                <Route index element={<C_login_01 />} />
                <Route path='register_n&e' element={<C_signUp_01 />} />
                <Route path='register_ph&ps' element={<C_signUp_02 />} />
                <Route path='editor_register' element = {<E_signUp/>} />
              </Route>

            //only valid roles protected routes
                  <Route path='/costumer/*' element={<Home_user allowedRoles={[ROLES.User]} />}  >
                    <Route index element={<User_Main_Shop />} />
                    <Route path='product_page/:id' element={<ProductPage />} />
                    <Route path='cart' element = {<CartPage/>} />
                    <Route path='search' element = {<SearchResult/>} />
                    <Route path='order/*' element = {<OrderPage/>} >
                      <Route index element = {<Recent_Order/>}/>
                      <Route path='order_history' element = {<Order_History/>} />
                    </Route>
                  </Route>
            //Protected routes for Editor
            <Route path='/dashboard_editor/*' element = {<RequireAuth allowedRoles={[ROLES.Editor]} />} >
                  <Route index element = {<Dashboard_editor/>} />
                  <Route path='add_product/*' element = {<Product/>} />
                  <Route path='categories/*' element = {<Categories/>} >
                    <Route index element = {<Main_Category/>}/>
                    <Route path='sub_category' element = {<Sub_Category/>} />
                  </Route>
            </Route>

              //incase of page not found
              <Route path = '/page_Not_Found' element ={<Page_NotFound/>} />
            </Route>
            
      </Routes>
  )
}

export default App
