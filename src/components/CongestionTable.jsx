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

const TableContainerStyled = styled(TableContainer)`
  margin: 0;
  padding: 0;
`;

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("원활", "1160 명 이하", "1600 명 이하"),
  createData("보통", "1160 명 초과 1260 이하", "1600 명 초과 1750 이하"),
  createData("약간혼잡", "1260 명 초과 1360 이하", "1750 명 초과 1900 이하"),
  createData("혼잡", "1360 명 초과 1430 이하", "1900 명 초과 2000 이하"),
  createData("매우혼잡", "1430 초과", "2000 초과"),
];

export default function CongestionTable() {
  return (
    // <TableContainerStyled component={Paper}>
    <TableContainer component={Paper}>
      {/* <span>출국장별 혼잡도를 기준으로 합니다</span> */}
      <Table
        aria-label="simple table"
        sx={{ margin: 0, padding: 0, width: 650 }}
      >
        <TableHead>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                fontSize: { xs: "12px", tab: "12px" },
                fontWeight: "bold",
                borderTop: "none",
              },
            }}
          >
            <TableCell sx={{ width: "80px" }}>혼잡도 기준</TableCell>
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
                  fontSize: { xs: "11px", tab: "13px" },
                  height: "10px",
                  margin: 0,
                  padding: "5px 15px",
                },
              }}
            >
              <TableCell component="th" scope="row">
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    fontSize: "12px",
                    backgroundColor:
                      row.name === "매우혼잡"
                        ? "red"
                        : row.name === "혼잡"
                        ? "orange"
                        : row.name === "약간혼잡"
                        ? "yellow"
                        : row.name === "보통"
                        ? "lightgreen"
                        : row.name === "원활"
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
