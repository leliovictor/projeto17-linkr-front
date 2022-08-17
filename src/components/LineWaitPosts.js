
import styled from "styled-components";
import { FaSyncAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import useInterval from 'use-interval';
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from  'react-loader-spinner';

export default function LineWaitingPosts({posts}){

    const [watingPosts, setWatingPosts] = useState([])
    const { data, refreshKey, setRefreshKey } = useContext(UserContext);
    const [loadNew, setLoadNew] = useState(false);

    useEffect(()=>{
        setLoadNew(false);
    }, [posts])

    useInterval(()=> {

        const promise = axios.get("http://localhost:4000/timeline", data.config);
        promise
            .then((res) => {
                setWatingPosts(res.data);
                setLoadNew(false);
            });

    }, 15 * 1000);

    function loadMorePosts(){
        setRefreshKey(!refreshKey);
        setLoadNew(true);
    }

    return (
        <>
            {
            watingPosts.length > posts.length ? 
            <WaitingPosts onClick={loadMorePosts}>
                {
                loadNew ? 

                <ThreeDots color="#FFFFFF" height={20} width={50} />
                :  
                <> 
                    <h3>
                        {watingPosts.length - posts.length} new posts, load more!
                    </h3>
                    <FaSyncAlt color="#FFFFFF" fontSize="16px"/>
                </>
                }

            </WaitingPosts>
            :
            null
            }
        </>
    )
}

const WaitingPosts = styled.div`
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 17px;
    width: 100%;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        margin-right: 14px;
    }
`; 