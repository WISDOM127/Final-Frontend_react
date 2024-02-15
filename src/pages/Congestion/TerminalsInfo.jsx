import * as React from "react";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import T1Mapper from "./T1Mapper";
import T2Mapper from "./T2Mapper";
import getToday from "../../components/GetToday";
import styled from "styled-components";
import axios from "axios";
import CongestionTable from "../../components/CongestionTable";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

//스타일
const TimeContainer = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: #424242;
  //border: 1px solid #ddd;
`;

// const TableContainer = styled.div`
//   font-size: 30px;
// `;

const TerminalsInfo = (어떤변수) => {
  const { terminalId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showT1Mapper, setShowT1Mapper] = useState(false);
  const [showT2Mapper, setShowT2Mapper] = useState(false);
  const [congestionData, setCongestionData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState(1);

  const todayInfo = getToday;
  const { year, month, day, hours, minutes, seconds } = todayInfo;
  const todayValue = year + month + day; //'yyyyMMdd'
  const nowTime = `${hours} : ${minutes} `;
  // useState 이용, 랜더링 후 첫 값은 nowTime return 값 사용
  const [clock, setclock] = useState(nowTime);

  // 1분마다 clock의 값을 다시 계산 후 랜더링 (setClock 이용)
  // setInterval(() => setclock(nowTime), 60000);

  // 출력
  console.log("JSON:", todayInfo);
  console.log("시간:", clock);

  const atime = hours;
  const today = year + "년 " + month + "월 " + day + "일 " + clock;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); //로딩 상태 활성화
      try {
        console.log("부트 전송전" + atime);
        const response = await axios.post("/api/congestionData", atime);
        console.log("요청성공" + atime);

        //Boot 에서 반환한 데이터를 congestionData 에 저장
        setCongestionData(response.data);
        console.log(response);
        console.log(response.data);
        console.log(response.data.t1sum6);

        console.log("서버에서 받은 데이터 :" + congestionData?.t1sum6);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [atime]);
  //atime

  //대기중일때
  if (loading) {
    return <div className="P_T1Info">대기중...</div>;
  }

  if (!congestionData) {
    return null;
  }

  //onChange={handleTerminalClick1} 으로 입력데이터가 변할 때마다 멤버 객체의 데이터 값도 변한다.
  const handleTerminal1click = (event) => {
    setSelectedBtn(1);
    navigate(`/terminals/t1info`);
    setShowT1Mapper(true);
    setShowT2Mapper(false);
  };
  const handleTerminal2click = (event) => {
    setSelectedBtn(2);
    navigate(`/terminals/t2info`);
    setShowT1Mapper(false);
    setShowT2Mapper(true);
  };

  const reloadclick = (event) => {
    window.location.reload();
  };

  return (
    <div className="P_T1Info">
      <br />
      <Button variant="outlined" onClick={handleTerminal1click}>
        Terminal 1
      </Button>
      <Button variant="outlined" onClick={handleTerminal2click}>
        Terminal 2
      </Button>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <TimeContainer>현재시간 : {today}</TimeContainer>
        </Grid>
        <Grid>
          <ReplayRoundedIcon
            fontSize="large"
            color="secondary"
            onClick={reloadclick}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        sx={{
          mt: 1,
        }}
      >
        <Grid
          item
          sx={{
            margin: "auto",
          }}
        >
          {/* {showT1Mapper && <T1Mapper congestionData={congestionData} />} */}
          {/* {showT2Mapper && <T2Mapper congestionData={congestionData} />} */}
          {/* {selectedBtn === 1 && <T1Mapper congestionData={congestionData} />}
        {selectedBtn === 2 && <T2Mapper congestionData={congestionData} />} */}
          {terminalId === "t1info" && (
            <T1Mapper congestionData={congestionData} />
          )}
          {terminalId === "t2info" && (
            <T2Mapper congestionData={congestionData} />
          )}
        </Grid>
        <br />
        <Grid
          Container
          fixed
          item
          sx={{
            margin: "5px auto",
          }}
        >
          <CongestionTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default TerminalsInfo;
