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

  //intCongestions.dep12 출국장의 대기인원 수
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

  //반응형 변화

  //반응형 포인트 설정 변수
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tab"));
  const isLap = useMediaQuery(theme.breakpoints.down("laptop"));
  const [imageWidth, setImageWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 초기 렌더링 시에 브라우저 사이즈를 읽어옴
    setImageWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setImageWidth(450);
      setCoordstatus6(depCoords450px[5]);
      setCoordstatus5(depCoords450px[4]);
      setCoordstatus4(depCoords450px[3]);
      setCoordstatus3(depCoords450px[2]);
      setCoordstatus2(depCoords450px[1]);
      setCoordstatus1(depCoords450px[0]);
    } else if (isLap) {
      setImageWidth(720);
      setCoordstatus6(depCoords720px[5]);
      setCoordstatus5(depCoords720px[4]);
      setCoordstatus4(depCoords720px[3]);
      setCoordstatus3(depCoords720px[2]);
      setCoordstatus2(depCoords720px[1]);
      setCoordstatus1(depCoords720px[0]);
    } else {
      setImageWidth(1080);
      setCoordstatus6(depCoords1080px[5]);
      setCoordstatus5(depCoords1080px[4]);
      setCoordstatus4(depCoords1080px[3]);
      setCoordstatus3(depCoords1080px[2]);
      setCoordstatus2(depCoords1080px[1]);
      setCoordstatus1(depCoords1080px[0]);
    }

    console.log("좌표저장확인" + coordstatus1);
  }, [isMobile, isLap, imageWidth]);

  //출국장 1
  useEffect(() => {
    let passenger = intCongestions.dep12;
    console.log("1", passenger);

    if (passenger < 1150) {
      setColorStatus1(colorCodes.colorSky);
    } else if (passenger >= 1150 && passenger <= 1250) {
      setColorStatus1(colorCodes.colorGreen);
    } else if (passenger > 1250 && passenger <= 1350) {
      setColorStatus1(colorCodes.colorOrange);
    } else if (passenger > 1350) {
      setColorStatus1(colorCodes.colorRed);
    }
    setCoordstatus1(depCoords1080px[0]); // 출국장1
  }, []);

  //출국장 2
  useEffect(() => {
    let passenger = intCongestions.dep12;
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

  //출국장 3
  useEffect(() => {
    let passenger = intCongestions.dep3;
    console.log("3", passenger);

    if (passenger < 1150) {
      setColorStatus3(colorCodes.colorSky);
    } else if (passenger >= 1150 && passenger <= 1250) {
      setColorStatus3(colorCodes.colorGreen);
    } else if (passenger > 1250 && passenger <= 1350) {
      setColorStatus3(colorCodes.colorOrange);
    } else if (passenger > 1350) {
      setColorStatus3(colorCodes.colorRed);
    }

    setCoordstatus3(depCoords1080px[2]); // 출국장3
    //console.log("3", coordstatus3);
  }, []);

  //출국장 4
  useEffect(() => {
    let passenger = intCongestions.dep4;
    console.log("4", passenger);

    if (passenger < 1150) {
      setColorStatus4(colorCodes.colorSky);
    } else if (passenger >= 1150 && passenger <= 1250) {
      setColorStatus4(colorCodes.colorGreen);
    } else if (passenger > 1250 && passenger <= 1350) {
      setColorStatus4(colorCodes.colorOrange);
    } else if (passenger > 1350) {
      setColorStatus4(colorCodes.colorRed);
    }
    setCoordstatus4(depCoords1080px[3]); // 출국장4
    //console.log("3", coordstatus3);
  }, []);

  //출국장 5
  useEffect(() => {
    let passenger = intCongestions.dep56;
    console.log("5", passenger);

    if (passenger < 1150) {
      setColorStatus5(colorCodes.colorSky);
    } else if (passenger >= 1150 && passenger <= 1250) {
      setColorStatus5(colorCodes.colorGreen);
    } else if (passenger > 1250 && passenger <= 1350) {
      setColorStatus5(colorCodes.colorOrange);
    } else if (passenger > 1350) {
      setColorStatus5(colorCodes.colorRed);
    }

    setCoordstatus5(depCoords1080px[4]); // 출국장5
    //console.log("3", coordstatus3);
  }, []);

  //출국장 6
  useEffect(() => {
    let passenger = intCongestions.dep56;
    console.log("6", passenger);

    if (passenger < 1150) {
      setColorStatus6(colorCodes.colorSky);
    } else if (passenger >= 1150 && passenger <= 1250) {
      setColorStatus6(colorCodes.colorGreen);
    } else if (passenger > 1250 && passenger <= 1350) {
      setColorStatus6(colorCodes.colorOrange);
    } else if (passenger > 1350) {
      setColorStatus6(colorCodes.colorRed);
    }

    setCoordstatus6(depCoords1080px[5]); // 출국장6
    //console.log("3", coordstatus3);
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
        name: "6",
        shape: "poly",
        coords: coordstatus6,
        strokeColor: colorStatus6.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus6,
      },
      {
        name: "5",
        shape: "poly",
        coords: coordstatus5,
        strokeColor: colorStatus5.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus5,
      },
      {
        name: "4",
        shape: "poly",
        coords: coordstatus4,
        strokeColor: colorStatus4.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus4,
      },
      {
        name: "3",
        shape: "poly",
        coords: coordstatus3,
        strokeColor: colorStatus3.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus3,
      },
      {
        name: "2",
        shape: "poly",
        coords: coordstatus2,
        strokeColor: colorStatus2.slice(0, -2),
        lineWidth: "2.5",
        preFillColor: colorStatus2,
      },
      {
        name: "1",
        shape: "poly",
        coords: coordstatus1,
        strokeColor: colorStatus1.slice(0, -2),
        lineWidth: "2.5",
        //preFillColor: colorCodes.colorRed,
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

export default T1Mapper;
