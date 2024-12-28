import { ReactElement } from 'react';
import { ThemeProvider, createTheme, PaletteOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { isRtlLang } from 'rtl-detect';

import { getLanguagePreference, getPrefersDarkTheme } from '../utils';
import { colors } from '../constants';

import { TUserSchema } from '../hooks/useUser';

const paletteLight = {
  mode: 'light' as PaletteOptions['mode'],
  background: {
    default: colors.white,
    paper: colors.grey50,
  },
  grey: {
    50: colors.grey50,
    100: colors.grey100,
    200: colors.grey200,
    300: colors.grey300,
    400: colors.grey400,
    500: colors.grey500,
    600: colors.grey600,
    700: colors.grey700,
    800: colors.grey800,
    900: colors.grey900,
  },
  primary: {
    light: colors.lightTeal,
    main: colors.teal,
    dark: colors.darkTeal,
    contrastText: colors.white,
  },
  secondary: {
    light: colors.lightRed,
    main: colors.red,
    dark: colors.darkRed,
    contrastText: colors.white,
  },
  error: {
    light: colors.lightRed,
    main: colors.red,
    dark: colors.darkRed,
    contrastText: colors.white,
  },
  warning: {
    light: colors.lightYellow,
    main: colors.yellow,
    dark: colors.darkYellow,
  },
  success: {
    light: colors.lightGreen,
    main: colors.green,
    dark: colors.darkGreen,
    contrastText: colors.grey900,
  },
  info: {
    light: colors.lightTeal,
    main: colors.teal,
    dark: colors.darkTeal,
    contrastText: colors.grey900,
  },
};

const paletteDark = Object.assign({}, paletteLight, {
  mode: 'dark' as PaletteOptions['mode'],
  background: {
    default: colors.grey900,
    paper: colors.grey800,
  },
  primary: {
    light: colors.lightLightTeal,
    main: colors.lightTeal,
    dark: colors.teal,
    contrastText: colors.white,
  },
});

function Theme({ children, user }: { children: ReactElement; user?: TUserSchema | null }) {
  const [language] = user?.language || getLanguagePreference();
  const isDark = user?.dark_mode_enabled === undefined ? getPrefersDarkTheme() : user?.dark_mode_enabled;

  const direction = isRtlLang(language) ? 'rtl' : 'ltr';

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
  });

  if (document) {
    document.body.dir = direction;
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }

  const theme = createTheme({
    direction: direction,
    palette: isDark ? paletteDark : paletteLight,
    typography: {
      fontFamily: [
        '"Noto Sans"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h5: {
        fontWeight: 300,
      },
      h6: {
        fontWeight: 300,
      },
      subtitle1: {
        lineHeight: 1.5,
      },
      subtitle2: {
        fontWeight: 300,
      },
      button: {
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          {children}
        </>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Theme;
