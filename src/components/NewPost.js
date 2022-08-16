import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext.js";

export default function NewPost() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [disableButton,setDisableButton] = useState(false)
  const { data, refreshKey, setRefreshKey } = useContext(UserContext);

  function submitPublish(event){
    event.preventDefault();
    
    setDisableButton(true);
    
    const newPost = {
            url,
            message
          }          
            
    const { config }  = data
    
    const promise = axios.post("http://localhost:4000/posts", newPost, config)
    
    promise
    .then(res =>{
      setDisableButton(false);
      setUrl('')
      setMessage('')
      setRefreshKey(!refreshKey);
    })
    .catch(err=> {alert("Houve um erro ao publicar seu link");
    setDisableButton(false);});

}

  return (
    <>
    <Content>
      <NewPostContainer>
          <UserAvatar>
            <img src={data.pictureUrl} alt="user avatar" />
          </UserAvatar>
          <Form onSubmit={submitPublish} >
                <span>What are you going to share today?</span>
                <input type="text" disabled={disableButton} placeholder="http://..." value={url} onChange={e => setUrl(e.target.value)} required/>
                <input type="text" disabled={disableButton} placeholder="type a description"  value={message} onChange={e => setMessage(e.target.value)} />
                <div><Publish type="submit" disabled={disableButton}>{disableButton ? "Publishing..." : "Publish"}</Publish></div>
          </Form >
      </NewPostContainer>
    </Content>
    </>
  );
}
const Content = styled.div`

  display: flex;
  justify-content: space-around;

  @media (max-width: 560px) {
    padding-left: 0;
  }
`;

const NewPostContainer = styled.div`
  width: 100%;
  max-width: 611px;
  height: 100%;
  margin-top:5%;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position:relative;
  padding-top:25px;
  padding-bottom:10px;
  @media (max-width: 560px) {
	width:100%;
  border-radius: 0px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  .UserAvatar{
    display:none;
  }
}
`;
const UserAvatar = styled.div`
  position:absolute;
  top: 20px;
  left:15px;
  img{
    object-fit:cover;
    border-radius: 26.5px;
    width:50px;
    height:50px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`
const Form = styled.form`
    display:flex;
    flex-direction: column;
    width: 100%;
    background-color: #FFFFFF;
    padding-left: 87px;
    padding-right:20px;
    span{
      width:100%;
      font-family: 'Lato';
      font-style: normal;
      font-weight: 300;
      font-size: 3ex;
      line-height: 24px;
      color: #707070;
    } 
    input:nth-child(2){
      width: 100%;
      height: 30px;
      background: #EFEFEF;
      border:none;
      border-radius: 5px;
      margin-bottom: 5px;
      margin-top:10px;
    }
    input:nth-child(3) {
      width: 100%;
      height: 66px;
      background: #EFEFEF;
      border:none;
      border-radius: 5px;
      margin-bottom: 5px;
    }
    input{
      ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
      }
    }
    div{
        display:flex;
        width:100%;
        width:100%;
        justify-content:flex-end;
    }

    @media (max-width: 560px) {
      padding: 0 15px;
    }
      
`
const Publish = styled.button`
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        border:none;
        opacity: ${props => props.disabled ? 0.4 : 1 };
        
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        &:hover{
            cursor:pointer;
        }
`