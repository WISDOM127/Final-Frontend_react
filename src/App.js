// eslint-disable-next-line
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./components/NotFound";
import TerminalsInfo from "./pages/Congestion/TerminalsInfo";
import AirRouteInfo from "./pages/AirRoutes/AirRouteInfo";
import BoardList from "./pages/Board/BoardList";
import BoardWrite from "./pages/Board/BoardWrite";


function App() {
  const sections = [
    { title: "출국장 혼잡도", url: "/terminals/t1info" },
    { title: "항공편 조회", url: "/airRouteInfo" },
    //{ title: "결항 노선 조회", url: "/airRouteInfo" },
    { title: "커뮤니티", url: "/boardList" },
    {
      title: "편의시설",
      url: "https://www.airport.kr/ap/ko/svc/getFacilityMain.do",
    },
  ];
  // React 트리 전체 적용할 defaultTheme 테마 지정
  const defaultTheme = createTheme({
    palette: {
      primary: {
        light: blue[100],
        main: blue[400],
        dark: blue[900],
      },
      secondary: {
        light: grey[50],
        main: grey[500],
        dark: grey[700],
        darker: grey[800],
      },
    },
    typography: {
      // fontFamily: "Roboto, Arial, sans-serif",
      fontFamily: "Pretendard-Regular",
      fontSize: 14,
    },
    breakpoints: {
      values: {
        xs: 0,
        mob: 480,
        tab: 768,
        laptop: 1024,
        //desktop: 1200,
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="RightWay" sections={sections} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            {/* 출국장혼잡도 */}
            <Route path="/terminals/:terminalId" element={<TerminalsInfo />} />
            {/* 항공편 현황 조회 */}
            <Route path="/airRouteInfo" element={<AirRouteInfo />} />
            {/* 커뮤니티 */}
            <Route path="/boardList" element={<BoardList />} />
            <Route path="/board/BoardWrite" element={<BoardWrite />} />

            

            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </Container>
        <Footer
          title="rightway web service"
          description="developer : 김지혜 | contact: wisdom_127@naver.com"
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
