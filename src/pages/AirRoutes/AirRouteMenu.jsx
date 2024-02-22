import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import { Link } from "react-router-dom";

export default function AirRouteMenu() {
  return (
    <List
      sx={{
        width: { xs: "30%", tab: "100%" },
        maxWidth: 360,
        bgcolor: "background.paper",
        display: { xs: "none", tab: "flex" },
        flexDirection: { xs: "row", tab: "column" },
      }}
      aria-label="contacts"
    >
      {/* sx={{ display: { xs: "none", tab: "block" } }} */}
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LocalAirportIcon />
          </ListItemIcon>
          <ListItemText primary="메뉴" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component="a" href="/airRouteInfo">
          <ListItemText inset primary="전체 항공편" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component="a" href="/airRouteInfo2">
          <ListItemText inset primary="체크인 오픈" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component="a" href="/airRouteInfo3">
          <ListItemText inset primary="지연 항공편" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component="a" href="/airRouteInfo4">
          <ListItemText inset primary="결항 항공편" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
