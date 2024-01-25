import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

function Main(props) {
  const { title, infoContents, infoCardsections } = props;

  return (
    <Grid item mobile={12} laptop={12}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" paragraph>
        {infoContents}
      </Typography>
      {/* 카드섹션 */}
      <Grid container spacing={2}>
        {infoCardsections.map((section) => (
          <Grid item key={section.title} mobile={3} sm={3} md={3} laptop={3}>
            <Card
              key={section.title}
              sx={{
                // border: "1px solid black",
                height: {
                  mobile: "150px",
                  sm: "150px",
                  md: "300px",
                },
                width: {
                  mobile: "100px",
                  sm: "150px",
                  md: "200px",
                  desktop: "250px",
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
                      mobile: "100px",
                      sm: "100px",
                      md: "250px",
                    },
                    width: {
                      mobile: "100px",
                      sm: "150px",
                      md: "200px",
                      desktop: "250px",
                    },
                  }}
                />
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: { mobile: "12px", sm: "18px" },
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
