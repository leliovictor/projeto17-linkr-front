import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";

import "../assets/styles/reset.css";
import "../assets/styles/style.css";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Timeline from "./Timeline";
import HashtagPostsPage from "./HashtagPostsPage";
import UserPage from "./UserPage";

export default function App() {

  const [data, setData] = useState({});
  const [hashtagName, setHashtagName] = useState();
  const [userPostName, setUserPostName] = useState();
  const [refreshKey, setRefreshKey] = useState(false);

  return (
    <UserContext.Provider value={{ data, setData, userPostName, setUserPostName, hashtagName, setHashtagName, refreshKey, setRefreshKey }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPostsPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
