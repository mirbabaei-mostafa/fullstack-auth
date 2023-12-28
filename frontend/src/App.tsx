import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Logo from './components/Logo';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookies] = useCookies<string>(['user']);
  return (
    <div className="container mx-auto m-0 h-full">
      <BrowserRouter>
        <div className="flex flex-row justify-evenly items-center m-20 bg-white h-dvh rounded">
          <div className="basis-2/3">
            <div className="flex p-20 items-center justify-evenly">
              <Routes>
                {cookies.user ? (
                  <Route path="/" element={<Home />} />
                ) : (
                  <Route path="/" element={<Signin cookieFN={setCookies} />} />
                )}
                {cookies.user ? (
                  <Route path="/signin" element={<Profile />} />
                ) : (
                  <Route
                    path="/signin"
                    element={<Signin cookieFN={setCookies} />}
                  />
                )}
                {cookies.user ? (
                  <Route path="/profile" element={<Profile />} />
                ) : (
                  <Route
                    path="/profile"
                    element={<Signin cookieFN={setCookies} />}
                  />
                )}
                {cookies.user ? (
                  <Route path="/signup" element={<Profile />} />
                ) : (
                  <Route path="/signup" element={<Signup />} />
                )}
              </Routes>
            </div>
          </div>
          <div className="basis-1/3 bg-eingang w-200 h-dvh items-center  rounded">
            <div className="flex p-20 items-center justify-evenly">
              <Logo cookieFN={setCookies} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
