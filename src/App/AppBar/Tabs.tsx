import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { colors } from '../../constants';

import Stack from '@mui/material/Stack';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import { Tab as TabType } from '../../hooks/useAppBar';

export const tabHeight = '40px';

const Component = ({ tabs }: { tabs: TabType[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const index = tabs.findIndex((tab) => tab.name === searchParams.get('tab'));
  const value = index > 0 ? index : 0;

  return (
    <Box sx={{ width: '100%', height: tabHeight }}>
      <Tabs
        textColor={'inherit'}
        sx={{
          minHeight: tabHeight,
        }}
        value={value}
        onChange={(_: React.SyntheticEvent, newValue: number) => {
          const name = tabs[newValue].name;
          setSearchParams(createSearchParams({ tab: name }));
        }}
      >
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.name}
              icon={tab.icon ? tab.icon : undefined}
              iconPosition="start"
              sx={{ '&.MuiTab-root': { pt: 0.5, pb: 0.5, minHeight: '38px' } }}
              label={
                <Stack spacing={1} direction="row">
                  <Box>{tab.name}</Box>
                  {typeof tab.count !== 'undefined' ? (
                    <Box
                      sx={{
                        borderRadius: '9px',
                        minWidth: '18px',
                        textAlign: 'center',
                        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? colors.grey600 : colors.grey200),
                        pl: 0.5,
                        pr: 0.5,
                      }}
                    >
                      {tab.count}
                    </Box>
                  ) : null}
                </Stack>
              }
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default Component;
