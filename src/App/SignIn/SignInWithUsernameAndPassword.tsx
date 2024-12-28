import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
// import CircularProgress from '@mui/material/CircularProgress';

import FormTextField from '../Form/FormTextField';
import FormSubmitButton from '../Form/FormSubmitButton';

import { useAuth, defaultSignIn, TSignInSchema, signInSchema } from '../../hooks/useAuth';

function Component() {
  const { signInLoading, signInWithEmailAndPassword, signInError } = useAuth();

  const { handleSubmit, reset, control } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignIn,
  });

  const processSignIn: SubmitHandler<TSignInSchema> = async (data) => {
    const success = await signInWithEmailAndPassword(data.email, data.password);
    if (success) {
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(processSignIn)}>
      <Stack spacing={2}>
        <FormTextField required name="email" label="Email" control={control} type="email" autoComplete="email" />
        <Stack spacing={1}>
          <FormTextField required name="password" label={'Password'} control={control} type="password" />
          <Box textAlign={'end'}>
            <Typography variant="body2">
              <Link>Forget password?</Link>
            </Typography>
          </Box>
        </Stack>
        <FormSubmitButton disabled={signInLoading} buttonText={'Sign in'} />
        {signInError ? <Alert severity="error">Something went wrong</Alert> : null}
      </Stack>
    </form>
  );
}

export default Component;
