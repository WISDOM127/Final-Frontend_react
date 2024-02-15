import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import { Grid } from "@mui/material";
import "../../assets/AirRouteInfo.css";

const StyledBoardList = styled.div`
  padding: 0px;
  margin: 0px;
  text-align: center;
  //width: 80%;
  font-size: 13px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // 수평 가운데 정렬을 위해 추가
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px;
  width: 50%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchButton = styled.button`
  padding: 8px 15px;
  background-color: #42a5f5;
  //#0d47a1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AirRouteInfoList = () => {
  const [board, setBoards] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [flightData, setFlightData] = useState(null);

  //초기 랜더링시 전체 리스트 반환
  useEffect(() => {
    axios
      .get("/airRoute/getBoardList")
      .then((response) => setBoards(response.data))
      .catch((error) => console.error(error));
  }, []);

  //검색버튼
  const handleSearch = async () => {
    setLoading(true); //로딩 상태 활성화
    try {
      console.log("부트 전송전" + searchText);
      const response = await axios.post("/airRoute/searchFlight", searchText);
      console.log("요청성공" + response.data);

      //Boot 에서 반환한 데이터를 congestionData 에 저장
      setFlightData(response.data);

      console.log(response.data.remark);
      console.log("서버에서 받은 데이터 :" + flightData.flightId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <StyledBoardList>
      <div className="linkMenu">
        <Link to="/">홈</Link> > <Link to="/">항공편조회</Link>
      </div>

      <Grid>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="항공편명을 입력하세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
      </Grid>

      {/* <h1>게시판</h1> */}
      <table>
        <thead>
          <tr>
            <th className="airline"> 항공사 </th>
            <th className="no">편명</th>
            <th className="dep">도착지</th>
            <th className="scheduleTime">계획</th>
            <th className="estimatedTime">예상</th>
            <th className="remark">현황</th>
            <th className="chkin">체크인카운터</th>
            <th className="gate">탑승구</th>
          </tr>
        </thead>
        <tbody>
          {board.map((list, index) => (
            <tr key={index}>
              <td className="airline">{list.airline}</td>
              <td className="no">{list.flightId}</td>
              <td className="dep">{list.airport}</td>
              <td className="scheduleTime">{list.scheduleDateTime}</td>
              <td className="estimatedTime">{list.estimatedDateTime}</td>
              <td className="remark">{list.remark}</td>
              <td className="chkin">{list.chkinrange}</td>
              <td className="gate">{list.gatenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link className="button" to="/board/BoardWrite">글 작성</Link> */}
    </StyledBoardList>
  );
};

export default AirRouteInfoList;
