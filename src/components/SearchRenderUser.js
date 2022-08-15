import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function SearchRenderUser(props) {
  const navigate = useNavigate();

  const { setUsername, setFindUsers } = props;
  const { id, username, pictureUrl } = props.userData;
  const { setUserPostName } = useContext(UserContext);

  function redirectPage() {
    setUserPostName({ userId: id, username });
    setUsername("");
    setFindUsers([]);
    navigate(`/user/${id}`);
  }

  return (
    <Content onClick={() => redirectPage()}>
      <img src={pictureUrl} alt="User" />
      <h1>{username}</h1>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  padding-left: 17px;
  align-items: center;

  margin-top: 15px;
  cursor: pointer;

  img {
    width: 39px;
    height: 39px;

    border-radius: 20px;
    object-fit: cover;
    margin-right: 12px;
  }

  h1 {
    font-family: "Lato";
    font-size: 19px;
    line-height: 23px;

    color: #515151;
  }
`;
