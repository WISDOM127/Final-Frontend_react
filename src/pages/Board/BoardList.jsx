import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledBoardList = styled.div`
  padding: 0px;
  margin: 0px;
  text-align: center;
  //width: 80%;
  font-size: 13px;

  .linkMenu{
    text-align: left;
    //border: 1px solid #ddd;
    width: 80%;
    margin: 10px auto;
  }

  .linkMenu a {
    text-decoration: none;
  }

  h1 {
    //font-size: 20px;
    text-align: center;
  }

  table {
    width: 60%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  td {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    padding: 3%;
    text-align: center;
  }

  th {
    //background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    border-top: 1px solid;
    padding: 2%;
    text-align: center;
  }

  .date{
    width: 11%;
    //border: 1px solid #ddd;
  }

  .view{
    width: 9%;
    //border: 1px solid #ddd;
  }

  .writer{
    width: 12%;
  }

  
  .title{
    width: 60%;
  }

  .no{
    width: 8%;
  }

  .button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px;
    display: inline-block;
    padding: 10px;
    background-color: #42a5f5;
    color: #fff;
    text-decoration: none;
    margin-right: 10px;

    &:hover {
      background-color: #0d47a1;
    }
  }
`;

const BoardList = () => {
  const [board, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get("/board/BoardList")
      .then((response) => setBoards(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <StyledBoardList>
      <div className="linkMenu">
        <Link to="/">홈</Link> > <Link to="/">커뮤니티</Link> > 
        <Link to="/"> 게시판</Link>
      </div>

      <h1>게시판</h1>
      <table>
        <thead>
          <tr>
            <th className="no"> NO </th>
            <th className="title">제목</th>
            <th className="writer">작성자</th>
            <th className="view">조회수</th>
            <th className="date">날 짜</th>
          </tr>
        </thead>
        <tbody>
          {board.map((list, index) => (
            <tr key={index}>
              <td className="no">{list.boardSeq}</td>
              <td className="title">
                <Link to={`/board/BoardDetail/${list.boardSeq}`}>
                  {list.boardTitle}
                </Link>
              </td>
              <td className="writer">{list.boardWriter}</td>
              <td className="view">{list.boardViews}</td>
              <td className="date">{list.boardDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="button" to="/board/BoardWrite">
        글 작성
      </Link>
      
    </StyledBoardList>
  );
};

export default BoardList;
