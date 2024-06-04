import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$^&_+-";

    for(let i=1; i<length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char); 
    }

    setPassword(pass);

  }, [numAllowed, charAllowed, length, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    PasswordGenerator();
  }, [numAllowed, charAllowed, length, PasswordGenerator])

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className='text-gray-100 text-3xl mt-10'>Password Generator</h1>
        <div className="bg-zinc-800 h-14 w-3/5 pl-5 mt-16 rounded-2xl border-[1px] border-gray-600 flex items-center justify-between overflow-hidden">
          <input type="text" className='text-orange-400 font-semibold text-lg bg-inherit w-full h-full outline-none' 
          value={password}
          placeholder='password'
          readOnly
          ref={(passwordRef)}
          />
          <div className="bg-blue-500 w-24 h-full flex justify-center items-center">
            <button onClick={copyPasswordToClipboard} className='text-lg font-semibold'>Copy</button>
          </div>
        </div>
        <div className="w-3/5 mt-10 flex justify-evenly">
        <div className="text-white flex gap-2" >
          <input className='cursor-pointer' 
          type="range" 
          name="length" 
          id="length"
          value={length}
          min={8} 
          max={20} 
          onChange={(e) => (setLength(e.target.value))}
          />
          <label htmlFor="length">length({length})</label>
        </div>
        <div className="text-white flex gap-2">
          <input className='cursor-pointer' 
          type="checkbox" 
          defaultChecked={numAllowed}
          name="numbers" 
          id="numbers" 
          onChange={() => {
            setNumAllowed((prev) => !prev);
          }}
          />
          
          <label htmlFor="numbers">Number</label>
        </div>
        <div className="text-white flex gap-2">
          <input className='cursor-pointer' 
          type="checkbox" 
          defaultChecked={charAllowed}
          name="special" 
          id="special" 
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          />
          
          <label htmlFor="special">Special Charecter</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
