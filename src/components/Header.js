import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Header() {

  const navigate = useNavigate();
  const { data } = useContext(UserContext);
  
  function checkToken() {
    if(!data.config) {
      navigate("/");
    }
  }
  
  useEffect(() => checkToken(), []);
  
  const [logoutButton, setLogoutButton] = useState(false);
  
  function toggleLogoutButton() {
    setLogoutButton(!logoutButton);
  }

  function logout() {
    localStorage.removeItem("autoLogin");
    navigate("/");
  }

  return (
    <Content>
      <Title>linkr</Title>
      <LogoutDiv>
        <section>
          <ArrowUp
            onClick={toggleLogoutButton}
            rotate={logoutButton ? "180deg" : "0"}
          />
          <img src={data.pictureUrl} alt="user" />
        </section>
        <LogoutButton
          onClick={logout}
          translate={logoutButton ? "72px" : "25px"}
        >
          Logout
        </LogoutButton>
      </LogoutDiv>
    </Content>
  );
}

const Content = styled.div`
  width: 100vw;
  height: 72px;
  background: #151515;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: "Passion One";
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;

  letter-spacing: 0.05em;
  padding-left: 28px;

  color: #ffffff;
`;

const LogoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  section {
    display: flex;
    align-items: center;
    height: 100%;
    background-color: #151515;
    padding-right: 17px;
    padding-left: 30px;
    z-index: 1;
  }

  img {
    width: 53px;
    height: 53px;

    border-radius: 26.5px;
    object-fit: cover;
  }
`;

const ArrowUp = styled(IoIosArrowUp)`
  color: #ffffff;
  font-size: 25px;
  margin-right: 15px;
  transform: rotate(${(props) => props.rotate});
  cursor: pointer;
`;

const LogoutButton = styled.button`
  width: 133px;
  height: 47px;
  background: #171717;
  border-bottom-left-radius: 20px;
  border: none;
  cursor: pointer;

  position: absolute;
  right: 0px;
  top: ${(props) => props.translate};
  transition: top 0.5s;
  z-index: 0;

  font-family: "Lato";
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;
