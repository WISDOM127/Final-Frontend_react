import React, { useState } from "react";
import CommentItem from "./CommentItem";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const StyledBoardList = styled.div`
  padding: 0px;
  margin: 0px;
  //width: 80%;
  font-size: 13px;

  .memoSection {
    width: 50%;
    height: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: center;
    margin: 2% auto;
    overflow-y: auto;
  }

  textarea {
    width: 98%;
    height: 100px;
    font-size: 12px;
    background-color: #f2f2f2;
    border-radius: 10px;
    border: none; /* 테두리 없앰 */
    padding: 10px; /* 내부 여백 추가 */
  }
`;

const Button = styled.button`
  margin: 0px;
  padding: 7px;
  font-size: 13px;
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

// 덧글을 입력하고 표시하는 부모 컴포넌트
const BoardComments = (props) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const { boardseq } = props;

  const handleCommentSubmit = async () => {
    try {
      if (commentText.trim() !== '') {
        // 새로운 덧글 추가
        const newComment = { text: commentText };

        // 서버로 데이터 전송
        const response = await axios.post(`/board/insertComment`, newComment);

        // 서버로부터의 응답을 기반으로 덧글 목록 갱신
        setComments([...comments, response.data]);

        // 덧글 입력 창 초기화
        setCommentText('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  const handleCommentDelete = async (commentToDelete) => {
    try {
      // 선택된 덧글 삭제
      await axios.delete(`/board/deleteComments/${commentToDelete.id}`);

      // 삭제된 덧글을 제외한 나머지 덧글 목록 갱신
      const updatedComments = comments.filter((comment) => comment.id !== commentToDelete.id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <StyledBoardList>
      <div className="memoSection">
        <h2>덧글</h2>
        <div className="commentInput">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="덧글을 입력하세요."
          />
          <button onClick={handleCommentSubmit}>등록</button>
        </div>

        <div className="commentList">
          {/* 덧글 목록 */}

          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.text}</p>
              <button onClick={() => handleCommentDelete(comment)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </StyledBoardList>
  );
};

export default BoardComments;
