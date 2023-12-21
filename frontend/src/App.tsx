import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Logo from "./components/Logo";
import { useCookies } from "react-cookie";

type User = {
  username: string;
};

function App() {
  const [cookies, setCookies] = useCookies(["user"]);
  return (
    <div className="container mx-auto m-0 h-full">
      <div className="flex flex-row justify-evenly items-center m-20 bg-white h-dvh rounded">
        <div className="basis-2/3">
          <div className="flex p-20 items-center justify-evenly">
            <BrowserRouter>
              <Routes>
                {cookies.user ? (
                  <Route path="/" element={<Home />} />
                ) : (
                  <Route path="/" element={<Signin />} />
                )}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        <div className="basis-1/3 bg-eingang w-200 h-dvh items-center  rounded">
          <div className="flex p-20 items-center justify-evenly">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
