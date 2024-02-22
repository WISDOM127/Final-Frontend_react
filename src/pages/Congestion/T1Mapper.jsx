import React, { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import "../../assets/T1T2Mapper.css";
import { Typography } from "@mui/material";

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
const depCoords1080px = [
  [830, 633, 870, 664, 840, 697, 799, 667],
  [753, 595, 801, 617, 779, 656, 730, 636],
  [646, 573, 699, 582, 688, 624, 636, 616],
  [431, 576, 485, 568, 491, 611, 440, 620],
  [317, 609, 369, 593, 386, 632, 336, 650],
  [221, 656, 268, 629, 295, 666, 249, 693],
];

const depCoords720px = [
  [554, 423, 580, 443, 561, 465, 533, 445],
  [503, 398, 535, 412, 519, 439, 487, 423],
  [431, 382, 465, 389, 459, 416, 425, 410],
  [287, 386, 322, 379, 328, 408, 292, 414],
  [212, 405, 246, 395, 257, 422, 223, 434],
  [148, 437, 178, 421, 197, 444, 166, 462],
];

const depCoords450px = [
  [346, 265, 363, 277, 350, 291, 333, 279],
  [315, 249, 334, 258, 324, 274, 305, 264],
  [269, 240, 290, 243, 287, 260, 265, 257],
  [180, 241, 202, 238, 205, 255, 183, 259],
  [133, 254, 154, 247, 160, 264, 140, 271],
  [93, 274, 112, 263, 122, 278, 103, 288],
];

const T1Mapper = ({ congestionData }) => {
  const URL = "/img/t1map1080x1200.png";
  const [hoveredArea, setHoveredArea] = useState(null);
  const [imageWidth, setImageWidth] = useState(window.innerWidth);
  const [imageHeight, setImageHeight] = useState();

  //반응형 포인트 설정 변수
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tab"));
  const isLap = useMediaQuery(theme.breakpoints.down("laptop"));

  //출국장 대기인원 수 (ex)intCongestions.dep12
  const intCongestions = {
    dep12: parseInt(congestionData.t1sum5, 10) || 0,
    dep3: parseInt(congestionData.t1sum6, 10) || 0,
    dep4: parseInt(congestionData.t1sum7, 10) || 0,
    dep56: parseInt(congestionData.t1sum8, 10) || 0,
  };

  const [colorStatus1, setColorStatus1] = useState("");
  const [colorStatus2, setColorStatus2] = useState("");
  const [colorStatus3, setColorStatus3] = useState("");
  const [colorStatus4, setColorStatus4] = useState("");
  const [colorStatus5, setColorStatus5] = useState("");
  const [colorStatus6, setColorStatus6] = useState("");

  const [coordstatus1, setCoordstatus1] = useState([]);
  const [coordstatus2, setCoordstatus2] = useState([]);
  const [coordstatus3, setCoordstatus3] = useState([]);
  const [coordstatus4, setCoordstatus4] = useState([]);
  const [coordstatus5, setCoordstatus5] = useState([]);
  const [coordstatus6, setCoordstatus6] = useState([]);

  // 초기 렌더링 시에 브라우저 사이즈를 읽어옴
  useEffect(() => {
    setImageWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setImageWidth(450);
      setImageHeight(500);
      setCoordstatus6(depCoords450px[5]);
      setCoordstatus5(depCoords450px[4]);
      setCoordstatus4(depCoords450px[3]);
      setCoordstatus3(depCoords450px[2]);
      setCoordstatus2(depCoords450px[1]);
      setCoordstatus1(depCoords450px[0]);
    } else if (isLap) {
      setImageWidth(720);
      setImageHeight(800);
      setCoordstatus6(depCoords720px[5]);
      setCoordstatus5(depCoords720px[4]);
      setCoordstatus4(depCoords720px[3]);
      setCoordstatus3(depCoords720px[2]);
      setCoordstatus2(depCoords720px[1]);
      setCoordstatus1(depCoords720px[0]);
    } else {
      setImageWidth(1080);
      setImageHeight(1200);
      setCoordstatus6(depCoords1080px[5]);
      setCoordstatus5(depCoords1080px[4]);
      setCoordstatus4(depCoords1080px[3]);
      setCoordstatus3(depCoords1080px[2]);
      setCoordstatus2(depCoords1080px[1]);
      setCoordstatus1(depCoords1080px[0]);
    }

    console.log("좌표저장확인" + coordstatus1);
  }, [isMobile, isLap, imageWidth]);

  const condition = (passenger, ColorStatus) => {
    if (passenger <= 1160) {
      return ColorStatus(colorCodes.colorSky);
    } else if (passenger > 1160 && passenger <= 1260) {
      return ColorStatus(colorCodes.colorGreen);
    } else if (passenger > 1260 && passenger <= 1360) {
      return ColorStatus(colorCodes.colorYellow);
    } else if (passenger > 1360 && passenger <= 1430) {
      return ColorStatus(colorCodes.colorOrange);
    } else {
      return ColorStatus(colorCodes.colorRed);
    }
  };

  //출국장 1
  useEffect(() => {
    let passenger = intCongestions.dep12;
    console.log("1", passenger);
    condition(passenger, setColorStatus1);
    setCoordstatus1(depCoords1080px[0]); // 출국장1
  }, [intCongestions.dep12]);

  //출국장 2
  useEffect(() => {
    let passenger = intCongestions.dep12;
    console.log("2", passenger);

    condition(passenger, setColorStatus2);
    setCoordstatus2(depCoords1080px[1]); // 출국장2
  }, [intCongestions.dep12]);

  //출국장 3
  useEffect(() => {
    let passenger = intCongestions.dep3;
    console.log("3", passenger);

    condition(passenger, setColorStatus3);
    setCoordstatus3(depCoords1080px[2]); // 출국장3
  }, [intCongestions.dep3]);

  //출국장 4
  useEffect(() => {
    let passenger = intCongestions.dep4;
    console.log("4", passenger);

    condition(passenger, setColorStatus4);
    setCoordstatus4(depCoords1080px[3]); // 출국장4
    //console.log("3", coordstatus3);
  }, [intCongestions.dep4]);

  //출국장 5
  useEffect(() => {
    let passenger = intCongestions.dep56;
    console.log("5", passenger);

    condition(passenger, setColorStatus5);
    setCoordstatus5(depCoords1080px[4]); // 출국장5
    //console.log("3", coordstatus3);
  }, [intCongestions.dep56]);

  //출국장 6
  useEffect(() => {
    let passenger = intCongestions.dep56;
    console.log("6", passenger);
    condition(passenger, setColorStatus6);
    setCoordstatus6(depCoords1080px[5]); // 출국장6
  }, [intCongestions.dep56]);

  const MAP = {
    name: "my-map",
    areas: [
      {
        name: "6",
        shape: "poly",
        coords: coordstatus6,
        strokeColor: colorStatus6.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus6,
        //count: intCongestions.dep56,

        msg: "교통약자 우대출구",
      },
      {
        name: "5",
        shape: "poly",
        coords: coordstatus5,
        strokeColor: colorStatus5.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus5,

        count: intCongestions.dep56,
      },
      {
        name: "4",
        shape: "poly",
        coords: coordstatus4,
        strokeColor: colorStatus4.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus4,

        count: intCongestions.dep4,
      },
      {
        name: "3",
        shape: "poly",
        coords: coordstatus3,
        strokeColor: colorStatus3.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus3,

        count: intCongestions.dep3,
      },
      {
        name: "2",
        shape: "poly",
        coords: coordstatus2,
        strokeColor: colorStatus2.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus2,

        count: intCongestions.dep12,
      },
      {
        name: "1",
        shape: "poly",
        coords: coordstatus1,
        strokeColor: colorStatus1.slice(0, -2),
        lineWidth: "2.5",
        //preFillColor: colorCodes.colorRed,
        preFillColor: colorStatus1,

        msg: "교통약자 우대출구",
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
          {hoveredArea.name === "1" || hoveredArea.name === "6" ? (
            <p>{hoveredArea.msg}</p>
          ) : (
            <>
              {hoveredArea.preFillColor === colorCodes.colorSky ? 
                <p>원활</p>
              : hoveredArea.preFillColor === colorCodes.colorGreen ? <p>보통</p> :hoveredArea.preFillColor === colorCodes.colorYellow ? <p>약간혼잡</p> : hoveredArea.preFillColor === colorCodes.colorOrange ? <p>혼잡</p>: hoveredArea.preFillColor === colorCodes.colorRed ? <p>매우혼잡</p>: "none"}
              <p>예상 대기 인원 : {hoveredArea.count} 명</p>
            </>
          )}
        </span>
      )}
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: { xs: "10px", tab: "15px" },
          whiteSpace: "pre-line",
          color: "primary.dark",
        }}
        paragraph
      >
        - 제1여객터미널 1번, 6번 출국장은 교통약자 우대출구로, 공항 예상혼잡도
        대상에서 제외됩니다.
      </Typography>
    </div>
  );
};

export default T1Mapper;
