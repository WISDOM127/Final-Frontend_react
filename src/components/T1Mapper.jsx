import * as React from "react";
//import Grid from "@mui/material/Grid";
import ImageMapper from "react-img-mapper";
import { useState, useEffect } from "react";
import "../assets/T1Mapper.css";

const T1Mapper = ({ selectedTerminal, publicData }) => {
  const URL = selectedTerminal.image;
  const [colorstatus, setColorstatus] = useState("blue");
  const [hoveredArea, setHoveredArea] = useState(null);

  useEffect(() => {
    //let people = 101;
    // publicData에 있는 값에 따라 colorstatus를 동적으로 업데이트
    if (publicData && publicData.someCondition) {
      setColorstatus("green");
    } else {
      setColorstatus("red");
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
        coords: [156, 517, 187, 496, 205, 525, 173, 546],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: "#CC00006e",
        // fillColor: colorstatus,
      },
      {
        name: "5",
        shape: "poly",
        coords: [222, 479, 256, 465, 269, 497, 235, 511],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: "#FF33007e",
        //fillColor: 0,
      },
      {
        name: "4",
        shape: "poly",
        coords: [301, 454, 338, 448, 343, 483, 307, 488],
        strokeColor: "grey",
        lineWidth: "3",
        preFillColor: "#99cc665e",
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
        coords: [578, 498, 607, 523, 587, 549, 558, 525],
        strokeColor: "black",
        preFillColor: colorstatus,
        fillColor: "rgba(255, 255, 255, 0.5)",
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
        width={750}
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
