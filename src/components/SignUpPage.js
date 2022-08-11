import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function signup(e) {
    setLoading(true);

    e.preventDefault();

    const body = {
      email,
      password,
      username,
      pictureUrl,
    };

    try {
      const response = await axios.post("http://localhost:4000/sign-up", body);

      alert(`Your registration has been successfully completed.`);
      navigate("/");
    } catch (err) {
      alert(`Error: ${err.response.data}`);
      setLoading(false);
    }
  }

  return (
    <Content>
      <TitleDiv>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </TitleDiv>
      <SignUpDiv>
        <form onSubmit={signup}>
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
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading ? "disabled" : ""}
            background={loading}
          />
          <Input
            type="text"
            placeholder="picture url"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            required
            disabled={loading ? "disabled" : ""}
            background={loading}
          />
          <button type="submit" disabled={loading ? "disabled" : ""}>
            Sign Up
          </button>
        </form>
        <Link to={"/"}>
          <h1>Switch back to log in</h1>
        </Link>
      </SignUpDiv>
    </Content>
  );
}

const Content = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  padding-left: 10%;

  background-color: #151515;
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
`;

const SignUpDiv = styled.div`
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
