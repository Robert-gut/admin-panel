import * as React from "react";
import { Link } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import { IAdminRoute } from "../../routes";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 30,
  },
});

export default function Sidebar({ routes }: { routes: IAdminRoute[] }) {
  const [selectedIndex, setSelectedIndex] = React.useState("dashboard");

  const handleListItemClick = (
    id: string
  ) => {
    setSelectedIndex(id);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper sx={{ maxWidth: 356, minWidth: 250, height: "100%" }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 25 }}>🔥</ListItemIcon>
              <ListItemText
                primary="Admin Panel"
                primaryTypographyProps={{
                  fontSize: 25,
                  textTransform: "uppercase",
                }}
              />
            </ListItemButton>
            <Divider />
            <Box>
              {routes.map((item: IAdminRoute) => (
                <ListItemButton
                  component={Link}
                  to={item.layout + item.path}
                  key={item.name}
                  sx={{ py: 0, minHeight: 50, color: "rgba(255,255,255,.8)" }}
                  selected={selectedIndex === item.id}
                  onClick={() => handleListItemClick(item.id)}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: 19,
                      textTransform: "uppercase",
                    }}
                  />
                </ListItemButton>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
