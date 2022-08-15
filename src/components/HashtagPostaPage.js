import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";
import Header from "./Header";
import BuildPosts from "./Posts"
import UserContext from "../contexts/UserContext";

export default function HashtagPostsPage() {
    const [hashtagPostData, setHashtagPostData] = useState([]);
    const { data, hashtagName } = useContext(UserContext);
    console.log(hashtagName)
    
    useEffect(() => {
        const receive = axios.get(`http://localhost:4000/hashtag/${hashtagName}`);
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
    }, []);

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

      console.log("hashtagPostData", hashtagPostData)

    return (
        <>
            <Header />
            <Title>
                <h1># {hashtagName}</h1>
            </Title>
            <HashtagPageStyle>
                <div className="hashagPost">
                {hashtagPostData.length !== 0 ? (
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
            </HashtagPageStyle>
        </>
    )
};


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