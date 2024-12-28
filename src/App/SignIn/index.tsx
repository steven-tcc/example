import { Link as LinkRouter } from 'react-router-dom';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormWizard from '../Form/FormWizard';

import { useAuth } from '../../hooks/useAuth';
import SignInWithUsernameAndPassword from './SignInWithUsernameAndPassword';
import useAppBar from '../../hooks/useAppBar';
import { useEffect } from 'react';

const Component = () => {
  const { signInError, signInWithGoogle } = useAuth();
  const { setTitle, setTabs } = useAppBar();
  useEffect(() => {
    setTitle('');
    setTabs([]);
  }, [setTitle, setTabs]);
  return (
    <Container maxWidth="xs">
      <Stack spacing={5}>
        <FormWizard
          pages={[
            {
              title: 'Sign in?',
              page: SignInWithUsernameAndPassword,
            },
          ]}
        />
        <Divider />
        <Stack spacing={2}>
          <Button
            startIcon={<GoogleIcon fontSize="large" />}
            color="inherit"
            variant="outlined"
            disabled={!!signInError}
            size="large"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>
          <Button
            startIcon={<FacebookIcon fontSize="large" />}
            color="inherit"
            variant="outlined"
            disabled
            size="large"
          >
            Sign in with Facebook
          </Button>
          <Button
            startIcon={<LinkedInIcon fontSize="large" />}
            color="inherit"
            variant="outlined"
            disabled
            size="large"
          >
            Sign in with LinkedIn
          </Button>
        </Stack>
        <Stack direction={'row'} spacing={1} justifyContent={'center'}>
          <Typography variant="body1">{"Don't have an account yet?"}</Typography>
          <LinkRouter to="/signup">
            <Link component="span">{'Get registered'}</Link>
          </LinkRouter>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Component;
