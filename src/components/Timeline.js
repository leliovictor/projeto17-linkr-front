import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Timeline() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const receive = axios.get("http://localhost:4000/timeline")
    receive.then(response => {
        setPostData(response.data)

        if(response.data.length === 0) {
          alert("There are no posts yet")
        };
    });

    receive.catch(err => {
      alert( "An error occured while trying to fetch the posts, please refresh the page")
      console.log(err)
    });
  },[]);

  function redirect (url) {
    window.open(url, '_blank')
    console.log("entrou redirect", url)
  }
  
  function BuildPosts (props) {
    const { post } = props
    console.log("post", post)

    return (
      <>
          <PostStyle>
            <div className="column1">
              <div className="profilePicture"><img src={`${post.pictureUrl}`} /></div>
              <p>20 likes</p>
            </div>
            <div className="column2">
              <div className="profileName"><p>{post.username}</p></div>
              <div className="postMessage"><p>{post.message}</p></div>
              <div onClick={() => redirect(post.url)} className="link">
                <p>{post.urlInfo.title}</p>
                <p>{post.urlInfo.description}</p>
                <p>{post.url}</p>
                <img src={post.urlInfo.image}/>
              </div>
            </div>
          </PostStyle>
      </>
    )
  };

  function RenderPosts () {
    return (
      <>
        {postData.map((post, index) => (
          <BuildPosts key={index} post={post}/>
        ))}
      </>
    )
  };

  return (
    <>
      <TimelineStyle>
        <div className="timeline">
          <p>timeline</p>
          {postData.length !== 0 ? <RenderPosts /> : <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true}/>}
        </div>
      </TimelineStyle>
    </>
  )
};

const TimelineStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;

  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .timeline > p{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-bottom: 43px;
  }

  @media (max-width: 580px) {
    .timeline {
      width: 100%;
    }
  }


`;

const PostStyle = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 16px;
  display: flex;
  position: relative;

  .column1 {
    display: flex;
    flex-direction: column;
    width: 50px;
    margin-left: 16px;
    margin-top: 18px;
  }

  .column2 {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    margin-top: 18px;
  }

  .profilePicture {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profilePicture img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }

  .profileName {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    max-width: 502px;
    margin-bottom: 7px;
  }

  .postMessage {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    max-width: 502px;
  }

  .link {
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
    cursor: pointer;
  }

  .link img {
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .link > p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    max-width: 302px;
    margin-left: 20px;
  }

  .link p:nth-child(1) {
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
  }
  .link p:nth-child(2) {
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
  }

  .link p:nth-child(3) {
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
  }

  @media (max-width: 580px) {
    width: 100%;
    height: 232px;
    border-radius: 0px;
    
    .column1 {
      width: 50px;
      margin-left: 15px;
      margin-top: 9px;
    }

    .column2 {
      margin-left: 14px;
      margin-top: 9px;
    }

    .profilePicture {
      width: 40px;
      height: 40px;
      border-radius: 26.5px;
    }
    .profilePicture img {
      width: 40px;
      height: 40px;
      border-radius: 26.5px;
    }

    .profileName {
      font-size: 17px;
      line-height: 20px;
      max-width: 288px;
    }

    .postMessage {
      font-size: 15px;
      line-height: 18px;
      max-width: 288px;
    }

    .link {
      width: 278px;
      height: 115px;
    }

    .link img {
      width: 95px;
      height: 115px;
      border-radius: 0px 12px 13px 0px;
    }

    .link > p {
      max-width: 175px;
    }

    .link p:nth-child(1) {
      font-size: 11px;
      line-height: 13px;
    }

    .link p:nth-child(2) {
      font-size: 9px;
      line-height: 11px;
      color: #9B9595;
    }

    .link p:nth-child(3) {
      font-size: 9px;
      line-height: 11px;
      color: #CECECE;
    }
    
  }
`;