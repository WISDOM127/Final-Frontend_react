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
// import imageUrl from "../../assets/rain.jpg";

function encodeServiceKey(serviceKey) {
  return encodeURIComponent(serviceKey);
}

const MainWeatherPost = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const todayInfo = getToday;
  const { year, month, day } = todayInfo;
  const todayValue = year + month + day; //'yyyyMMdd'

  // 출력
  console.log("JSON:", todayInfo);
  console.log("년:", year);
  console.log("월:", month);
  console.log("일:", day);
  console.log("년월일:", todayValue);

  const originalServiceKey =
    "SJM6rMj%2BVwpNDjc0d4VEiXQaczyN7xQkGOmGcSR1QtCoTqHbMHI4R34JvgORpwM%2FfSdkLeXwDMO7Bf7vLIAlSQ%3D%3D";
  const encodedServiceKey = encodeServiceKey(originalServiceKey);

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
              base_time: "0500",
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
          const skyData = dataAll.find((item) => item.category === "SKY");
          console.log("---인천의 날씨 수치 :----");
          console.log(skyData.fcstValue);
          setWeatherData(skyData);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.log("error ");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  // 빈 배열을 전달하는 경우 : 컴포넌트가 마운트될 때만 실행되도록 함
  // Data를 넣을 경우 : 해당 데이터가 변경될 때마다 useEffect 실행

  //weatherData에 인천의 하늘 정보 저장된 상태

  //대기중일때
  if (loading) {
    return <Paper>대기중...</Paper>;
  }

  if (!weatherData) {
    return null;
  }

  let post;
  // const weatherData = {
  //   fcstValue: "7",
  // };

  //str데이터 -> int 타입 10진수로 파싱
  const icFcstValue = parseInt(weatherData.fcstValue, 10);

  if (icFcstValue >= "0" && icFcstValue <= "5") {
    console.log("맑음");
    post = {
      title: "오늘의 날씨는,",
      description: "맑음",
      description2: "결항항공기 없음",
      image: "img/sunny.jpg",
      imageText: "main image description",
    };
  } else if (icFcstValue >= "6" && icFcstValue <= "8") {
    console.log("구름많음");
    post = {
      title: "오늘의 날씨는",
      description: "구름많음",
      //description2: "결항항공기 없음",
      image: "img/cloudy.jpg",
      imageText: "main image description",
      link: "#",
      linkText: "결항 항공편 상세보기…",
    };
  } else if (icFcstValue >= "9" && icFcstValue <= "10") {
    console.log("흐림");
    post = {
      title: "오늘의 날씨는",
      description: "흐림",
      //description2: "결항항공기 없음",
      image: "img/rainy.jpg",
      imageText: "main image description",
      link: "#",
      linkText: "결항 항공편 상세보기…",
    };
  } else {
    console.log("알 수 없는 날씨");
    post = null;
  }

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
                {post.description}
              </Typography>
              {post.description2}
              <Link variant="subtitle1" href={post.link}>
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
