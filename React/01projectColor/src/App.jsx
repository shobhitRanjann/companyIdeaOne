import { useState } from "react"

function App() {
  const [color, setColor] = useState('olive');
  return (
    <>
      <div className="w-full h-screen duration-200" style={{backgroundColor: color}}>
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
            <button className="p-5 bg-red-600 rounded-s-full m-2 text-white" onClick={()=> setColor("red")}>Red</button>
            <button className="p-5 bg-green-600 rounded-3xl m-2 text-white" onClick={()=> setColor("green")} >Green</button>
            <button className="p-5 bg-yellow-600 rounded-3xl m-2 text-white" onClick={()=> setColor("yellow")}>Yellow</button>
            <button className="p-5 bg-black rounded-e-full m-2 text-white" onClick={()=> setColor("black")}>Black</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
