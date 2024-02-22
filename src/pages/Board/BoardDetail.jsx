import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Grid } from "@mui/material";
// import BoardComments from "./BoardComments";

// Styled Components
const StyledBoardList = styled.div`
  padding: 0px;
  margin: 0px;
  text-align: center;
  //width: 80%;
  font-size: 13px;
`;

const Container = styled.div``;

const Card = styled.div`
  margin: 3% auto;

  max-width: 55%; /* 수정: 카드 최대 너비를 더 넓게 조정 */
  // width: 100%;
`;

const Admin = styled.p`
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 1px bold;
  text-align: right;
`;

const Title = styled.h2`
  color: #333;
`;
const BoardContent = styled.pre`
  margin: 0 auto;
  text-align: left;
  height: 500px;
  border: 1px solid black;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10%;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Button = styled.button`
  margin: 0px;
  padding: 10px;
  font-size: 15px;
  background-color: #42a5f5;
  color: #fff;
  border: none;
  border-radius: 5px;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #0d47a1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardDetail = () => {
  const { boardSeq } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} `;
  };
  useEffect(() => {
    const getBoard = async () => {
      try {
        const resp = await axios.get(`/board/BoardDetail/${boardSeq}`);
        setBoard([resp.data]);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    getBoard();
  }, [boardSeq]);

  const handleBack = () => {
    navigate("/boardList");
  };

  const handleModify = () => {};

  //   function findPW = async () =>{

  //         const response = await axios.get(`/board/getBoardPw/${boardSeq}`);
  //         console.log(response.data);

  //         return response;

  // };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("삭제 비밀번호를 입력하세요");

    if (confirmDelete) {
      // 여기에 비밀번호 확인 로직을 추가하세요
      const password = prompt("비밀번호를 입력하세요");
      const correctPassword = await axios.get(`/board/getBoardPw/${boardSeq}`);
      console.log("입력", password);
      console.log("찾음", correctPassword.data);

      try {
        console.log("입력", password);
        if (password && password == correctPassword.data) {
          console.log("입력", boardSeq);
          await axios.delete(`/board/BoardDelete/${boardSeq}`);
          alert("삭제되었습니다");
          navigate("/boardList");
        } else {
          alert("비밀번호가 일치하지 않습니다. 삭제 실패");
        }
      } catch (error) {
        console.error("글 삭제 실패", error);
      }
    }
  };

  return (
    <StyledBoardList>
      <Container>
        {board.map((boardItem, index) => (
          <div key={index}>
            <Card>
              <Title>제목 : {boardItem.boardTitle}</Title>
              <Admin>
                작성자 : {boardItem.boardWriter} |{" "}
                {formatDate(boardItem.boardDate)}
              </Admin>
              <hr />
              <br />
              <BoardContent>{boardItem.boardContent}</BoardContent>
            </Card>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                <Button onClick={handleBack}>이전</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleModify}>수정</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleDelete}>삭제</Button>
              </Grid>
            </Grid>
          </div>
        ))}
        {/* <BoardComments boardSeq={boardSeq} /> */}
      </Container>
    </StyledBoardList>
  );
};
export default BoardDetail;
