import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";

export default function TrendingSideBar() {
    const [ trendingList, setTrendingList] = useState([])
    const { setHashtagName} = useContext(UserContext);
    const navigate = useNavigate();

    const { config }  = data
      
      useEffect(()=>{

      const promise = axios.get("http://localhost:4000/timeline", config)
      
      promise
      .then(res =>{
        setTrendingList(res.data);
      })
      .catch(err=> {alert("Erro ao gerar a trending");
      });
      }, []);

    function Hashtag({hashtagClicked, hashtag}){
      return(
       <>
        <span onClick={() => redirectHashtagPage({hashtagClicked})} ># {hashtag}</span>
       </>
      )
    }

    function redirectHashtagPage({hashtagClicked}){
      setHashtagName(hashtagClicked)
      navigate(`/hashtag/${hashtagClicked}`)
    }

  return(
    <>
      <SideBar>
        <h1>treding</h1>
        <div>
          {trendingList.map(hashtag => <Hashtag hashtagClicked={hashtag.hashtag} hashtag={hashtag.hashtag}></Hashtag>)}
        </div>
      </SideBar>
    </>
  )    

}

const SideBar = styled.div`
    width: 20vw;
    height: 406px;
    margin-top:1.75%;
    position:fixed;
    background: #171717;
    border-radius: 16px;
    h1{
      padding-left:5%;
      font-family: 'Oswald';
      font-style: normal;
      font-weight: 700;
      font-size: 27px;
      line-height: 40px;
      color: #FFFFFF;
    }
    div{
      padding-left:5%;
      display:flex;
      flex-direction:column;
      width:100%;
      border-top: 1px solid #484848;
      
    }
    span{
      width:fit-content;
      font-family: 'Lato';
      font-style: normal;
      font-weight: 700;
      font-size: 19px;
      line-height: 23px;
      letter-spacing: 0.05em;

      color: #FFFFFF;

      margin-top:5%;
      &:hover{
        cursor: pointer;
      }
    }
`
