import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useState } from "react";

function TerminalsMain(props) {
  const { title, infoContents, infoCardsections } = props;
  const [selectedSection, setSelectedSection] = useState(0);

  const handleButtonClick = (index) => {
    setSelectedSection(index);
  };

  return (
    <Grid item mobile={12} laptop={12}>
      {/* <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" paragraph>
        {infoContents}
      </Typography> */}
      {/* Grid container->Grid 속성입히기
      가로정렬 justifyContent="center" 여백 spacing={2} */}

      <Grid container justifyContent="center" spacing={2}>
        {infoCardsections.map((section) => (
          <Grid item key={section.title}>
            <Card
              key={section.title}
              sx={{
                height: {
                  mobile: "auto",
                  sm: "auto",
                },
                width: {
                  mobile: "auto",
                  desktop: "1100px",
                },
                maxWidth: "lg",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={section.image}
                  alt={section.alt}
                />

                <CardContent>
                  <Typography component="div">{section.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

TerminalsMain.propTypes = {
  title: PropTypes.string.isRequired,
  infoContents: PropTypes.string.isRequired,
  infoCardsections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TerminalsMain;
