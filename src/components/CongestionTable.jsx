import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("BLUE", "1160 명 이하", "1600 명 이하"),
  createData("GREEN", "1160 명 초과 1260 이하", "1600 명 초과 1750 이하"),
  createData("YELLOW", "1260 명 초과 1360 이하", "1750 명 초과 1900 이하"),
  createData("ORANGE", "1360 명 초과 1430 이하", "1900 명 초과 2000 이하"),
  createData("RED", "1430 초과", "2000 초과"),
];

export default function CongestionTable() {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      {/* <span>출국장별 혼잡도를 기준으로 합니다</span> */}
      <Table
        sx={{
          width: { xs: 350, tab: 500 },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                //border: "1px solid black",
                fontSize: { xs: "12px", tab: "12px" },
                fontWeight: "bold",
              },
            }}
          >
            <TableCell>혼잡도 기준</TableCell>
            <TableCell align="center">제&nbsp;1&nbsp;터미널</TableCell>
            <TableCell align="center">제&nbsp;2&nbsp;터미널</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&>*": {
                  fontSize: { xs: "12px", tab: "13px" },
                },
              }}
            >
              <TableCell component="th" scope="row">
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor:
                      row.name === "RED"
                        ? "red"
                        : row.name === "ORANGE"
                        ? "orange"
                        : row.name === "YELLOW"
                        ? "yellow"
                        : row.name === "GREEN"
                        ? "lightgreen"
                        : row.name === "BLUE"
                        ? "skyblue"
                        : "none",
                    color: "black",
                  }}
                >
                  {row.name}
                </Button>
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
