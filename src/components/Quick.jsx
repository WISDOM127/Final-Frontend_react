import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import "../assets/Quick.css";

const TableContainerStyled = styled(TableContainer)`
  margin: 0;
  padding: 0;
`;

const TableCellStyled = styled(TableCell)`
  margin: 0;
  padding: 5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 11px; /* 화면 폭이 600px 이하일 때의 폰트 크기 */

    &:first-child {
      //border: 1px solid black;
      width: 20%;
    }
  }

  @media (min-width: 768px) {
    font-size: 13px; /* 화면 폭이 601px 이상일 때의 폰트 크기 */
    height: 20px;

    &:first-child {
      //border: 1px solid black;
      width: 20%;
    }

    &:nth-child(2) {
      //border: 1px solid black;
    }
    &:nth-child(3) {
      //border: 1px solid black;
    }
  }
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

const Quick = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 2000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`quick-menu ${isScrolled ? "scrolled" : ""}`}>
        <div className="quickmenu">
          <div className="msg">
            *출국 승객 예고 정보를 기준으로 합니다 (업데이트 주기: 5분)
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ margin: 0, padding: 0 }}>
              <TableHead>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      fontSize: { xs: "10px", tab: "12px" },
                      fontWeight: "bold",
                      borderTop: "none",
                    },
                  }}
                >
                  <TableCellStyled>혼잡도 기준</TableCellStyled>
                  <TableCellStyled align="center">
                    제&nbsp;1&nbsp;터미널
                  </TableCellStyled>
                  <TableCellStyled align="center">
                    제&nbsp;2&nbsp;터미널
                  </TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCellStyled component="th" scope="row">
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
                    </TableCellStyled>
                    <TableCellStyled align="center">
                      {row.calories}
                    </TableCellStyled>
                    <TableCellStyled align="center">{row.fat}</TableCellStyled>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Quick;
