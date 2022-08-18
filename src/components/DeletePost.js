import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { FiTrash } from "react-icons/fi";
import { RotatingLines } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";

export default function DeletePost({ postId }) {
  const { data, refreshKey, setRefreshKey } = useContext(UserContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function deletePost() {
    setLoading(true);

    try {
      await axios.delete(
        `http://localhost:4000/posts/${postId}`, data.config
      );

      setRefreshKey(!refreshKey);
    } catch (err) {
      alert("Error: post was not deleted");
      setLoading(false);
      setDisplayModal(false);
    }
  }

  function renderConfirmation() {
    return (
      <section>
        <h1>Are you sure you want to delete this post?</h1>
        <div>
          <Refuse onClick={() => setDisplayModal(false)}>No, go back</Refuse>
          <Confirm onClick={deletePost}>Yes, delete it</Confirm>
        </div>
      </section>
    );
  }

  function renderLoadingSpin() {
    return (
      <section>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </section>
    );
  }

  return (
    <>
      <TrashCanIcon onClick={() => setDisplayModal(true)} />
      <Modal display={displayModal ? "flex" : "none"}>
        {loading ? renderLoadingSpin() : renderConfirmation()}
      </Modal>
    </>
  );
}

const TrashCanIcon = styled(FiTrash)`
  position: absolute;
  top: 23px;
  right: 23px;
  color: #ffffff;
  font-size: 20px;
  fill: #ffffff;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  padding-top: 38px;

  display: ${(props) => props.display};

  background: rgba(255, 255, 255, 0.9);

  section {
    width: 597px;
    height: 262px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #333333;
    border-radius: 50px;
  }

  h1 {
    width: 350px;
    font-family: "Lato";
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;

    color: #ffffff;

    margin-bottom: 39px;
  }

  button {
    width: 134px;
    height: 37px;

    border-radius: 5px;

    font-family: "Lato";
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    border: none;
    margin: 0 13.5px;

    cursor: pointer;
  }
`;

const Refuse = styled.button`
  background: #ffffff;
  color: #1877f2;
`;

const Confirm = styled.button`
  background: #1877f2;
  color: #ffffff;
`;
