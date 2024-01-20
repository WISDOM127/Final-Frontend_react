import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Footer from "./Footer";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
];

// const mainFeaturedPost = {
//   title: "오늘의 날씨는",
//   description: "맑음",
//   description2: "결항항공기 없음",
//   image: "https://source.unsplash.com/random?wallpapers",
//   imageText: "main image description",
//   linkText: "Continue reading…",
// };

const featuredPosts = [
  {
    title: "T1",
    subtitle: "제 1 여객터미널",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11184560&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2RpZ2lfMTExODQ1NjBfMDEyMDE0MTExMTUxNQ==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006",
    imageLabel: "Image Text",
  },
  {
    title: "T2",
    subtitle: "제 2 여객터미널",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://cdn.pixabay.com/photo/2015/03/19/04/42/incheon-international-airport-680402_1280.jpg",
    imageLabel: "Image Text",
  },
];

const infoCardsections = [
  {
    title: "화장실",
    url: "#",
    image:
      "https://cdn.pixabay.com/photo/2013/04/01/21/32/restroom-99225_1280.png",
    // image: "/static/images/cards/contemplative-reptile.jpg",
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
    title: "기타서비스시설",
    url: "#",
    image:
      "https://cdn.pixabay.com/photo/2016/09/13/18/38/silverware-1667988_1280.png",
    alt: "another",
  },
];

// React 트리 전체 적용
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: grey[900],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      mobile: 0,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default function Home() {
  return (
    // ThemeProvider : theme prop을 받아서 해당 테마를 React 트리 전체에 일괄적인 디자인을 적용할 때 씀
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="RightWay" sections={sections} />
        <main>
          <MainFeaturedPost />
          {/* post={mainFeaturedPost} */}
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main
              title="편의시설"
              infoContents="인천공항 내 편의시설을 찾고 계신가요?"
              infoCardsections={infoCardsections}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
