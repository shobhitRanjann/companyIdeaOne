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
import AddProduct, {Addproducts} from './components/addProduct/AddProduct.jsx'
import EditOrCreateProduct from './components/editOrCreateProduct/EditOrCreateProduct.jsx'
import PreviewPage from './components/previewPage/PreviewPage.jsx'
import UserDetails from './components/defaultPages/UserDetails.jsx'
import Testingpage from './components/ourAim/Testingpage.jsx'
import GetOrder, { Allorders } from './components/getorders/GetOrder.jsx'
import Ordersbooked, { Allcustomerorders } from './components/mybooking/Ordersbooked.jsx'
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
      <Route path='/addProduct' loader={Addproducts} element={<AddProduct/>}/>
      <Route path="/productdet" element={<EditOrCreateProduct/> }/>
      <Route path="/preview" element={<PreviewPage/>}/>
      <Route path='/userdetail' element={<UserDetails />}/>
      <Route path='/testingpage' element={<Testingpage/>} />
      <Route path='/ordersreceived' loader={Allorders} element={<GetOrder/>}/>
      <Route path='/booking' loader={Allcustomerorders} element={<Ordersbooked/>}/>
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
