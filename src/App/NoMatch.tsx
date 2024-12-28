import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import useAppBar from '../hooks/useAppBar';
import { useEffect } from 'react';

const Component = () => {
  const { setTitle, setTabs } = useAppBar();
  useEffect(() => {
    setTitle('');
    setTabs([]);
  }, [setTitle, setTabs]);
  return (
    <Container maxWidth="xs">
      <Stack spacing={5}>
        <Box pt={5}>
          <Typography variant="h4" pb={1}>
            {'Nothing here...'}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Component;
