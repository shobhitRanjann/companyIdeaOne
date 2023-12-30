import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx'
import User from './components/users/User.jsx'
import Github,{githubLoader} from './components/github/Github.jsx'

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element: <App/>,
//     children:[
//       {
//         path: "",
//         element: <Home/>
//       },
//       {
//         path: "about",
//         element: <About/>
//       },
//       {
//         path: "contact",
//         element: <Contact/>
//       }
//     ]
//   }
// ])

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/user/:userid' element={<User/>} />
      <Route path='/github' loader={githubLoader} element={<Github/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
