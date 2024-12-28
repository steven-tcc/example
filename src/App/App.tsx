import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Theme from './Theme';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Routes from './Routes';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';

const queryClient = new QueryClient();

const ThemedApp = () => {
  const { authLoading } = useAuth();
  const { user, userLoading } = useUser();
  return (
    <Theme user={user}>
      <BrowserRouter>
        {userLoading || authLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 20 }}>
            <CircularProgress size={'4em'} />
          </Box>
        ) : (
          <Routes />
        )}
      </BrowserRouter>
    </Theme>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemedApp />
    </QueryClientProvider>
  );
}

export default App;
