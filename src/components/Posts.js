import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { TiPencil, AiOutlineComment, IoPaperPlaneOutline } from "react-icons/all";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import DeletePost from "./DeletePost";
import { ReactTagify } from "react-tagify";

export default function BuildPosts(props) {
    const navigate = useNavigate();
    const { post, data } = props;
    const { setUserPostName, setHashtagName } = useContext(UserContext);
    const inputRef = useRef(null);

    const [usersWhoLiked, setUsersWhoLiked] = useState("Ninguem curtiu a foto");
    const [quantityOfLike, setQuantityOfLike] = useState(post.likes);
    const [likeButton, setLikeButton] = useState("heart-outline");

    const [messagePost, setMessagePost] = useState(post.message);
    const [allowedEdit, setAllowedEdit] = useState(false);
    const [editContent, setEditContend] = useState("");
    const [disabled, setDisabled] = useState(false);

    const [showCommentBox, setShowCommentBox] = useState(false);

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
        const dislikeAxios = axios.post(
          `https://projeto17--linkr--backend.herokuapp.com/post/${post.postId}/dislike`,
          { userId: data.id }
        );
        
            dislikeAxios.then(() => {
                setLikeButton("heart-outline")
                setQuantityOfLike(quantityOfLike - 1)
            });

            dislikeAxios.catch((err) => {
                console.log(err)
            });

        } else {
            const likeAxios = axios.post(
              `https://projeto17--linkr--backend.herokuapp.com/post/${post.postId}/like`,
              { userId: data.id }
            );

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

    function redirectUserPageContext () {
      setUserPostName({userId: post.userId, username: post.username});
    };
    
    useEffect(() => {
      if(allowedEdit && inputRef.current) {
        inputRef.current.focus();
      };
    },[allowedEdit]);

    function verifyKey (event) {
      switch (event.keyCode) {
        case 13:
          sendEditedContent();
          event.preventDefault();
          break;

        case 27:
          cancelEdit();
          event.preventDefault();
          break;

        default:
          break;
      };
    };

    function sendEditedContent () {
      const { config } = data;
      setDisabled(true);

      const sendEdit = axios.post(`https://projeto17--linkr--backend.herokuapp.com/post/${post.postId}/edit`, {message: editContent}, config);

      sendEdit.then(() => {
        setDisabled(false);
        setAllowedEdit(false);
        setMessagePost(editContent);
      });

      sendEdit.catch(() => {
        setDisabled(false);
        alert("Não foi possivel salvar as alterações!");
      });
    };

    function cancelEdit () {
      setAllowedEdit(false);
      setEditContend("");
    };

    function makeEditable () {
      setAllowedEdit(true);
    };

    const tagStyle = {
      color: "#FFFFFF",
      fontWeight: 700,
      cursor: "pointer",
    };

    function BuildCommentBox () {
      const { config } = data;
      const [comment, setComment] = useState();

      function sendComments () {
        const commentData = {
          comment: comment,
          ownerOfThePost: data.id
        };

        const sendComment = axios.post(`https://projeto17--linkr--backend.herokuapp.com/post/${post.postId}/comment`, commentData, config);

        sendComment.then(() => {
            setComment("");
        });

        sendComment.catch((error) => {
          console.log("erro ao enviar comentario", error);
        });
      };

      function cancelComment () {
        setComment("");
      };

      function verifyKeyComment (event) {
        switch (event.keyCode) {
          case 13:
            sendComments();
            event.preventDefault();
            break;
    
          case 27:
            cancelComment();
            event.preventDefault();
            break;
    
          default:
            break;
        };
      };

      function TemplateComment (props) {
        const { userId, username, pictureUrl, text } = props
        return (
          <>
            <div className="comment">
              <img src={pictureUrl} alt="" />
              <div className="collum">
                <div className="nameAndInfo">
                  <p>{username}</p>
                  <p>{userId === post.userId? "• post's author" : ""}</p>
                </div>
                <p>{text}</p>
              </div>
            </div>
            <div className="fatherOdTheSeparatoryLine">
              <div className="separatoryLine" />
            </div>
          </>
        );
      };

      return (
        <>
          <CommentBoxStyle>
            {post.usersWhoCommented.map((commented, index) => (
              <TemplateComment 
                key={index}
                userId={commented.userId}
                username={commented.username} 
                pictureUrl={commented.pictureUrl}
                text={commented.text}
              />
            ))}
            <div className="boxWriteComment">
              <img src={`${data.pictureUrl}`} alt="" />
              <input
                type="text" 
                placeholder="write a comment..."
                value={comment}
                onChange={(e) => {setComment(e.target.value)}}
                onKeyDown={verifyKeyComment}
              />
              <IoPaperPlaneOutline className="ioPaperPlaneOutline" onClick={() => sendComments()} />
            </div>
          </CommentBoxStyle>
        </>
      );
    };

  return (
        <>
          <PostStyle>
              <div className="column1">
                  <div className="profilePicture">
                  <LinkStyle
                    to={`/user/${post.userId}`}
                    onClick={() => redirectUserPageContext()}
                  >
                    <img src={`${post.pictureUrl}`} alt="" />
                  </LinkStyle>                  
              </div>
                  <ion-icon name={likeButton} onClick={() => like()} />
                  <p data-tip={usersWhoLiked} >{quantityOfLike} likes</p>
                  <AiOutlineComment className="aiOutlineComment" onClick={() => setShowCommentBox(!showCommentBox)}/>
                  <p>{post.usersWhoCommented.length} comments</p>
              </div>
              <div className="column2">
                  <div className="profileName">
                    <LinkStyle
                      to={`/user/${post.userId}`}
                      onClick={() => redirectUserPageContext()}
                    >
                      <p>{post.username}</p>
                    </LinkStyle>                  
                  </div>
                  <div className="postMessage">
                    {allowedEdit? (
                          <textarea 
                            type="text"
                            disabled={disabled}
                            ref={inputRef}
                            value={editContent}
                            onChange={(e) => {setEditContend(e.target.value)}}
                            placeholder={post.message}
                            onKeyDown={verifyKey}
                          />
                        ) : (
                          <ReactTagify
                            tagStyle={tagStyle}
                            tagClicked={(tag) => {
                              setHashtagName(tag.slice(1));
                              navigate(`/hashtag/${tag.slice(1)}`);
                            }}
                          >
                            <p>{messagePost}</p>
                          </ReactTagify>
                      )}
                  </div>
                  <div onClick={() => redirect(post.url)} className="link">
                      <p>{post.urlInfo.title}</p>
                      <p>{post.urlInfo.description}</p>
                      <p>{post.url}</p>
                      <img src={post.urlInfo.image} alt="" />
                  </div>
              </div>
              {data.id === post.userId ? (
            <DeletePost postId={post.postId} />
              ) : (
                <></>
              )}
            {data.id === post.userId ? (
              <TiPencil className="tiPencil" onClick={() => {allowedEdit? cancelEdit() : makeEditable()}} />
              ) : (
                <></>
              )}
          </PostStyle>
            {showCommentBox ?
            (
              <BuildCommentBox />
            ) : (
              <></>
            )}
        </>
    );
};


