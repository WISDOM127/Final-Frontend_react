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
import T1Info from "./pages/Terminals/T1Info";
import T2Info from "./pages/Terminals/T2Info";
import NotFound from "./components/NotFound";

function App() {
  const sections = [
    { title: "터미널별 혼잡도", url: "/T1Info" },
    { title: "노선별 혼잡도", url: "#" },
    { title: "결항 노선 조회", url: "#" },
    { title: "편의시설", url: "#" },
    // { title: "커뮤니티", url: "#" },
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
        sm: 700, //모바일
        md: 900,
        lg: 1200,
        mobile: 0,
        laptop: 1024,
        desktop: 1200,
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
            <Route path="/t1Info" element={<T1Info />} />
            <Route path="/t2Info" element={<T2Info />} />
          </Routes>
        </Container>
        <Footer
          title="rightway web service"
          description="developer : 김지혜 | contact: wisdom_127@naver.com"
        />
      </ThemeProvider>
      <Routes>
        <Route path={"*"} component={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
