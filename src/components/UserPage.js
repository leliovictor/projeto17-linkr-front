import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";

import Header from "./Header";
import BuildPosts from "./Posts";
import FollowButton from "./FollowButton";
import UserContext from "../contexts/UserContext";
import TrendingSideBar from "./TrendingSideBar";

export default function UserPage() {
  const [userPostData, setUserPostData] = useState([]);
  const { data, userPostName } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const receive = axios.get(
      `http://localhost:4000/user/${userPostName?.userId}`,
      data.config
    );
    receive.then((response) => {
      setUserPostData(response.data);
      setLoading(false);

      if (response.data.length === 0) {
        console.log("There are no posts yet");
        setLoading(false);
      }
    });

    receive.catch((err) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      console.log(err);
    });
  }, [userPostName]);

  function RenderPosts() {
    return (
      <>
        {userPostData?.length > 0 ? (
          userPostData.map((post, index) => (
            <BuildPosts key={index} post={post} data={data} />
          ))
        ) : (
          <NoPosts>{userPostName?.username} hadn't shared posts yet</NoPosts>
        )}
        <ReactTooltip type="light" place="bottom" effect="solid" />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Title>
          <h1>{userPostName?.username}'s posts</h1>
          <FollowButton />
        </Title>
        <Content>
          <UserPageStyle>
            <div className="userPosts">
              {!loading ? (
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
          </UserPageStyle>
          <Section>
            <TrendingSideBar />
          </Section>
        </Content>
      </Container>
    </>
  );
}

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;

  h1 {
    width: 100%;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
  }

  @media (max-width: 580px) {
    margin-left: 18px;
  }
`;

const UserPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 29px;

  .userPosts {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userPosts > p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-bottom: 43px;
  }

  @media (max-width: 580px) {
    .userPosts {
      width: 100%;
    }
  }
`;

const Container = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 78px auto 0 auto;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  margin-left: 25px;
  @media (max-width: 560px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
`;

const Section = styled.section`
  position: relative;
  margin-left: 25px;
  width: 20vw;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NoPosts = styled.h1`
  color: #ffffff;
  width: 500px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
`;
