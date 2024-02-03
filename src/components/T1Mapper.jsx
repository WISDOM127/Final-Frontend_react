import * as React from "react";
//import Grid from "@mui/material/Grid";
import ImageMapper from "react-img-mapper";
import { useState, useEffect } from "react";
import "../assets/T1Mapper.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";

const T1Mapper = ({ selectedTerminal, publicData }) => {
  //const URL = selectedTerminal.image;
  const URL = "/img/t1map1080x1200.png";
  const [colorstatus, setColorstatus] = useState("blue");
  const [coordstatus1, setCoordstatus1] = useState("");
  const [coordstatus2, setCoordstatus2] = useState("");
  const [coordstatus3, setCoordstatus3] = useState("");
  const [coordstatus4, setCoordstatus4] = useState("");
  const [coordstatus6, setCoordstatus6] = useState("");

  const [hoveredArea, setHoveredArea] = useState(null);

  //혼잡 컬러 기준
  const colorRed = "#CC00006e";
  const colorOrange = "#FF33007e";
  const colorGreen = "#99cc665e";
  const colorSky = "#64ffff5e";

  //반응형 t1 출국장 좌표
  const t1dep1_1080px = [221, 656, 266, 632, 293, 665, 249, 693];

  // Overcrowded  /Crowded / Commonly / Good 매우혼잡 / 혼잡/ 보통/ 원활

  //반응형 웹 사이즈 조절
  const theme = useTheme();
  //가로가 768px 이하일 때 - tab
  const isMobile = useMediaQuery(theme.breakpoints.down("tab"));
  //가로가 1024px 이하일 때 - laptop
  const isLap = useMediaQuery(theme.breakpoints.down("laptop"));

  const [imageWidth, setImageWidth] = useState(1080);

  // 반응형 - 맵핑 이미지 크기 변경
  useEffect(() => {
    if (isMobile) {
      setImageWidth(450);
    } else if (isLap) {
      setImageWidth(700);
    } else {
      setImageWidth(1080);
      setCoordstatus6(t1dep1_1080px);
    }
  }, [isMobile, isLap]);

  // publicData에 있는 값에 따라 colorstatus를 동적으로 업데이트
  useEffect(() => {
    //밀집 인구 수
    let publicData = 101;

    if (publicData && publicData.someCondition) {
      setColorstatus(colorGreen);
    } else {
      setColorstatus(colorSky);
    }
  }, [publicData]);

  // 빈 배열을 전달하는 경우 : 컴포넌트가 마운트될 때만 실행되도록 함
  // publicData가 변경될 때마다 useEffect 실행

  const MAP = {
    name: "my-map",
    areas: [
      {
        name: "6",
        shape: "poly",
        coords: coordstatus6,
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: colorRed,
        // fillColor: colorstatus,
      },
      {
        name: "5",
        shape: "poly",
        coords: [222, 479, 256, 465, 269, 497, 235, 511],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: colorOrange,
        //fillColor: 0,
      },
      {
        name: "4",
        shape: "poly",
        coords: [301, 454, 338, 448, 343, 483, 307, 488],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: colorRed,
        //fillColor: "",
      },
      {
        name: "3",
        shape: "poly",
        coords: [451, 452, 488, 460, 481, 493, 445, 485],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: "#64ffff5e",
        //fillColor: "",
      },
      {
        name: "2",
        shape: "poly",
        coords: [527, 471, 560, 487, 543, 519, 510, 500],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: colorstatus,
        fillColor: "",
      },
      {
        name: "1",
        shape: "poly",
        coords: coordstatus6,
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: colorRed,
      },
    ],
  };

  const enterArea = (area) => {
    setHoveredArea(area);
  };

  const leaveArea = () => {
    setHoveredArea(null);
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

  // return <ImageMapper src={URL} map={MAP} />;
  return (
    <div className="container">
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

export default T1Mapper;
