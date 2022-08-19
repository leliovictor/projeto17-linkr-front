import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import UserContext from "../contexts/UserContext";

export default function FollowButton() {
  const { data, userPostName, refreshKey, setRefreshKey } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [buttonData, setButtonData] = useState({ text: "Loading..." });
  const [follow, setFollow] = useState("checking");

  async function checkFollowStatus() {
    try {
      const response = await axios.get(
        `http://localhost:4000/user/follow/${userPostName?.userId}`,
        data.config
      );
      setFollow(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => checkFollowStatus(), [refreshKey]);

  function buildButton() {
    if (follow !== "checking") setLoading(false);

    if (!follow)
      return setButtonData({
        text: "Follow",
        background: "#1877F2",
        color: "#FFFFFF",
      });

    return setButtonData({
      text: "Unfollow",
      background: "#FFFFFF",
      color: "#1877F2",
    });
  }

  useEffect(() => {
    buildButton();
  }, [follow]);

  async function requestToggleFollow() {
    setLoading(true);

    const body = {
      followId: userPostName.userId,
      followStatus: follow,
    };

    try {
      await axios.post("http://localhost:4000/user/follow", body, data.config);
      setRefreshKey(!refreshKey);
      setLoading(false);
    } catch (err) {
      alert(`Error: ${err.response.data}`);
      setLoading(false);
    }
  }

  return (
    <Button
      disabled={loading ? "disabled" : ""}
      onClick={requestToggleFollow}
      background={buttonData?.background}
      color={buttonData?.color}
      style={{display: data?.id === userPostName?.userId && 'none'}}
    >
      {buttonData?.text}
    </Button>
  );
}

const Button = styled.button`
  width: 112px;
  height: 31px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};

  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: "Lato";
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
`;
