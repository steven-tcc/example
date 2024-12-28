import { useRoutes, useLocation, Navigate, RouteObject } from 'react-router-dom';

import Layout from './Layout';
import SignIn from './SignIn';

import { useAuth } from '../hooks/useAuth';
import NoMatch from './NoMatch';

// <Navigate to={'/signin'} state={{ from: location.pathname + location.search }} replace={true} />

const Home = () => {
  return <div>Home</div>;
};

const AppRoutes = () => {
  const { authUser } = useAuth();
  const location = useLocation();

  const appRoutes: RouteObject[] = [
    {
      path: '',
      element: authUser ? <Home /> : <Navigate to="/signin" replace={true} />,
    },
    {
      path: 'signin',
      element: authUser ? <Navigate to={location.state?.from || '/'} replace={true} /> : <SignIn />,
    },
    // {
    //   path: 'signup',
    //   element: <SignUp />,
    // },
    // {
    //   path: 'signup/:invite',
    //   element: <SignUp />,
    // },
    // {
    //   path: ':accountName',
    //   element: <Account />,
    // },
    // {
    //   path: ':accountName/:repoId',
    //   element: <Account />,
    // },
    {
      path: "*",
      element: <NoMatch />
    }
  ];

  return useRoutes([
    {
      path: '/*',
      element: <Layout />,
      children: appRoutes,
    },
  ]);
};

export default AppRoutes;
