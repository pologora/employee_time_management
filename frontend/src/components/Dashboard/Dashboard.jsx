import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ForestSharpIcon from '@mui/icons-material/ForestSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import FaceIcon from '@mui/icons-material/Face';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

import { Button } from '@mui/material';
import Logo from '../Logo';

const nav = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/home',
  },
  {
    title: 'Pracownicy',
    icon: <PeopleIcon />,
    link: '/employees',
  },
  {
    title: 'Urlop',
    icon: <ForestSharpIcon />,
    link: '/vacations',
  },
  {
    title: 'Raporty',
    icon: <ListAltSharpIcon />,
    link: '/raports',
  },
  {
    title: 'Agencja',
    icon: <AssistWalkerIcon />,
    link: '/agencies',
  },
  {
    title: 'Wnioski urlopowe',
    icon: <ReceiptLongOutlinedIcon />,
    link: '/proposals',
  },
  {
    title: 'Użytkownicy',
    icon: <FaceIcon />,
    link: '/users',
  },
];

const activeMenuSxStyle = {
  borderRight: '2px solid black',
};

const logoSrc = process.env.REACT_APP_LOGO_PATH;

export default function PermanentDrawerLeft() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('home');
  const [isFullMenu, setIsFullMenu] = useState(false);

  const drawerWidth = isFullMenu ? 240 : 60;

  const toggleMenu = () => {
    setIsFullMenu((prev) => !prev);
  };

  const menuIcon = isFullMenu ? (<KeyboardDoubleArrowLeftOutlinedIcon />)
    : (<KeyboardDoubleArrowRightOutlinedIcon />);

  const handleClick = (item) => {
    setSelectedMenuItem(item);
  };

  const navLinks = nav.map(({ title, icon, link }) => (
    <ListItem key={title} disablePadding>
      <Link
        to={link}
        style={{
          textDecoration: 'none', color: 'inherit', width: '100%',
        }}
      >
        <ListItemButton onClick={() => handleClick(link)}>
          <ListItemIcon
            sx={selectedMenuItem === link ? { color: '#2196f3' } : {}}
          >
            {icon}
          </ListItemIcon>
          {isFullMenu && (
          <ListItemText
            primary={title}
            sx={selectedMenuItem === link ? activeMenuSxStyle : {}}
          />
          )}
        </ListItemButton>
      </Link>
    </ListItem>
  ));

  return (
    <Box sx={{ display: 'flex' }} component="nav">
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
        {isFullMenu && (
        <Box sx={{ backgroundColor: '#36454F' }}>
          <Logo src={logoSrc} alt="Logo firmy SNTI" />
        </Box>
        )}
        <div className="menuIconContainer">
          <Button
            variant="outlined"
            startIcon={menuIcon}
            onClick={toggleMenu}
            sx={{ width: '100%' }}
            size="small"
          />
        </div>
        <List sx={{ marginTop: 1 }}>
          {navLinks}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', padding: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
