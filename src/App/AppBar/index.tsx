import { useNavigate } from 'react-router-dom';

import MuiAppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import { useUser } from '../../hooks/useUser';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Tabs, { tabHeight } from './Tabs';
import Logo from './Logo';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';

import UserMenu from './UserMenu';
import Menu from './Menu';
import useAppBar from '../../hooks/useAppBar';
import Button from '@mui/material/Button';

const AppBar = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { user } = useUser();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  const { title, tabs } = useAppBar();

  const closeUserDrawer = () => setUserDrawerOpen(false);
  const closeMenuDrawer = () => setMenuDrawerOpen(false);

  const showTabs = !!tabs && tabs.length > 0;

  return (
    <>
      <Toolbar />
      {showTabs ? <div style={{ height: tabHeight }} /> : null}
      {user ? (
        <Drawer anchor="left" open={menuDrawerOpen} onClose={closeMenuDrawer}>
          <Menu close={closeMenuDrawer} />
        </Drawer>
      ) : null}
      {user ? (
        <Drawer anchor="right" open={userDrawerOpen} onClose={closeUserDrawer}>
          <UserMenu close={closeUserDrawer} />
        </Drawer>
      ) : null}

      <MuiAppBar
        position="fixed"
        sx={{
          color: (theme) => theme.palette.text.primary,
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack spacing={2} direction={'row'} alignItems={'center'} flexShrink={1} overflow={'auto'}>
              {user ? (
                <IconButton onClick={() => setMenuDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              ) : null}
              <Stack fontSize={'40px'} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <Logo />
              </Stack>
              <Stack direction={'row'} spacing={1} overflow={'auto'}>
                <Typography noWrap variant="body2">
                  {title}
                </Typography>
              </Stack>
            </Stack>
            <Box flexGrow={1} />
            <Button sx={{ textTransform: 'unset' }} color='inherit' onClick={() => navigate('/')}>
              Support
            </Button>
            {user ? (
              <IconButton>
                <NotificationsOutlinedIcon />
              </IconButton>
            ) : null}
            {user ? (
              <IconButton onClick={() => setUserDrawerOpen(true)}>
                <Avatar
                  sx={{ width: 35, height: 35, cursor: 'pointer' }}
                  alt={user?.full_name}
                  src={user?.avatar_url}
                />
              </IconButton>
            ) : null}
          </Toolbar>
          {showTabs ? <Tabs tabs={tabs} /> : null}
        </Container>
      </MuiAppBar>

    </>
  );
};
export default AppBar;
