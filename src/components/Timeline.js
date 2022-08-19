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
import InfiniteScroll from "react-infinite-scroller";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Timeline() {
  const [postData, setPostData] = useState([]);
  const { data, refreshKey } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [noMore, setNoMore] = useState(true)
  
  useEffect(() => {
    setLoading(true);
    const receive = axios.get(
      `http://localhost:4000/timeline?page=1`
    );
    receive.then((response) => {
      setLoading(false);
      setPostData(response.data);

      if (response.data.length === 0) {
        console.log("There are no posts yet");
      }
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
        {postData.map((post, index) => (
          <BuildPosts
            key={index}
            post={post}
            data={data}
          />
        ))}
        <ReactTooltip type="light" place="bottom" effect="solid" />
      </>
    );
  }

  function loadPostsToScroll() {
    const promise = axios.get(
      `http://localhost:4000/timeline?page=${page}`     
    );

    promise
      .then((response) => {
        console.log(response.data.length)
        if (response.data.length === 0 || response.data.length < 10){
          setNoMore(false)
        }
        setPostData([...postData,...response.data]);

        setPage(page+1);

      })
      .catch((error) => {
        alert(error);
      });
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
            <div className="timeline" >
              {loading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              ) : (
                
                <InfiniteScroll pageStart={page}
                  loadMore={loadPostsToScroll}
                  hasMore={noMore}
                  loader={<Infinite>
                      <AiOutlineLoading3Quarters color="#6D6D6D" fontSize="32px"></AiOutlineLoading3Quarters>
                      <span >Loading...</span>
                    </Infinite>}
                  >                  
                  <RenderPosts />
                </InfiniteScroll>
              
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

  @media (max-width: 560px) {
    .timeline {
      width: 100%;
    }
  }
`;
const Infinite = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:40px;
  span{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.05em;
    margin-top:15px;
    margin-bottom:5px;
    color: #6D6D6D;
  }
`