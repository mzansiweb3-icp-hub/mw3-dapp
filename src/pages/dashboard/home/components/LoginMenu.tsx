import React, { useState } from "react";
import { useAuth } from "../../../../hooks/Context";


const LoginMenu = () => {
  const { isAuthenticated, login } = useAuth();
  const [showUPLogin, setShowUPLogin] = useState(false);

  return (
    <div className="absolute right-0 w-auto mt-2 py-2 bg-white border rounded shadow-xl">
      <button
        onClick={login}
        className="transition-colors  w-auto whitespace-nowrap duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-cyan-500 hover:text-white"
        type="button"
      >
        Internet Identity
      </button>
      <button
        onClick={() => setShowUPLogin(true)}
        className="transition-colors duration-200  w-auto whitespace-nowrap block px-4 py-2 text-normal text-gray-900 rounded hover:bg-cyan-500 hover:text-white"
        type="button"
      >
        Login with username
      </button>
      {/* {showUPLogin && <LoginWithUsernamePassword {...{ setShowUPLogin }} />} */}
    </div>
  );
};

export default LoginMenu;
