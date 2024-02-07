import React, { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import "../assets/T1Mapper.css";

//테스트
//console.log("매퍼로 넘어온 값 : " + congestionData.t1sum8);
//console.log(intCongestions.dep56);

//반응형 컬러 (호출 -> colorCodes.colorRed)
const colorCodes = {
  colorRed: "#CC00005e",
  colorOrange: "#FF33005e",
  colorGreen: "#99cc665e",
  colorSky: "#64ffff5e",
  colorNone: "",
};

//반응형 좌표 (호출 -> depCoords[0])
const depCoords1080px = [
  [678, 427, 735, 435, 729, 482, 673, 477],
  [461, 433, 521, 424, 526, 476, 469, 484],
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

  //const [coordStatus, setCoordStatus] = useState([]);
  const [coordstatus1, setCoordstatus1] = useState([]);
  const [coordstatus2, setCoordstatus2] = useState([]);

  //반응형 변화

  //반응형 포인트 설정 변수
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tab"));
  const isLap = useMediaQuery(theme.breakpoints.down("laptop"));
  const [imageWidth, setImageWidth] = useState(1200);

  useEffect(() => {
    if (isMobile) {
      setImageWidth(600);
    } else if (isLap) {
      setImageWidth(1080);
    } else {
      setImageWidth(1200);
      setCoordstatus2(depCoords1080px[1]);
      setCoordstatus1(depCoords1080px[0]);
    }

    console.log("좌표저장확인" + coordstatus1);
  }, [isMobile, isLap]);

  //출국장 1
  useEffect(() => {
    let passenger = intCongestions.dep1;
    console.log("1", passenger);

    //t2 기준
    if (passenger < 1600) {
      setColorStatus1(colorCodes.colorSky);
    } else if (passenger >= 1600 && passenger <= 1700) {
      setColorStatus1(colorCodes.colorGreen);
    } else if (passenger > 1700 && passenger <= 1900) {
      setColorStatus1(colorCodes.colorOrange);
    } else if (passenger > 1900) {
      setColorStatus1(colorCodes.colorRed);
    }
    setCoordstatus1(depCoords1080px[0]); // 출국장1
  }, []);

  //출국장 2
  useEffect(() => {
    let passenger = intCongestions.dep2;
    console.log("2", passenger);

    if (passenger < 1150) {
      setColorStatus2(colorCodes.colorSky);
    } else if (passenger >= 1150 && passenger <= 1250) {
      setColorStatus2(colorCodes.colorGreen);
    } else if (passenger > 1250 && passenger <= 1350) {
      setColorStatus2(colorCodes.colorOrange);
    } else if (passenger > 1350) {
      setColorStatus2(colorCodes.colorRed);
    }
    setCoordstatus2(depCoords1080px[1]); // 출국장2
  }, []);

  // const MAP = {
  //   name: "my-map",
  //   areas: coordStatusArray.map((coords, index) => ({
  //     name: (index + 1).toString(),
  //     shape: "poly",
  //     coords: coords,
  //     strokeColor: "grey",
  //     lineWidth: "2",
  //     preFillColor: colorStatus,
  //   })),
  // };

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
      },
      {
        name: "1",
        shape: "poly",
        coords: coordstatus1,
        strokeColor: colorStatus1.slice(0, -2),
        lineWidth: "3",
        preFillColor: colorStatus1,
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
        onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={() => leaveArea()}
      />
      {hoveredArea && (
        <span className="tooltip" style={{ ...getTipPosition(hoveredArea) }}>
          {hoveredArea.name}
        </span>
      )}
    </div>
  );
};

export default T2Mapper;
