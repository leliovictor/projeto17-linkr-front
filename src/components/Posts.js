import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

export default function BuildPosts(props) {
    const { post, data } = props;
    const [quantityOfLike, setQuantityOfLike] = useState(post.likes);
    const [likeButton, setLikeButton] = useState("heart-outline");
    const [usersWhoLiked, setUsersWhoLiked] = useState("Ninguem curtiu a foto");
    let iAmLiked = false;

    useEffect(() => {
        ReactTooltip.rebuild();

        for(let i = 0; i < post.usersWhoLiked.length; i++) {
            if (post.usersWhoLiked[i]?.username === data.username) {
                setLikeButton("heart")
                if (post.usersWhoLiked.length >= 2) {
                setUsersWhoLiked(`Você, 
                    ${post.usersWhoLiked[i - 1]?.username || post.usersWhoLiked[i + 1]?.username} 
                    ${post.usersWhoLiked.length > 3 ? "curtiram a foto" : ` e outras ${quantityOfLike - 2} pessoas`}`
                )
                } else {
                setUsersWhoLiked(`Você curtiu o post`)
                }
                iAmLiked = true
            } 
        };

        if (!iAmLiked) {
            if (post.usersWhoLiked.length === 2){
                setUsersWhoLiked(`${post.usersWhoLiked[0].username}, ${post.usersWhoLiked[1].username} curtiram o post`)
            }
            else if (post.usersWhoLiked.length > 2) {
                setUsersWhoLiked(`${post.usersWhoLiked[0].username}, ${post.usersWhoLiked[1].username} e outras ${quantityOfLike - 2} pessoas`)
            }
            else if (post.usersWhoLiked.length === 1) {
                setUsersWhoLiked(`${post.usersWhoLiked[0].username} curtiu o post`)

            }
        };
    },[]);

    function like () {
        if (likeButton === "heart") {
            const dislikeAxios = axios.post(`http://localhost:4000/timeline/${post.postId}/dislike`, {userId: data.id});
                
            dislikeAxios.then(() => {
                setLikeButton("heart-outline")
                setQuantityOfLike(quantityOfLike - 1)
            });

            dislikeAxios.catch((err) => {
                console.log(err)
            });

        } else {
            const likeAxios = axios.post(`http://localhost:4000/timeline/${post.postId}/like`, {userId: data.id});
            
            likeAxios.then(() => {
                setLikeButton("heart")
                setQuantityOfLike(quantityOfLike + 1)
            });

            likeAxios.catch((err) => {
                console.log(err)
            });  
        }
    };

    function redirect(url) {
        window.open(url, "_blank");
    };

    return (
        <>
          <PostStyle>
              <div className="column1">
                  <div className="profilePicture">
                      <LinkStyle to={`/user/${post.userId}`}><img src={`${post.pictureUrl}`} alt="" /></LinkStyle>
                  </div>
                  <ion-icon name={likeButton} onClick={() => like()} />
                  <p data-tip={usersWhoLiked} >{quantityOfLike} likes</p>
              </div>
              <div className="column2">
                  <div className="profileName">
                    <LinkStyle to={`/user/${post.userId}`}><p>{post.username}</p></LinkStyle>
                  </div>
                  <div className="postMessage">
                      <p>{post.message}</p>
                  </div>
                  <div onClick={() => redirect(post.url)} className="link">
                      <p>{post.urlInfo.title}</p>
                      <p>{post.urlInfo.description}</p>
                      <p>{post.url}</p>
                      <img src={post.urlInfo.image} alt="" />
                  </div>
              </div>
          </PostStyle>
        </>
    );
};

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
    align-items: center;
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

  ion-icon {
    font-size: 20px;
    margin-top: 20px;
    color: #ffffff;
    fill: red;
  }

  .column1 > p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF;
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
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    max-width: 502px;
    margin-bottom: 7px;
  }

  .postMessage {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    max-width: 502px;
  }

  .link {
    width: 503px;
    height: 155px;
    border: 1px solid #4d4d4d;
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
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    max-width: 302px;
    margin-left: 20px;
  }

  .link p:nth-child(1) {
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
  }
  .link p:nth-child(2) {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
  }

  .link p:nth-child(3) {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
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
      color: #9b9595;
    }

    .link p:nth-child(3) {
      font-size: 9px;
      line-height: 11px;
      color: #cecece;
    }
  }
`;

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;
`;
