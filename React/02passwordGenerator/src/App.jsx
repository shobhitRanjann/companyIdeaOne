import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const[length, setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[characterAllowed, setCharacterAllowed] = useState(false)
  const[password, setPassword] = useState("")
  const ref = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*{}[]~'"

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    ref.current?.select()
    ref.current?.setSelectionRange(0,4)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[numberAllowed,characterAllowed,length,passwordGenerator])
  return (
    <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800"><h1 className='text-center text-white'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={ref} readOnly/>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
              <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numberAllowed} id="numberinput" onChange={()=>{
                setNumberAllowed((prev) => !prev)
              }} />
              <label htmlFor="numberinput">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={characterAllowed} id='characterInput' onChange={()=>{
                setCharacterAllowed((prev)=> !prev)
              }} />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
    </>
  )
}

export default App
