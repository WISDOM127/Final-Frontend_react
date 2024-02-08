import * as React from "react";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import T1Mapper from "../../components/T1Mapper";
import T2Mapper from "../../components/T2Mapper";
import getToday from "../../components/GetToday";

import axios from "axios";

export default function TerminalsInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showT1Mapper, setShowT1Mapper] = useState(false);
  const [showT2Mapper, setShowT2Mapper] = useState(false);
  const [congestionData, setCongestionData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState(1);

  const todayInfo = getToday;
  const { year, month, day, hours } = todayInfo;
  const todayValue = year + month + day; //'yyyyMMdd'

  // 출력
  console.log("JSON:", todayInfo);
  console.log("년:", year);
  console.log("월:", month);
  console.log("시:", hours);
  console.log("년월일:", todayValue);

  const atime = hours;

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
    setShowT1Mapper(true);
    setShowT2Mapper(false);
    navigate(`/terminalsInfo/t1info`);
  };
  const handleTerminal2click = (event) => {
    setSelectedBtn(2);
    setShowT1Mapper(false);
    setShowT2Mapper(true);
    navigate(`/terminalsInfo/t2info`);
  };

  return (
    <div className="P_T1Info">
      <br />
      {/* <Button variant="outlined" onClick={() => handleTerminalClick(0)}>
        Terminal 1
      </Button> */}

      <Button
        variant="outlined"
        onClick={handleTerminal1click}
      >
        Terminal 1
      </Button>
      <Button
        variant="outlined"
        onClick={handleTerminal2click}
      >
        Terminal 2
      </Button>

      <Grid
        container
        justifyContent="center"
        spacing={5}
        sx={{
          mt: 1,
        }}
      >
        {/* {showT1Mapper && <T1Mapper congestionData={congestionData} />} */}
        {/* {showT2Mapper && <T2Mapper congestionData={congestionData} />} */}
        {/* <TerminalsMain infoContents="" infoCardsections={[selectedTerminal]} /> */}
        {selectedBtn === 1 && <T1Mapper congestionData={congestionData} />}
        {selectedBtn === 2 && <T2Mapper congestionData={congestionData} />}
      </Grid>
    </div>
  );
}
