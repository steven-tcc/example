import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallMergeOutlinedIcon from '@mui/icons-material/CallMergeOutlined';

import CloseIcon from '@mui/icons-material/Close';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import MenuItem from './MenuItem';

const iconSize = 20;

const Component = ({ close }: { close: () => void }) => {
  const navigate = useNavigate();

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
      <Stack spacing={0}>
        <MenuItem
          hideArrow
          title={'Home'}
          icon={<HomeOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
          onClick={() => {
            navigate('/');
            close();
          }}
        />
        <MenuItem
          hideArrow
          title={'Requests'}
          icon={<CallMergeOutlinedIcon sx={{ width: iconSize, height: iconSize }} />}
        />
      </Stack>
    </Container>
  );
};

export default Component;
