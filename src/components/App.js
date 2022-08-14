import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";

import "../assets/styles/reset.css";
import "../assets/styles/style.css";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Timeline from "./Timeline";
import HashtagPostsPage from "./HashtagPostaPage";

export default function App() {

  const [data, setData] = useState({});
  const [hashtagName, setHashtagName] = useState();

  return (
    <UserContext.Provider value={{ data, setData, hashtagName, setHashtagName }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtags/:hashtag" element={<HashtagPostsPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
