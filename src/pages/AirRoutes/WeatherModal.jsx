import { Box, Modal, Typography } from "@mui/material";
import * as React from "react";

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WeatherModal({ open, handleClose, flight }) {
  function formatDateTime(dateTimeStr) {
    if (dateTimeStr) {
      const [datePart, timePart] = dateTimeStr.split("T");
      const timeOnly = timePart.slice(0, 5);
      return `${datePart}, ${timeOnly}`;
    }
  }

  console.log("ghkdkjfsl", flight);
  if (flight) {
    console.log("가능");
  } else {
    console.error("데이터 또는 airport 속성이 정의되지 않았습니다.");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalstyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          도착지 "{flight.airport}" 의 날씨 정보
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          예상 도착 시간 : {flight.scheduleDateTime}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p>
            {" "}
            날씨 : <img src={flight.wimage} />
          </p>

          <p>
            {" "}
            <span>체감기온 : {flight.senstemp}</span>
            {" // "}
            <span>기온 : {flight.temp}</span>
          </p>
          <p> 풍속 : {flight.wind}</p>
          <p> </p>
          <p> </p>
        </Typography>
      </Box>
    </Modal>
  );
}
