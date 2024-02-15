import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">
          <Link underline="none" href="https://www.airport.kr/ap/ko/index.do">
            인천공항
          </Link>
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          align="center"
          style={{
            fontFamily: "OG_Renaissance_Secret-Rg",
            fontSize: "45px",
            margin: "10px 0px",
          }}
          noWrap
          sx={{ flex: 1 }}
        >
          <Link underline="none" href="/">{title}</Link>
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        <Button variant="outlined" size="small">
          <Link href="/signIn" underline="none">
            로그인
          </Link>
        </Button>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="secondary.dark"
            style={{
              margin: "5px 0px",
              textDecoration: "none",
              fontWeight: "500",
            }}
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      <Divider />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
