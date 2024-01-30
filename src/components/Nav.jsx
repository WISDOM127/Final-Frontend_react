import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
//import SearchIcon from "@mui/icons-material/Search";
//import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
//import Divider from "@mui/material/Divider";

function Nav(props) {
  const { sections } = props;

  return (
    <React.Fragment>
      {/* <IconButton>
          <SearchIcon />
        </IconButton> */}

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Button variant="outlined" size="small">
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
          </Button>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Nav.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Nav;
