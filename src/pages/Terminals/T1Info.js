import * as React from "react";
import Grid from "@mui/material/Grid";
import TerminalsMain from "../../components/TerminalsMain";
import Nav from "../../components/Nav";
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import T1Mapper from "../../components/T1Mapper";
import AirportCongestionList from "../../components/AirportCongestionList";

const infoCardsections = [
  {
    title: "Terminal-1",
    url: "#",
    image: "/img/t1map750x800.png",
    alt: "t1inout",
  },
  {
    title: "Terminal-2",
    url: "#",
    image: "/img/incheon-airportT2.jpg",
    alt: "t2inout",
  },
];

const navbardata = [
  { title: "Terminal 1", url: "/T1Info" },
  { title: "Terminal 2", url: "#" },
];

export default function T1Info() {
  const [selectedTerminal, setSelectedTerminal] = useState(infoCardsections[0]);

  const handleTerminalClick = (props) => {
    setSelectedTerminal(infoCardsections[props]);
  };

  const buttons = [
    <Button key="Terminal 1" onClick={() => handleTerminalClick(0)}>
      One
    </Button>,
    <Button key="Terminal 2" onClick={() => handleTerminalClick(1)}>
      Two
    </Button>,
  ];

  return (
    <div className="P_T1Info">
      <br />
      {/* <Button variant="outlined" onClick={() => handleTerminalClick(0)}>
        Terminal 1
      </Button>
      <Button variant="outlined" onClick={() => handleTerminalClick(1)}>
        Terminal 2
      </Button> */}
      <div>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          //sx={{ position: "absolute", top: "200px", right: 0 }}
        >
          {buttons}
        </ButtonGroup>
      </div>

      <Grid container spacing={5} sx={{ mt: 1 }}>
        <T1Mapper selectedTerminal={selectedTerminal} />
        {/* <TerminalsMain infoContents="" infoCardsections={[selectedTerminal]} /> */}
      </Grid>

      <AirportCongestionList />
    </div>
  );
}
