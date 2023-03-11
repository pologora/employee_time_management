import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
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
import Employees from './pages/pracownicy/Employees';
import Raporty from './pages/raporty/Raports';
import Urlop from './pages/urlop/Vacations';

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
      componentToRender = <Employees />;
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f0f0f0',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ marginTop: 10 }}>
          {nav.map(({ title, icon, link }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(link)}>
                <ListItemIcon sx={selectedMenuItem === link ? { color: '#2196f3' } : {}}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  sx={selectedMenuItem === link ? activeMenuSxStyle : {}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        {componentToRender}
      </Box>
    </Box>
  );
}
