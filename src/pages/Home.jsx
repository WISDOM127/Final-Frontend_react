import * as React from "react";
// import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
import XIcon from "@mui/icons-material/X";

//import Header from "../components/Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "../components/Main";
//import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";

const featuredPosts = [
  {
    title: "T1",
    subtitle: "제 1 여객터미널",
    description:
      "국제선을 운항하는\n인천공항 제 1 터미널입니다.\n모든 출국장 위치와 혼잡도 정보\n 안내페이지로 이동합니다",
    description2: " Checking Airport congestion...",
    image: "img/incheon-airportT1.jpg",
    imageLabel: "incheon-airportT1",
    url: "/t1Info",
  },
  {
    title: "T2",
    subtitle: "제 2 여객터미널",
    description:
      "국내선과 일부 국제선을 운항하는\n인천공항 제 2 터미널입니다.\n모든 출국장 위치와 혼잡도 정보\n 안내페이지로 이동합니다",
    description2: " Checking Airport congestion...",
    image: "img/incheon-airportT2.jpg",
    imageLabel: "incheon-airportT2",
    url: "/t2Info",
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
    url: "#",
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

export default function Home() {
  return (
    <main>
      {/* 오늘의 날씨 */}
      <MainFeaturedPost />
      {/* post={mainFeaturedPost} */}
      {/* 터미널 탭 */}
      <Grid container spacing={2}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>

      {/* 편의시설 탭 */}
      <Divider sx={{ mt: 6 }} />
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Main
          title="편의시설"
          infoContents="인천공항 내 편의시설을 찾고 계신가요?"
          infoCardsections={infoCardsections}
        />
      </Grid>
    </main>
  );
}
