import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import styled from "styled-components";

function FeaturedPost(props) {
  const { post } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item mobile={6} md={6} laptop={6}>
      <CardActionArea component="a" href={post.url}>
        <Card
          sx={{
            display: "flex",
            position: "relative",
            backgroundImage: {
              mobile: `linear-gradient(${
                isHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"
              }, ${
                isHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"
              }), url(${post.image})`,
              md: "none",
            },
            backgroundSize: { mobile: "cover", md: "block" },
            backgroundRepeat: "no-repeat",
            backgroundPosition: { mobile: "center", md: "none" },
            height: { mobile: "150px", md: "auto" },
            maxHeight: { mobile: "150px", md: "250px" },
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
              variant="h4"
              sx={{
                color: { mobile: "primary.main", md: "black" },
                textShadow: {
                  mobile: "2px 2px 2px white",
                  md: "none",
                },
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: { mobile: "white", md: "secondary.main" },
                textShadow: { mobile: "3px 2px 2px black", md: "none" },
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
                  display: { mobile: "none", md: "block" },
                  color: "secondary.dark",
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
              display: { mobile: "none", md: "block" },
            }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
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
