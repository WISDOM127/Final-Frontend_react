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
      <Divider /> {/* 실선 */}
      {/* 카드섹션 */}
      <Grid container spacing={2}>
        {infoCardsections.map((section) => (
          <Grid item key={section.title} xs={12} sm={6} md={4} lg={3}>
            <Card key={section.title}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={section.image}
                  alt={section.alt}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
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
