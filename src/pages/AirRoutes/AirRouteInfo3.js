import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Pagination,
} from "@mui/material";
import "../../assets/AirRouteInfo.css";
import AirRouteMenu from "./AirRouteMenu";
import WeatherModal from "./WeatherModal";

const StyledBoardList = styled.div`
  padding: 0px;
  margin: 0px;
  text-align: center;
  //width: 80%;
  font-size: 13px;
`;

const MenuContainer = styled.div`
  position: fixed;
  //border: 1px solid black;
  top: 20%;
  width: 170px;
  z-index: 1000;
  transform: translateY(10%);
  //transition: top 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    position: relative;
    background: #fff;
    border-radius: 5px;
    padding: 0px;
  }
`;
const RightContainer = styled.caption`
  //border : 1px solid black;
  text-align: right;
`;

const CenterContainer = styled.div`
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
`;

const AirRouteInfoList = () => {
  //페이징
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [flightData, setFlightData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [flight, setFlight] = useState({
    airport: "",
    scheduleDateTime: "",
    wimage: "",
    senstemp: "",
    temp: "",
    wind: "",
  });

  const handleOpen = (f) => {
    setOpen(true);
    setFlight(f);
    console.log(flight);
  };

  const handleClose = () => setOpen(false);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("검색어: ", searchText);
      const response = await axios.get(
        `/airRoute/getCheckinList?searchText=${searchText}&remark=2`,
        {
          params: {
            page: currentPage,
            size: pageSize,
          },
        }
      );

      console.log("요청 성공: ", response.data);
      const { content, totalPages } = response.data;

      //최종 수정 시간 가공
      const inputString = content[0].modifyDate;
      const dateObj = new Date(inputString);
      const 년월일 = dateObj.toLocaleDateString();
      const 시간 = dateObj.toLocaleTimeString();
      const 최종수정일시 = 년월일 + " " + 시간;
      console.log(`수정날짜 조회: ${최종수정일시}`);

      //값 주입
      setFlightData(content); //항공편 api 데이터
      setTotalPages(totalPages); //size 10 개씩 나누었을 때의 총 페이지수
      setUpdateDate(최종수정일시);
    } catch (error) {
      console.error("데이터를 불러오는 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchClick]);

  const handleSearch = () => {
    setSearchClick(true);
    fetchData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    handleSearch();
  };

  return (
    <StyledBoardList>
      <WeatherModal
        open={open}
        handleClose={handleClose}
        flight={flight}
      ></WeatherModal>
      <div className="linkMenu">
        <Link to="/">홈</Link> > <Link to="/airRouteInfo">항공편조회</Link> >
        지연항공조회
      </div>

      <MenuContainer>
        <AirRouteMenu />
      </MenuContainer>
      <Grid>
        <h1>금일 지연 항공편</h1>
        <CenterContainer>
          <SearchInput
            type="text"
            placeholder="항공편명을 입력하세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton onClick={handleSubmit}>검색</SearchButton>
        </CenterContainer>
      </Grid>

      <table>
        <RightContainer>최종 업데이트 시간 : {updateDate}</RightContainer>
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
          {flightData && flightData.length > 0 ? (
            flightData.map((list, index) => (
              // {board.map((list, index) => (
              <tr key={index}>
                <td className="airline">{list.airline}</td>
                <td className="no">{list.flightId}</td>
                <td className="dep" onClick={() => handleOpen(list)}>
                  {list.airport}
                </td>
                <td className="scheduleTime">{list.scheduleDateTime}</td>
                <td className="estimatedTime">{list.estimatedDateTime}</td>
                <td className="remark">{list.remark}</td>
                <td className="chkin">{list.chkinrange}</td>
                <td className="gate">{list.gatenumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">검색결과가 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <Link className="button" to="/board/BoardWrite">글 작성</Link> */}

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
    </StyledBoardList>
  );
};

export default AirRouteInfoList;
