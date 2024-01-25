import * as React from "react";
import Grid from "@mui/material/Grid";
//import Container from "@mui/material/Container";
//import CssBaseline from "@mui/material/CssBaseline";
import TerminalsMain from "../../components/TerminalsMain";
import Nav from "../../components/Nav";

const infoCardsections = [
  {
    title: "1",
    url: "#",
    image: "/img/t1map750x800.png",
    alt: "t1inout",
  },
  {
    title: "2",
    url: "#",
    image: "/img/t1map750x800.png",
    alt: "t1inout",
  },
];

const navbardata = [
  { title: "Terminal 1", url: "/T1Info" },
  { title: "Terminal 1", url: "#" },
  // { title: "커뮤니티", url: "#" },
];

export default function T1Info() {
  return (
    <div className="P_T1Info">
      <Nav sections={navbardata} />
      <Grid container spacing={5} sx={{ mt: 1 }}>
        <TerminalsMain
          title="터미널1 3층 출국장"
          infoContents=""
          infoCardsections={infoCardsections}
        />
      </Grid>
    </div>
  );
}
