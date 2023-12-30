import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const routes = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App/>}>
      {/* <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/user/:userid' element={<User/>} />
      <Route path='/github' loader={githubLoader} element={<Github/>}/> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