const PostStyle = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  position: relative;

  .column1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 55px;
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
    cursor: pointer;
  }

  .column1 > p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
  }

  .profilePicture {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .aiOutlineComment {
    color: #FFFFFF;
    font-size: 22px;
    margin-top: 15px;
    cursor: pointer;
  }

  .profilePicture img {
    object-fit: cover;
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

  .postMessage textarea {
    width: 503px;
    height: 44px;
    background-color: #FFFFFF;
    border-radius: 7px;
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
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tiPencil {
    color: #FFFFFF;
    font-size: 22px;
    position: absolute;
    right: 48px;
    top: 22px;
    cursor: pointer;
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
      position: relative;
    }

    .postMessage textarea {
      width: 278px;
      height: 33px;
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

const CommentBoxStyle = styled.div`
  width: 611px;
  background-color: #1E1E1E;
  border-radius: 16px;

  img {
    object-fit: cover;
    width: 40px;
    height: 40px;
    border-radius: 26.5px;
  }
  .comment {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 14px;
    margin-bottom: 20px;
  }

  .fatherOdTheSeparatoryLine {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .separatoryLine {
    width: 90%;
    height: 0px;
    border: 1px solid #353535;
    transform: rotate(-0.1deg);
  }

  .collum {
    display: flex;
    flex-direction: column;
    width: 510px;
  }

  .collum .nameAndInfo {
    display: flex;
  }

  .collum .nameAndInfo p:first-child {
    height: 17px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3;
  }

  .collum .nameAndInfo p:last-child {
    height: 18px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    margin-left: 4px;
  }

  .collum > p {
    width: 364px;
    height: 17px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
    margin-top: 4px;
  }

  .boxWriteComment {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 25px;
    margin-top: 19px;
    position: relative;
  }
  .boxWriteComment .ioPaperPlaneOutline {
    position: absolute;
    right: 30px;
    bottom: 10px;
    color: #FFFFFF;
    font-size: 20px;
    cursor: pointer;
  }

  input {
    width: 510px;
    height: 39px;
    background-color: #252525;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 40px;
    color: #FFFFFF;
  }

  input ::placeholder {
    position: absolute;
    width: 120px;
    height: 17px;
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
    border-style: none;
  }

  @media (max-width: 580px) {
    width: 100%;

    img {
      width: 30px;
      height: 30px;
    }

    .collum {
      width: 320px;
    }

    input {
      width: 320px;
    }
  }
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;
