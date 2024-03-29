import * as React from "react";
import Grid from "@mui/material/Grid";
import TerminalCard from "./TerminalCard";
import Main from "../components/Main";
import Divider from "@mui/material/Divider";
import MainWeatherPost from "../components/MainWeatherPost";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

const terminalList = [
  {
    title: "T1",
    subtitle: "제 1 여객터미널",
    description:
      "인천공항 제 1 터미널의\n 출국장 위치와 혼잡도 정보\n 안내페이지로 이동합니다",
    description2: " Checking Airport congestion...",
    image: "img/incheon-airportT1.jpg",
    imageLabel: "incheon-airportT1",
    url: "terminals/t1info",
  },
  {
    title: "T2",
    subtitle: "제 2 여객터미널",
    description:
      "인천공항 제 2 터미널의\n 출국장 위치와 혼잡도 정보\n 안내페이지로 이동합니다",
    description2: " Checking Airport congestion...",
    image: "img/incheon-airportT2.jpg",
    imageLabel: "incheon-airportT2",
    url: "terminals/t2info",
  },
];

const infoCardsections = [
  {
    title: "화장실",
    url: "#",
    image:
      "https://cdn.pixabay.com/photo/2013/04/01/21/32/restroom-99225_1280.png",
    alt: "toilet",
  },
  {
    title: "환전",
    url: "#",
    image:
      "https://cdn.pixabay.com/photo/2015/09/15/15/53/bank-notes-941246_1280.jpg",
    alt: "exchange",
  },
  {
    title: "약국",
    url: "https://www.airport.kr/ap/ko/svc/getFacilityMain.do",
    image:
      "https://cdn.pixabay.com/photo/2017/09/30/01/42/medicine-2801025_1280.png",
    alt: "pharmacy",
  },
  {
    title: "그외 서비스",
    url: "#",
    image:
      "https://cdn.pixabay.com/photo/2016/09/13/18/38/silverware-1667988_1280.png",
    alt: "another",
  },
];

function createData(
  flightId,
  airline,
  scheduleDateTime,
  estimatedDateTime,
  remark
) {
  return { flightId, airline, scheduleDateTime, estimatedDateTime, remark };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

export default function Home() {
  return (
    <main>
      {/* 오늘의 날씨 */}
      <MainWeatherPost />
      {/* 터미널 탭 */}
      <Grid container spacing={2}>
        {terminalList.map((post) => (
          <TerminalCard key={post.title} post={post} />
        ))}
      </Grid>
      {/* 검색창 */}
      <Divider sx={{ mt: 6 }} />
      <Grid container sx={{ mt: 5 }}>
        <SearchBar />
        {/* <Table rows={rows} /> */}
        {/* {rows.map((row) => (
          <Table key={row.flightId} rows={rows} />
        ))} */}
      </Grid>

      {/* 편의시설 탭 */}
      {/* <Grid container spacing={2} sx={{ mt: 5 }}>
        <Main
          title="편의시설"
          infoContents="인천공항 내 편의시설을 찾고 계신가요?"
          infoCardsections={infoCardsections}
        />
      </Grid> */}
    </main>
  );
}
