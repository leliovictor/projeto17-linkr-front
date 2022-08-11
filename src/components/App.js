import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";

import "../assets/styles/reset.css";
import "../assets/styles/style.css";
import LoginPage from "./LoginPage";
import Timeline from "./Timeline";
import SignUpPage from "./SignUpPage";
import TimelinePage from "./TimelinePage";

export default function App() {
  const [data, setData] = useState({});

  return (
    <UserContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          {/*<Route path="/timeline" element={<TimelinePage />} />*/}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
