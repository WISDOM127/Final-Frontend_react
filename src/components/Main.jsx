import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

function Main(props) {
  const { title, infoContents, infoCardsections } = props;

  return (
    <Grid
      item
      // xs={12}
      // laptop={12}
      sx={{
        margin: "auto", // 가로 중앙 정렬을 위해 추가
        //border: "1px solid black",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" paragraph>
        {infoContents}
      </Typography>
      {/* 카드섹션 */}
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          position: "relative",
          //border: "1px solid black",
        }}
      >
        {infoCardsections.map((section) => (
          <Grid
            item
            key={section.title}
            xs={3}
            laptop={3}
            sx={
              {
                //display: "flex",
                //position: "relative",
                //border: "1px solid black",
              }
            }
          >
            <a href={section.url} target="_blank" rel="noopener noreferrer">
              <Card
                key={section.title}
                sx={{
                  // border: "1px solid black",

                  height: {
                    xs: "150px",
                    mob: "150px",
                    tab: "200px",
                    laptop: "350px",
                  },
                  width: {
                    xs: "100px",
                    mob: "100px",
                    tab: "180px",
                    laptop: "300px",
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={section.image}
                    alt={section.alt}
                    objectFit="fill"
                    sx={{
                      // border: "1px solid black",
                      height: {
                        xs: "100px",
                        mob: "100px",
                        tab: "150px",
                        laptop: "300px",
                      },
                      width: {
                        xs: "100px",
                        mob: "100px",
                        tab: "180px",
                        laptop: "300px",
                      },
                    }}
                  />
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", tab: "18px" },
                        fontWeight: "600",
                      }}
                      gutterBottom
                      component="div"
                    >
                      {section.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
