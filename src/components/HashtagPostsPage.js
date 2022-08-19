import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";
import Header from "./Header";
import BuildPosts from "./Posts"
import UserContext from "../contexts/UserContext";
import TrendingSideBar from "./TrendingSideBar";
import InfiniteScroll from "react-infinite-scroller";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function HashtagPostsPage() {
    const [hashtagPostData, setHashtagPostData] = useState([]);
    const [page, setPage] = useState(1)
    const [noMore, setNoMore] = useState(true)
    const { data, hashtagName, refreshKey } = useContext(UserContext);

    useEffect(() => {
        const receive = axios.get(`http://localhost:4000/hashtag/${hashtagName}?page=1`, data.config);
        receive.then((response) => {
            setHashtagPostData(response.data);
            if (response.data.length === 0) {
                console.log(`There are no posts with #${hashtagName}`);
            }
        });
        receive.catch((err) => {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
            console.log(err);
        });
    }, [refreshKey]);

    function RenderPosts() {
        return (
          <>
            {hashtagPostData.map((post, index) => (
              <BuildPosts key={index} post={post} data={data}/>
            ))}
            <ReactTooltip type="light" place="bottom" effect="solid"/>
          </>
        );
      };

      function loadPostsToScroll() {
        const promise = axios.get(
          `http://localhost:4000/hashtag/${hashtagName}?page=${page}`, data.config     
        );
    
        promise
          .then((response) => {
            
            if (response.data.length === 0 || response.data.length < 10){
              setNoMore(false)
            }
            setHashtagPostData([...hashtagPostData,...response.data]);
    
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
                <h1># {hashtagName}</h1>
            </Title>
            <Container>
              <LeftContainer>
                <HashtagPageStyle>
                    <div className="hashagPost">
                    {hashtagPostData.length !== 0 ? (
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
                </HashtagPageStyle>
              </LeftContainer>
              <RightContainer>
                <TrendingSideBar />
              </RightContainer>
            </Container>
        </>
    )
};

const Container = styled.div`
  display:flex;
  justify-content:center;
`
const LeftContainer = styled.div`
  display:flex;
  flex-direction:column;
`
const RightContainer = styled.div`
  margin-left:25px;
  @media (max-width: 560px) {
    display:none;
  }
  
`
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

const HashtagPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 29px;
  .hashagPost {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hashagPost > p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-bottom: 43px;
  }
  @media (max-width: 580px) {
    .hashagPost {
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