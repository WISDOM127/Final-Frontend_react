import { Pagination } from "@mui/material";
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

  .linkMenu {
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

  .date {
    width: 16%;
    //border: 1px solid #ddd;
  }

  .view {
    width: 9%;
    //border: 1px solid #ddd;
  }

  .writer {
    width: 12%;
  }

  .title {
    width: 50%;

    a {
      text-decoration: none;
      color: black;
      display: block;
      padding: 0;
    }

    a:hover {
      background-color: lightYellow; /* 원하는 배경색으로 변경하세요 */
      text-decoration: underline;
    }
  }

  .no {
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
const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // 수평 가운데 정렬을 위해 추가
`;

const BoardList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [board, setBoards] = useState([]);

  //최종 수정 시간 가공
  // const [changeDate, setChangeDate] = useState("");
  // const dateObj = new Date(changeDate);
  // const 년월일 = dateObj.toLocaleDateString();
  // const 시간 = dateObj.toLocaleTimeString();
  // const 최종수정일시 = 년월일 + " " + 시간;
  // console.log(`수정날짜 조회: ${최종수정일시}`);
  // setChangeDate(최종수정일시);

  //초기 랜더링시 전체 리스트 반환
  // useEffect(() => {
  //   setLoading(true); //로딩 상태 활성화
  //   axios
  //     .get("/airRoute/getBoardList")
  //     .then((response) => setBoards(response.data))
  //     .catch((error) => console.error(error));
  // }, []);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1);
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get(`/board/BoardList`, {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        console.log("요청 성공: ", response.data);
        const { content, totalPages } = response.data;

        //값 주입
        setBoards(content);
        setTotalPages(totalPages);
      } catch (error) {}
    };
    fetchPages();
  }, [currentPage, pageSize]);

  return (
    <StyledBoardList>
      <div className="linkMenu">
        <Link to="/">홈</Link> > <Link to="/">커뮤니티</Link> >
        <Link to="/"> 게시판</Link>
      </div>

      <h1>커뮤니티 게시판</h1>
      <p>실시간 공항 혼잡 관련 정보를 자유롭게 나누는 공간입니다</p>
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
          {board.map((lists, index) => (
            <tr key={index}>
              <td className="no">{lists.boardSeq}</td>
              <td className="title">
                <Link to={`/board/BoardDetail/${lists.boardSeq}`}>
                  {lists.boardTitle}
                </Link>
              </td>
              <td className="writer">{lists.boardWriter}</td>
              <td className="view">{lists.boardViews}</td>
              <td className="date">{lists.boardDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Page: {currentPage + 1} / totalPages: {totalPages}
      </p>
      <CenterContainer>
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
        />
      </CenterContainer>
      <Link className="button" to="/board/BoardWrite">
        글 작성
      </Link>
    </StyledBoardList>
  );
};

export default BoardList;
