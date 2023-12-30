import { useState } from "react"
import Login from "./components/Login"
import Profile from "./components/Profile"
import UsercontextProvider from "./context/UsercontextProvider"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UsercontextProvider>
        <h1>React with chai</h1>
        <Login/>
        <Profile/>
      </UsercontextProvider>
    </>
  )
}

export default App
