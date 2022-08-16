import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";

import UserContext from "../contexts/UserContext";
import SearchRenderUser from "./SearchRenderUser";

export default function SearchUser() {
  const { data } = useContext(UserContext);
  const [findUsers, setFindUsers] = useState([]);
  const [username, setUsername] = useState("");

  async function searchUserByUsername(str) {
    setUsername(str);

    const body = {
      username: str,
    };

    if (!body.username) return setFindUsers([]);

    try {
      const response = await axios.post(
        "https://projeto17--linkr--backend.herokuapp.com/user/search",
        body,
        data.config
      );
      setFindUsers(response.data);
    } catch (err) {
      console.log(`Error: ${err.response.data}`);
    }
  }

  return (
    <Position>
      <Content>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          type="text"
          placeholder="Search for people"
          value={username}
          onChange={(e) => searchUserByUsername(e.target.value)}
        />
        {findUsers.map((user, index) => {
          return <SearchRenderUser key={index} userData={user} setUsername={setUsername} setFindUsers={setFindUsers} />;
        })}
      </Content>
    </Position>
  );
}

const Position = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  height: 45px;
  @media (max-width: 560px) {
    position: absolute;
    top: 82px;
    width: 93%;
    margin-left: 17px;

  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 560px;
  height: fit-content;
  max-height: 220px;

  background: #e7e7e7;
  border-radius: 8px;

  position: absolute;
  top: 0;
  left: 0;

  overflow-y: scroll;

  ::-webkit-scrollbar {
      display: none;
  }

  input {
    width: 100%;
    height: 45px;

    background: #ffffff;
    border-radius: 8px;
    padding: 0 17px;
    border: none;
    outline: none;

    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;

    ::placeholder {
      color: #c6c6c6;
    }
  }

  div:last-child {
    margin-bottom: 22px;
  }
`;
