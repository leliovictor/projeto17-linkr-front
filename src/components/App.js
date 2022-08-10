import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";

import "../assets/styles/reset.css";
import "../assets/styles/style.css";
//import LoginPage from "./LoginPage";
import NewPost from "./NewPost"

export default function App() {
  const [data, setData] = useState({});

  return (
    <UserContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewPost />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
