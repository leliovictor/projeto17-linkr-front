import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";

import UserContext from "../contexts/UserContext";
import Header from "./Header";
import NewPost from "./NewPost";
import TrendingSideBar from "./TrendingSideBar";
import BuildPosts from "./Posts"

export default function Timeline() {
  const [postData, setPostData] = useState([]);
  const { data } = useContext(UserContext);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const receive = axios.get("http://localhost:4000/timeline");
    receive.then((response) => {
      setPostData(response.data);

      if (response.data.length === 0) {
        console.log("There are no posts yet");
      }
    });

    receive.catch((err) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      console.log(err);
    });
  }, [refreshPage]);

  function RenderPosts() {
    return (
      <>
        {postData.map((post, index) => (
          <BuildPosts key={index} post={post} data={data} refreshPage={refreshPage} setRefreshPage={setRefreshPage} setPostData={setPostData}/>
        ))}
        <ReactTooltip type="light" place="bottom" effect="solid"/>
      </>
    );
  };

  return (
    <>
      <Header />
      <Title>
        <h1>timeline</h1>
      </Title>
      <Container>
        <LeftContainer>
            <NewPost refreshPage={refreshPage} setRefreshPage={setRefreshPage} setPostData={setPostData} />
            <TimelineStyle>
              <div className="timeline">
                {postData.length !== 0 ? (
                  <RenderPosts />
                ) : (
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                  />
                )}
              </div>
            </TimelineStyle>
        </LeftContainer>
        <RightContainer>
          <TrendingSideBar refreshPage={refreshPage} />
        </RightContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftContainer = styled.div`

  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const RightContainer = styled.div`
  margin-left: 25px;
  @media (max-width: 560px) {
    display: none;
  }
`;

const Title = styled.div`
  font-family: "Oswald";
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  width: 100%;
  margin-top: 78px;
  display: flex;
  justify-content: space-around;
  color: #ffffff;
  h1 {
    width: 611px;
  }

  @media (max-width: 580px) {
    margin-left: 18px;
  }
`;

const TimelineStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 29px;

  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .timeline > p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-bottom: 43px;
  }

  @media (max-width: 560px) {
    .timeline {
      width: 100%;
    }
  }
`;
