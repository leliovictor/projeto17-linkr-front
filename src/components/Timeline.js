import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import NewPost from "./NewPost";
import TrendingSideBar from "./TrendingSideBar";
import BuildPosts from "./Posts";
import LineWaitingPosts from "./LineWaitPosts";

export default function Timeline() {
  const [postData, setPostData] = useState([]);
  const { data, refreshKey } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    setLoading(true);

    const receive = axios.get("http://localhost:4000/timeline", data.config);

    receive.then((response) => {
      setLoading(false);
      setPostData(response.data.posts);
      setFollowing(response.data.followCount);
    });

    receive.catch((err) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setLoading(false);
    });
  }, [refreshKey]);



  function RenderPosts() {
    return (
      <>
        {!following ? (
          <NoFollows>
            You don't follow anyone yet. Search for new friends!
          </NoFollows>
        ) : (
          <></>
        )}
        {following && postData.length === 0 ? (
          <NoPosts>No posts found from your friends or you</NoPosts>
        ) : (
          postData.map((post, index) => (
            <div className="backgroundPosts">
              <BuildPosts key={index} post={post} data={data} />
            </div>
          ))
        )}

        <ReactTooltip type="light" place="bottom" effect="solid" />
      </>
    );
  }

  return (
    <>
      <Header />
      <Title>
        <h1>timeline</h1>
      </Title>
      <Container>
        <LeftContainer>
          <NewPost />
          {postData.length > 0 ? <LineWaitingPosts posts={postData} setPosts={setPostData} /> : null} 
          <TimelineStyle>
            <div className="timeline">
              {loading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              ) : ( 
                <RenderPosts />
              )}
            </div>
          </TimelineStyle>
        </LeftContainer>
        <RightContainer>
          <TrendingSideBar />
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
  max-width: 611px;
  width: 100%;
  height: fit-content;
`;

const RightContainer = styled.div`
  margin-left: 25px;
  width:20%;
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
    width: 100%;
    max-width: 611px;
  }

  @media (max-width: 560px) {
    padding-left: 18px;
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

  :last-child {
    margin-bottom: 16px;
  }

  .backgroundPosts {
    background-color: #1E1E1E;
    border-radius: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 560px) {
    .timeline {
      width: 100%;
    }
  }
`;

const NoFollows = styled.h1`
  color: #ffffff;
  width: 500px;
  font-size: 20px;
  text-align: center;
  font-family: "Lato";
  margin: 30px 0;
`;

const NoPosts = styled(NoFollows)``;
