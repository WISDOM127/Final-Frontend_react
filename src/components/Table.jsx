import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[400],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function flightInfoTables(props) {
  const { rows } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>항공사</StyledTableCell>
            <StyledTableCell align="right">편명</StyledTableCell>
            <StyledTableCell align="right">도착지</StyledTableCell>
            <StyledTableCell align="right">예정시간</StyledTableCell>
            <StyledTableCell align="right">변경시간</StyledTableCell>
            <StyledTableCell align="right">현황</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.flightId}>
              <StyledTableCell component="th" scope="row">
                {row.airline}
              </StyledTableCell>
              <StyledTableCell align="right">{row.flightId}</StyledTableCell>
              <StyledTableCell align="right">{row.airport}</StyledTableCell>
              <StyledTableCell align="right">
                {row.scheduleDateTime}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.estimatedDateTime}
              </StyledTableCell>
              <StyledTableCell align="right">{row.remark}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default flightInfoTables;
