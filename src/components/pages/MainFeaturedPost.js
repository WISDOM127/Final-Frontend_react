import * as React from "react";
// import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";

function encodeServiceKey(serviceKey) {
  return encodeURIComponent(serviceKey);
}

function MainFeaturedPost() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
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
              base_date: "20240119",
              base_time: "0500",
              nx: 51,
              ny: 125,
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
          //setWeatherData(dataAll);

          //필요한 SKY 카테고리의 데이터만 추출
          const skyData = dataAll.find((item) => item.category === "SKY");
          console.log("---날씨만 출력----");
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

  //대기중일때
  if (loading) {
    return <Paper>대기중...</Paper>;
  }

  if (!weatherData) {
    return null;
  }

  // if (weatherData.fcstValue === "4") {
  //   return console.log("맑음");
  // }

  if (weatherData.fcstValue >= "0" && weatherData.fcstValue <= "5") {
    console.log("맑음");
  } else if (weatherData.fcstValue >= "6" && weatherData.fcstValue <= "8") {
    console.log("구름많음");
  } else if (weatherData.fcstValue >= "9" && weatherData.fcstValue <= "10") {
    console.log("흐림");
  } else {
    console.log("알 수 없는 날씨");
  }

  return console.log("하하하");
  // <Paper
  //   sx={{
  //     position: "relative",
  //     backgroundColor: "grey.800",
  //     color: "#fff",
  //     mb: 4,
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",
  //     backgroundPosition: "center",
  //     backgroundImage: `url(${post.image})`,
  //   }}
  // >
  //   {/* Increase the priority of the hero background image */}
  //   {
  //     <img
  //       style={{ display: "none" }}
  //       src={post.image}
  //       alt={post.imageText}
  //     />
  //   }
  //   <Box
  //     sx={{
  //       position: "absolute",
  //       top: 0,
  //       bottom: 0,
  //       right: 0,
  //       left: 0,
  //       backgroundColor: "rgba(0,0,0,.3)",
  //     }}
  //   />
  //   <Grid container>
  //     <Grid item md={6}>
  //       <Box
  //         sx={{
  //           position: "relative",
  //           p: { xs: 3, md: 6 },
  //           pr: { md: 0 },
  //         }}
  //       >
  //         <Typography
  //           component="h1"
  //           variant="h3"
  //           color="inherit"
  //           gutterBottom
  //         >
  //           {post.title}
  //         </Typography>
  //         <Typography variant="h5" color="inherit" paragraph>
  //           {post.description}
  //         </Typography>
  //         {/* <Typography variant="subtitle1" color="grey[50]" paragraph>
  //           {post.description2}
  //         </Typography> */}
  //         <Link variant="subtitle1" href="#">
  //           {post.linkText}
  //         </Link>
  //       </Box>
  //     </Grid>
  //   </Grid>
  // </Paper>
}

// MainFeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageText: PropTypes.string.isRequired,
//     linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default MainFeaturedPost;
