import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import UserContext from "../contexts/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);


  const navigate = useNavigate();
  const { setData } = useContext(UserContext);

  async function login(e) {
    setLoading(true);

    e.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:4000/", body);

      registerLogin(response.data, body);
    } catch (err) {
      alert(`Error: ${err.response.data}`);
      setLoading(false);
    }
  }

  function registerLogin(data, body) {
    setData({ ...data, reloadPage, setReloadPage });
    saveLoginInLocalStorage(body);

    navigate("/timeline");
  }

  function saveLoginInLocalStorage(body) {
    const bodySave = JSON.stringify(body);
    localStorage.setItem("autoLogin", bodySave);
  }

  async function checkLocalStorageToLogin() {
    const bodySave = localStorage.getItem("autoLogin");
    const body = JSON.parse(bodySave);

    if (body !== null) {
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:4000/", body);
        registerLogin(response.data, body);
      } catch (err) {
        setLoading(false);
        localStorage.removeItem("autoLogin");
      }
    }
  }

  useEffect(() => checkLocalStorageToLogin());

  return (
    <Content>
      <TitleDiv>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </TitleDiv>
      <LoginDiv>
        <form onSubmit={login}>
          <Input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading ? "disabled" : ""}
            background={loading}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading ? "disabled" : ""}
            background={loading}
          />
          <button type="submit" disabled={loading ? "disabled" : ""}>
            Log In
          </button>
        </form>
        <Link to={"/sign-up"}>
          <h1>First time? Create an account!</h1>
        </Link>
      </LoginDiv>
    </Content>
  );
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  padding-left: 10%;

  background-color: #151515;

  @media (max-width: 580px) {
    flex-direction: column;
    padding: 0;
  }
`;

const TitleDiv = styled.div`
  font-weight: 700;
  color: #ffffff;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-family: "Passion One";
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
  }

  h2 {
    font-family: "Oswald";
    font-size: 43px;
    line-height: 64px;
    max-width: 442px;
  }

  @media (max-width: 580px) {
    text-align: center;
    align-items: center;

    h1 {
      font-size: 76px;
      line-height: 84px;
    }

    h2 {
      font-size: 23px;
      line-height: 34px;
      max-width: 260px;
      margin-top: -10px;
      margin-bottom: 27px;
    }
  }
`;

const LoginDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4%;

  background-color: #333333;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  button {
    height: 65px;
    width: 100%;

    background: #1877f2;
    border-radius: 6px;
    border: none;
    margin-bottom: 21px;

    color: #ffffff;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    cursor: pointer;
  }

  a {
    width: 100%;
    text-align: center;
    color: #ffffff;
    text-decoration: underline;
    font-family: "Lato";
    font-size: 17px;
    line-height: 20px;

    cursor: pointer;
  }

  @media (max-width: 580px) {
    width: 100%;
    padding: 40px 23px 91px 23px;
    height: 100%;
    justify-content: start;

    font-size: 22px;
    line-height: 33px;

    input {
      height: 55px;
    }

    a {
      font-size: 17px;
      line-height: 20px;
    }
  }
`;

const Input = styled.input`
  margin-bottom: 11px;
  height: 55px;
  width: 100%;

  background: ${(props) => (props.background ? "#c2c2c2" : "#ffffff")};
  border-radius: 6px;
  padding-left: 17px;
  border: none;

  font-size: 22px;
  line-height: 33px;

  ::placeholder {
    font-family: "Oswald";
    font-weight: 700;

    color: #9f9f9f;
  }
`;
