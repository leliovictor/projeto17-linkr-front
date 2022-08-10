import styled from "styled-components";
import  { useState } from  "react";
import axios from "axios";

export default function NewPost() {
  const [url, setUrl] = useState();
  const [message, setMessage] = useState();
  const [disableButton,setDisableButton] = useState(false)

  function submitPublish(event){
    event.preventDefault();
    
    setDisableButton(true);
    
    const newPost =
        {
            url,
            message          
            
        }
    
    const promise = axios.post("http://localhost:3000/posts", newPost)
    
    promise
    .then(res =>{ 
        console.log("post criado")
    })
    .catch(err=> {alert("Erro, preencha corretamente os dados");
    setDisableButton(false);});

}

  return (
    <>
      <NewPostContainer>
          <UserAvatar></UserAvatar>
          <Form onSubmit={submitPublish} >
                <span>What are you going to share today?</span>
                <input type="text" disabled={disableButton} placeholder="http://..." value={url} onChange={e => setUrl(e.target.value)} required/>
                <input type="text" disabled={disableButton} placeholder="type a description"  value={message} onChange={e => setMessage(e.target.value)} />
                <div><Publish type="submit" disabled={disableButton}>{disableButton ? "Publishing" : "Publish"}</Publish></div>
          </Form >
      </NewPostContainer>
    </>
  );
}

const NewPostContainer = styled.div`
  width: 50%;
  height: 33vh;
  
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
  top: 15px;
  left:15px;
  width:50px;
  height:50px;
  background-color:red;
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