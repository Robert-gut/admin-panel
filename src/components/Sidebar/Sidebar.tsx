import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

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

export default function Sidebar(props) {
  const [selectedIndex, setSelectedIndex] = React.useState('dashboard');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    setSelectedIndex(id);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper 
          sx={{ maxWidth: 356, minWidth: 250, height: '100%' }}
        >
          <FireNav component="nav" disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                primary="Admin Panel"
                primaryTypographyProps={{
                  fontSize: 20,
                }}
              />
            </ListItemButton>
            <Divider />
            <Box>
              {props.routes.map((item) => (
                  <ListItemButton
                    key={item.name}
                    sx={{ py: 0, minHeight: 50, color: 'rgba(255,255,255,.8)' }}
                    selected={selectedIndex === item.id}
                    onClick={(event) => handleListItemClick(event, item.id)}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name} 
                      primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }} 
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
