import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactTooltip from "react-tooltip";

import Header from "./Header";
import BuildPosts from "./Posts"
import UserContext from "../contexts/UserContext";

export default function UserPage() {
    const [userPostData, setUserPostData] = useState([]);
    const { data, userPostName } = useContext(UserContext);

    useEffect(() => {
        const receive = axios.get(`https://projeto17--linkr--backend.herokuapp.com/user/${userPostName.userId}`);
        receive.then((response) => {
            setUserPostData(response.data);
    
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
    }, [userPostName]);

    function RenderPosts() {
        return (
          <>
            {userPostData.map((post, index) => (
              <BuildPosts key={index} post={post} data={data}/>
            ))}
            <ReactTooltip type="light" place="bottom" effect="solid"/>
          </>
        );
      };

    return (
        <>
            <Header />
            <Title>
                <h1>{userPostName.username}'s posts</h1>
            </Title>
            <UserPageStyle>
                <div className="userPosts">
                {userPostData.length !== 0 ? (
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
