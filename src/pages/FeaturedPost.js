import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import styled from "styled-components";

function FeaturedPost(props) {
  const { post } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={6} tab={6} laptop={6}>
      <CardActions>
        <CardActionArea component="a" href={post.url}>
          <Card
            sx={{
              display: "flex",
              position: "relative",
              backgroundImage: {
                xs: `linear-gradient(${
                  isHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"
                }, ${
                  isHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"
                }), url(${post.image})`,
                tab: "none",
              },
              backgroundSize: { xs: "cover", tab: "block" },
              backgroundRepeat: "no-repeat",
              backgroundPosition: { xs: "center", tab: "none" },
              height: { xs: "150px", tab: "auto" },
              maxHeight: { xs: "150px", tab: "250px" },
              cursor: "pointer",
              transition: "background-color 0.3s", // 부드러운 hover 효과를 위한 트랜지션 추가

              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent sx={{ flex: 1, paddingTop: "15px" }}>
              <Typography
                component="h2"
                variant="h2"
                sx={{
                  color: { xs: "primary.main", tab: "primary.main" },
                  textShadow: {
                    xs: "2px 2px 2px grey",
                    tab: "none",
                  },
                }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: { xs: "white", tab: "secondary.main" },
                  textShadow: { xs: "3px 2px 2px black", tab: "none" },
                }}
              >
                {post.subtitle}
              </Typography>
              {isHovered && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "pre-line",
                    display: { xs: "none", laptop: "block" },
                    color: { xs: "secondary.dark", tab: "secondary.dark" },
                  }}
                  paragraph
                >
                  {post.description}
                </Typography>
              )}
              <Typography variant="subtitle1" color="primary">
                {post.description2}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{
                width: "50%",
                display: { xs: "none", tab: "block" },
              }}
              image={post.image}
              alt={post.imageLabel}
            />
          </Card>
        </CardActionArea>
      </CardActions>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
