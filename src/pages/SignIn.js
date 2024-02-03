import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  //로그인을 위한 member 객체 생성 & 초기값 지정
  const [member, setMember] = useState({
    memberId: "",
    password: "",
  });

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const updateMemberInfo = () => {
  //   setMember({
  //     memberId: username,
  //     password: password,
  //   });
  // };

  //로그인 버튼 클릭 event 발생 시 handleSubmit 실행
  const handleSubmit = async (event) => {
    event.preventDefault();
    //   updateMemberInfo();

    try {
      console.log({
        memberId: member.memberId,
        password: member.password,
      });

      //백엔드 컨트롤러 /SignUser 로 member 객체 전송
      const response = await axios.post("/SignUser", member);
      console.log(response.data);
    } catch (error) {
      console.log("axios에러 : ", error);
    }
  };

  //onChange={handleKeywordChange} 으로 폼 입력데이터가 변할 때마다 멤버 객체의 데이터 값도 변한다.
  const handleKeywordChange = (event) => {
    const memberId = event.target.value;
    setMember((prevMember) => ({ ...member, memberId }));
  };
  const handleKeywordChange2 = (event) => {
    const password = event.target.value;
    setMember((prevMember) => ({ ...member, password }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                // id="username"
                label="아이디를 입력해 주세요"
                // name="username"
                onChange={handleKeywordChange}
                value={member.memberId}
                autoComplete="memberId"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                // name="password"
                // onChange={(event) => setPassword(event.target.value)}
                // value={password}
                onChange={handleKeywordChange2}
                value={member.password}
                label="비밀번호를 입력해주세요"
                type="password"
                // id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Grid
                container
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <Link href="#" variant="body2">
                    아이디/비밀번호 찾기
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"회원가입"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
