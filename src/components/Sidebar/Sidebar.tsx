import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import { IAdminRoute } from "../../routes";

import styleSidebar from "./Sidebar.scss?inline";
import { useEffect } from "react";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState('1');
  
  const setSelectedLink = (pathname: string) => {
    const [, path] = pathname.split('/').filter(part => part !== '');

    const routeId = routes.find(route => route.path.slice(1) ===  path)?.id || '1';
    setSelectedIndex(routeId);
  }


  const selectedUser = localStorage.getItem('selectedUser');
  const userOnline = selectedUser !== null ? JSON.parse(selectedUser) : null;
  const filteredRoutes = routes?.filter(route => route?.role?.includes(userOnline?.roles[0]));


  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location]);
  

  const handleListItemClick = (id: string) => {
    setSelectedIndex(id);
  };

  return (
    <Box sx={{ styleSidebar, height: "100%" }}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "#111219" },
          },
        })}
      >
        <Paper sx={{ maxWidth: 356, minWidth: 250, height: "100%" }}>
          <FireNav className='fireNav' component='nav' disablePadding>
            <ListItemButton
              className='listItemBtnFire'
              onClick={() => navigate("/admin")}
            >
              <ListItemIcon sx={{ fontSize: 25 }}>🔥</ListItemIcon>
              <ListItemText
                className='listItemBtnFireText'
                primary='Admin Panel'
                primaryTypographyProps={{
                  fontSize: 25,
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
            <Divider />
            <Box>
              {filteredRoutes?.map((item: IAdminRoute) => (
                <ListItemButton
                  className='ListItemButton'
                  component={Link}
                  to={item.layout + item.path}
                  key={item.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 0,
                    minHeight: 50,
                  }}
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
                      textTransform: "initial",
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
