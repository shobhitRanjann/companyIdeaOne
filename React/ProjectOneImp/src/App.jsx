import NavBar from './components/defaultPages/NavBar'
import {Outlet} from 'react-router-dom'
import { TokenProvider } from './context'
import { useState } from 'react'
import Footer from './components/defaultPages/Footer'

function App() {
  const [tokens,setTokens] = useState([])
  const addToken =(token)=>{
    setTokens({token})
    console.log('App   ',token)
  }
  return (
    <>
      <TokenProvider value={{tokens,addToken}}>
      <NavBar tokens={tokens}/>
      <Outlet/>
      <Footer/>
      </TokenProvider>
    </>
  )
}

export default App
