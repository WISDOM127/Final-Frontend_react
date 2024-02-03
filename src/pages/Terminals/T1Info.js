import * as React from "react";
import Grid from "@mui/material/Grid";
//import TerminalsMain from "../../components/TerminalsMain";
//import Nav from "../../components/Nav";
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import T1Mapper from "../../components/T1Mapper";
import AirportCongestionList from "../../components/AirportCongestionList";

const infoCardsections = [
  {
    title: "Terminal-1",
    url: "#",
    image: "/img/t1map1080x1200.png",
    alt: "t1inout",
    //width: '{ xs: "320px", mob: "500px", laptop: "1080px" }',
  },
  {
    title: "Terminal-2",
    url: "#",
    image: "/img/t2map1200x700.png",
    alt: "t2inout",
    //width: '{ xs: "350px", mob: "600px", laptop: "1200px" }',
  },
];

export default function T1Info() {
  const [selectedTerminal, setSelectedTerminal] = useState(infoCardsections[0]);

  const handleTerminalClick = (props) => {
    setSelectedTerminal(infoCardsections[props]);
  };

  const buttons = [
    <Button key="Terminal 1" onClick={() => handleTerminalClick(0)}>
      Terminal 1
    </Button>,
    <Button key="Terminal 2" onClick={() => handleTerminalClick(1)}>
      Terminal 2
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
          sx={{ position: "absolute", top: "200px", right: 0 }}
        >
          {buttons}
        </ButtonGroup>
      </div>

      <Grid
        container
        justifyContent="center"
        spacing={5}
        sx={{
          mt: 1,
        }}
      >
        <T1Mapper selectedTerminal={selectedTerminal} />

        {/* <TerminalsMain infoContents="" infoCardsections={[selectedTerminal]} /> */}
      </Grid>

      <AirportCongestionList />
    </div>
  );
}
