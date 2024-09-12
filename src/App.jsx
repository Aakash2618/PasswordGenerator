import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength]=useState(8);
  const [password, setPassword]=useState();
  const [numberical, setNumberical]=useState(false)
  const [character, setCharacter]=useState(false)
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberical) str+="1234567890";
    if(character) str +="!@#$%&*{})("
    for(let i=1;i<=length;i++){
      let random = Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(random)
    }
    setPassword(pass)
  },[numberical,character,length,setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[numberical,character,length])
  const passwordRef=useRef(null)
  const copyToClipboard=()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }
  return (
    <>
      <div className='w-screen h-screen p-3'>
        <div className='h-1/3 w-1/2 bg-gray-500 mx-auto my-5 rounded'>
          <div className="w-full flex justify-center">
            <input type="text" value={password} ref={passwordRef} readOnly className='bg-white rounded-l-md py-1 px-2 text-black outline-none border-none w-2/3 h-10 mt-4'/>
            <button className='bg-blue-600 h-10 mt-4 px-4 rounded-r-md hover:bg-blue-700' onClick={copyToClipboard}>Copy</button>
          </div>
          <div className="mt-6 mx-auto flex justify-around w-3/4 items-center">
            <div className="flex-row items-center">
              <input type="range" className="cursor-pointer" id='range' min={6} max={100} value={length} onChange={(e)=>setLength(e.target.value)} />
              <label htmlFor="range">  {length}</label>
            </div>
            <div  className="flex flex-row items-center gap-1">
              <input type="checkbox" id='numerical' className='w-5 h-5 border-none outline-none' onChange={()=>setNumberical(prev=>!prev)} />
              <label htmlFor="numerical">Numerical</label>
            </div>
            <div className="flex flex-row items-center gap-1">
              <input type="checkbox" id='character' defaultChecked={numberical} className='w-5 h-5 border-none outline-none' onChange={()=>setCharacter(prev=>!prev)} />
              <label htmlFor="character">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
