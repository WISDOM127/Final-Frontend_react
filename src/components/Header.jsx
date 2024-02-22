import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

function Header(props) {
  const { sections, title } = props;

  const sharePage = () => {
    const shareObject = {
      title: "공유할 콘텐츠의 제목",
      text: "WEBISFREE.com",
      url: window.location.href,
    };

    if (navigator.share) {
      // Navigator를 지원하는 경우만 실행
      navigator
        .share(shareObject)
        .then(() => {
          // 정상 동작할 경우 실행
          alert("감사합니다.");
        })
        .catch((error) => {
          alert("에러가 발생했습니다.");
        });
    } else {
      // navigator를 지원하지 않는 경우
      alert("페이지 공유를 지원하지 않습니다.");
    }
  };
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
          <Link underline="none" href="/">
            {title}
          </Link>
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        <Button variant="outlined" size="small" onClick={sharePage}>
          {/* <Link href="/signIn" underline="none"> */}
          공유하기
          {/* </Link> */}
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
