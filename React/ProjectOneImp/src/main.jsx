import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomeBody from './components/defaultPages/HomeBody.jsx'
import SignIn from './components/defaultPages/SignIn.jsx'
import ContactUs from './components/contact/ContactUs.jsx'
import OurAim from './components/ourAim/OurAim.jsx'
import AboutUs from './components/about/AboutUs.jsx'
import SignUp from './components/defaultPages/SignUp.jsx'
import Trendings from './components/trending/Trendings.jsx'
import ProductList, { Allproducts } from './components/productList/ProductList.jsx'
import ProductDetail from './components/productList/ProductDetail.jsx'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomeBody/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/ouraim' element={<OurAim/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/trending' element={<Trendings/>} />
      <Route path='/products' loader={Allproducts} element={<ProductList/>} />
      <Route path='/detail' element={<ProductDetail/>}/>
      {/* <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/user/:userid' element={<User/>} />
      <Route path='/github' loader={githubLoader} element={<Github/>}/> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
