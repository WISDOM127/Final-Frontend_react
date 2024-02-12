import React, { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import "../../assets/T1Mapper.css";

//테스트
//console.log("매퍼로 넘어온 값 : " + congestionData.t1sum8);
//console.log(intCongestions.dep56);

//반응형 컬러 (호출 -> colorCodes.colorRed)
const colorCodes = {
  colorRed: "#9900006e",
  colorOrange: "#FF33006e",
  colorYellow: "#ffcc006e",
  colorGreen: "#99ff996e",
  colorSky: "#99ffff6e",
  colorNone: "",
};

//반응형 좌표 (호출 -> depCoords[0])
const depCoords1200px = [
  [678, 427, 735, 435, 729, 482, 673, 477],
  [461, 433, 521, 424, 526, 476, 469, 484],
];

const depCoords1080px = [
  [610, 383, 662, 389, 657, 435, 606, 429],
  [416, 390, 468, 383, 473, 428, 423, 436],
];

const depCoords600px = [
  [339, 214, 368, 216, 365, 241, 336, 239],
  [231, 216, 261, 213, 262, 238, 235, 242],
];

const T2Mapper = ({ congestionData }) => {
  const URL = "/img/t2map1200x700.png";
  const [hoveredArea, setHoveredArea] = useState(null);

  //intCongestions.dep12 출국장의 대기인원 수
  const intCongestions = {
    dep1: parseInt(congestionData.t2sum3, 10) || 0,
    dep2: parseInt(congestionData.t2sum4, 10) || 0,
  };

  const [colorStatus1, setColorStatus1] = useState("");
  const [colorStatus2, setColorStatus2] = useState("");

  const [coordstatus1, setCoordstatus1] = useState([]);
  const [coordstatus2, setCoordstatus2] = useState([]);

  //반응형 포인트 설정 변수
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tab"));
  const isLap = useMediaQuery(theme.breakpoints.down("laptop"));
  const [imageWidth, setImageWidth] = useState(window.innerWidth);
  const [imageHeight, setImageHeight] = useState();

  // 초기 렌더링 시에 브라우저 사이즈를 읽어옴
  useEffect(() => {
    setImageWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setImageWidth(600);
      setImageHeight(350);
      setCoordstatus2(depCoords600px[1]);
      setCoordstatus1(depCoords600px[0]);
    } else if (isLap) {
      setImageWidth(1080);
      setImageHeight(630);
      setCoordstatus2(depCoords1080px[1]);
      setCoordstatus1(depCoords1080px[0]);
    } else {
      setImageWidth(1200);
      setImageHeight(700);
      setCoordstatus2(depCoords1200px[1]);
      setCoordstatus1(depCoords1200px[0]);
    }

    console.log("좌표저장확인" + coordstatus1);
  }, [isMobile, isLap, imageWidth]);

  const condition = (passenger, ColorStatus) => {
    if (passenger < 1600) {
      return ColorStatus(colorCodes.colorSky);
    } else if (passenger >= 1600 && passenger <= 1750) {
      return ColorStatus(colorCodes.colorGreen);
    } else if (passenger > 1750 && passenger <= 1900) {
      return ColorStatus(colorCodes.colorYellow);
    } else if (passenger > 1900 && passenger <= 2000) {
      return ColorStatus(colorCodes.colorOrange);
    } else {
      return ColorStatus(colorCodes.colorRed);
    }
  };

  //출국장 1
  useEffect(() => {
    let passenger = intCongestions.dep1;
    console.log("1", passenger);
    condition(passenger, setColorStatus1);
    setCoordstatus1(depCoords1200px[0]); // 출국장1
  }, [intCongestions.dep1]);

  //출국장 2
  useEffect(() => {
    let passenger = intCongestions.dep2;
    console.log("2", passenger);
    condition(passenger, setColorStatus2);
    setCoordstatus2(depCoords1200px[1]); // 출국장2
  }, [intCongestions.dep2]);

  const MAP = {
    name: "my-map",
    areas: [
      {
        name: "2",
        shape: "poly",
        coords: coordstatus2,
        strokeColor: colorStatus2.slice(0, -2),
        lineWidth: "3",
        preFillColor: colorStatus2,
        count: intCongestions.dep2,
      },
      {
        name: "1",
        shape: "poly",
        coords: coordstatus1,
        strokeColor: colorStatus1.slice(0, -2),
        lineWidth: "3",
        preFillColor: colorStatus1,
        count: intCongestions.dep1,
      },
    ],
  };

  //출국장 범위에 hover 시 동작
  const enterArea = (area) => {
    setHoveredArea(area);
  };

  const leaveArea = () => {
    setHoveredArea(null);
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

  return (
    <div className="container">
      {/* <div>{msg}</div> */}
      <ImageMapper
        src={URL}
        map={MAP}
        width={imageWidth}
        height={imageHeight}
        onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={() => leaveArea()}
      />
      {hoveredArea && (
        <span className="tooltip" style={{ ...getTipPosition(hoveredArea) }}>
          {hoveredArea.name} 번 출국장
          <p>예상 대기 인원 : {hoveredArea.count} 명</p>
        </span>
      )}
    </div>
  );
};

export default T2Mapper;
