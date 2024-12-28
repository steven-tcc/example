import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import MenuItem from './MenuItem';

import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

const iconSize = 20;

const Component = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();
  const { signOut, authUser } = useAuth();
  const { user } = useUser();
  console.log(authUser);
  return (
    <Container disableGutters sx={{ pl: 2, pr: 2 }} maxWidth="xs">
      <Toolbar disableGutters>
        <Box flexGrow={1}></Box>
        <Box flexGrow={0}>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {authUser && !authUser.user_metadata?.email_verified ? (
        <Alert sx={{ pb: 2 }} severity="warning">
          Please verify your email address
        </Alert>
      ) : null}
      <Stack spacing={0}>
        <MenuItem
          title={'Profile'}
          subtitle={user?.full_name || user?.email || <Alert severity="warning" />}
          icon={<AccountCircleOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
          onClick={() => {
            navigate('/');
            close();
          }}
        />

        <MenuItem
          title={'Language'}
          subtitle={user?.language ? user?.language : 'English'}
          icon={<TranslateOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
        />
        <MenuItem
          title={'Theme'}
          subtitle={
            user?.dark_mode_enabled === undefined ? 'System default' : user.dark_mode_enabled ? 'Dark' : 'Light'
          }
          icon={<WbSunnyOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
        />
        <MenuItem
          hideArrow
          title={'Privacy Policy'}
          icon={<PrivacyTipOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
        />
        <MenuItem
          title={'Remove account'}
          hideArrow
          icon={<PersonRemoveOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
        />
        <MenuItem
          hideArrow
          title={'Get Help'}
          icon={<HelpOutlineOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
        />
        <MenuItem
          title={'Log out'}
          hideArrow
          icon={<LogoutOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
          onClick={() => signOut()}
        />
      </Stack>
    </Container>
  );
};

export default Component;
