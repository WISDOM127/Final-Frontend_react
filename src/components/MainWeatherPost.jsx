import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import getToday from "../components/GetToday";
import { CircularProgress } from "@mui/material";
// import imageUrl from "../../assets/rain.jpg";

function encodeServiceKey(serviceKey) {
  return encodeURIComponent(serviceKey);
}

const MainWeatherPost = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [skyStatus, setSkyStatus] = useState("");
  const [temStatus, setTemStatus] = useState("");
  const [preStatus, setPreStatus] = useState("");
  const [weatherImage, setWeatherImage] = useState("");
  const [skyData, setSkyData] = useState("");
  const [nowTem, setNowTem] = useState("");
  const [precip, setPrecip] = useState("");
  const [loading, setLoading] = useState(false);
// 현재날짜
  const todayInfo = getToday;
  const { year, month, day } = todayInfo;
  const todayValue = year + month + day;

  const API_KEY = "SJM6rMj+VwpNDjc0d4VEiXQaczyN7xQkGOmGcSR1QtCoTqHbMHI4R34JvgORpwM/fSdkLeXwDMO7Bf7vLIAlSQ==";
  const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

  const encodeServiceKey = (serviceKey) => encodeURIComponent(serviceKey);

  // 출력
  console.log("JSON:", todayInfo);
  console.log("년월일:", todayValue);

  

  useEffect(() => {
    //컴포넌트가 렌더링 될 때마다 API 요청
    //async 를 처리하는 함수
    const fetchData = async () => {
      setLoading(true); //로딩 상태 활성화
      try {
        const response = await axios.get(
          "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
          {
            params: {
              serviceKey:
                "SJM6rMj+VwpNDjc0d4VEiXQaczyN7xQkGOmGcSR1QtCoTqHbMHI4R34JvgORpwM/fSdkLeXwDMO7Bf7vLIAlSQ==",
              numOfRows: 10,
              pageNo: 1,
              dataType: "json",
              base_date: todayValue,
              base_time: "0800",
              nx: 51,
              ny: 125, //인천의 경도위도 전송
            },
          }
        );
        // Check if the expected properties exist in the response
        if (
          response.data &&
          response.data.response &&
          response.data.response.body &&
          response.data.response.body.items
        ) {
          const dataAll = response.data.response.body.items.item;
          console.log(dataAll);

          //skyData 에 인천의 SKY 카테고리의 데이터만 추출하여 넣음
          let skyData = dataAll.find((item) => item.category === "SKY");
          //일 현재기온
          let nowTem = dataAll.find((item) => item.category === "TMP");
          //강수형태PTY 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
          let precip = dataAll.find((item) => item.category === "PTY");

          console.log("---인천의 날씨 수치 :----");
          console.log(skyData.fcstValue);
          console.log(nowTem.fcstValue);
          console.log(precip.fcstValue);

          setSkyData(skyData.fcstValue);
          setNowTem(nowTem.fcstValue);
          setPrecip(precip.fcstValue);
          setWeatherData(true);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.log("error ");
        setWeatherData(false);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  // 빈 배열을 전달하는 경우 : 컴포넌트가 마운트될 때만 실행되도록 함
  // Data를 넣을 경우 : 해당 데이터가 변경될 때마다 useEffect 실행

  // 상태 업데이트 로직을 useEffect 외부로 이동
  useEffect(() => {
    //str데이터 -> int 타입 10진수로 파싱
    const icFcstValue = parseInt(skyData, 10);
    if (icFcstValue >= 0 && icFcstValue <= 4) {
      console.log("맑음");
      setSkyStatus("맑음");
      //setWeatherImage("img/sunny.jpg");
    } else if (icFcstValue > 4 && icFcstValue <= 8) {
      console.log("구름많음");
      setSkyStatus("구름많음");
    } else if (icFcstValue > 8 && icFcstValue <= 10) {
      console.log("흐림");
      setSkyStatus("흐림");
    } else {
      console.log("알 수 없는 날씨");
      setSkyStatus("null");
    }

    //없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
    const icPTYValue = parseInt(precip, 10);
    if (icPTYValue === 0) {
      setPreStatus("강수없음");
      if (skyStatus === "맑음") {
        setWeatherImage("img/sunny.jpg");
      } else {
        setWeatherImage("img/cloudy.jpg");
      }
    } else if (icPTYValue === 1) {
      console.log("비");
      setPreStatus("비");
      setWeatherImage("img/rainy.jpg");
    } else if (icPTYValue === 2) {
      setPreStatus("비 또는 눈");
      setWeatherImage("img/cloudy.jpg");
    } else if (icPTYValue === 3) {
      console.log("눈");
      setPreStatus("눈");
      setWeatherImage("img/snow-d.jpg");
    } else if (icPTYValue === 4) {
      console.log("소나기");
      setPreStatus("소나기");
      setWeatherImage("img/rain1.jpg");
    } else {
      console.log("알 수 없는 날씨");
      setPreStatus("알 수 없는 날씨");
    }
  }, [skyData, precip]);

  //대기중일때
  if (loading) {
    return (
      <div sx={{ height: "300px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const post = {
    title: "오늘의 공항 날씨는,",
    description: skyStatus,
    description2: nowTem,
    description3: preStatus,
    link: "/airRouteInfo4",
    linkText: "결항 항공편 상세보기(Click)",
    image: weatherImage,
    imageText: "main image description",
  };

  return (
    <div>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url("${post.image}")`,
          height: { xs: "230px", laptop: "350px" },
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={post.image}
            alt={post.imageText}
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {post.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                하늘 {post.description} / 체감 {post.description2} ℃ /{" "}
                {post.description3}
              </Typography>

              <Link variant="h6" color="inherit" href={post.link}>
                {post.linkText}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

// MainFeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageText: PropTypes.string.isRequired,
//     linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default MainWeatherPost;
