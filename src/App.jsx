import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(5);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [color,setColor] = useState("")
  const [btntxt, setBtntxt] = useState("")

  // useRef hook;
  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    // copy upto 20 digits
    passwordRef.current?.setSelectionRange(0,20)
    setColor("bg-green-700")
    setBtntxt("copied")
    window.navigator.clipboard.writeText(password)
  },[password])


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%^&*()_?{}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length, numAllowed, charAllowed,setPassword]);

  useEffect(()=>{
    passwordGenerator()
    setBtntxt("copy")
    setColor("bg-blue-600")
  },[length, numAllowed, charAllowed, passwordGenerator])

  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center text-xl my-3">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />

          <button onClick={copyPassToClipboard} className={`cursor-pointer outline-none ${color} text-white px-3 py-0.5 shrink-0`}>
            {btntxt}
          </button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />

            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setnumAllowed((prevValue) => !prevValue);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Special Chars</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
