import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";

export default function TrendingSideBar(props) {
  const { refreshPage } = props;
  const [trendingList, setTrendingList] = useState([]);
  const { data, setHashtagName } = useContext(UserContext);
  const navigate = useNavigate();

  const { config } = data;
  
  useEffect(() => {
    if (config) {

    const promise = axios.get("https://projeto17--linkr--backend.herokuapp.com/hashtags", config);

    promise
      .then((res) => {
        setTrendingList(res.data);
      })
      .catch((err) => {
        alert("Erro ao gerar a trending");
      });
    }
  }, [refreshPage]);

  function Hashtag({ hashtagClicked, hashtag }) {
    return (
      <>
        <span onClick={() => redirectHashtagPage({ hashtagClicked })}>
          # {hashtag}
        </span>
      </>
    );
  }

  function redirectHashtagPage({ hashtagClicked }) {
    setHashtagName(hashtagClicked);
    navigate(`/hashtag/${hashtagClicked}`);
  }

  return (
    <>
      <SideBar>
        <h1>treding</h1>
        <div>
          {trendingList.map((hashtag, index) => (
            <Hashtag
              key={index}
              hashtagClicked={hashtag.hashtag}
              hashtag={hashtag.hashtag}
            ></Hashtag>
          ))}
        </div>
      </SideBar>
    </>
  );
}

const SideBar = styled.div`
  width: 20vw;
  height: 406px;
  margin-top: 1.75%;
  position: fixed;
  background: #171717;
  border-radius: 16px;
  h1 {
    padding-left: 5%;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
  }
  div {
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid #484848;
  }
  span {
    width: 97%;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    word-break: break-all;

    color: #ffffff;

    margin-top: 5%;
    &:hover {
      cursor: pointer;
    }
  }
`;
