import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(5);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [btntxt, setBtntxt] = useState("");

  // useRef hook;
  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    setColor("bg-green-600");
    setBtntxt("Copied!");
    window.navigator.clipboard.writeText(password);
  }, [password]);

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
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
    setBtntxt("Copy");
    setColor("bg-blue-500");
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="w-full max-w-md mx-4 bg-gray-800 shadow-lg rounded-lg p-6 text-white">
          <h1 className="text-center text-2xl font-semibold text-orange-500 mb-6">
            Password Generator
          </h1>

          <div className="flex items-center shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              ref={passwordRef}
              value={password}
              className="outline-none w-full bg-gray-900 text-white placeholder-gray-400 p-3 text-center rounded-l-lg"
              placeholder="Generated Password"
              readOnly
            />
            <button
              onClick={copyPassToClipboard}
              className={`transition-all duration-300 ${color} text-white px-4 py-2 font-semibold rounded-r-lg hover:bg-green-500`}
            >
              {btntxt}
            </button>
          </div>

          <div className="mb-6">
            <label className="flex justify-between items-center text-sm font-medium">
              <span>Password Length: {length}</span>
              <input
                type="range"
                min={4}
                max={20}
                value={length}
                className="w-2/3 cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <label className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={numAllowed}
                onChange={() => setnumAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              Include Special Characters
            </label>
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-semibold py-2 rounded-lg mt-4"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
