import React from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from './AppBar';

function Component() {
  return (
    <React.Fragment>
      <AppBar />
      <Outlet />
    </React.Fragment>
  );
}

export default Component;
