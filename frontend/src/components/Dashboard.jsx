import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ForestSharpIcon from '@mui/icons-material/ForestSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import { useState } from 'react';
import Home from './pages/home/Home';
import Pracownicy from './pages/pracownicy/Pracownicy';
import Raporty from './pages/raporty/Raporty';
import Urlop from './pages/urlop/Urlop';
// import { useState } from 'react';

const drawerWidth = 240;

const nav = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: 'home',
  },
  {
    title: 'Pracownicy',
    icon: <PeopleIcon />,
    link: 'pracownicy',
  },
  {
    title: 'Urlop',
    icon: <ForestSharpIcon />,
    link: 'urlop',
  },
  {
    title: 'Raporty',
    icon: <ListAltSharpIcon />,
    link: 'raporty',
  },
];

const activeMenuSxStyle = {
  borderRight: '2px solid black',
};

export default function PermanentDrawerLeft() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('home');

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  let componentToRender;
  switch (selectedMenuItem) {
    case 'home':
      componentToRender = <Home />;
      break;
    case 'pracownicy':
      componentToRender = <Pracownicy />;
      break;
    case 'urlop':
      componentToRender = <Urlop />;
      break;
    case 'raporty':
      componentToRender = <Raporty />;
      break;

    default:
      componentToRender = <Home />;
      break;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {nav.map(({ title, icon, link }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(link)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={title}
                  sx={selectedMenuItem === link ? activeMenuSxStyle : {}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {componentToRender}
      </Box>
    </Box>
  );
}
