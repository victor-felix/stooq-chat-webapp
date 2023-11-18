/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { GlobalStyle } from 'styles/global-styles';

import { LoginPage } from './pages/LoginPage/Loadable';
import { ChatPage } from './pages/ChatPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { selectIsAuthenticated } from './pages/LoginPage/Features/LoginForm/slice/selectors';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { RegisterPage } from './pages/RegisterPage/Loadable';

const WrapperRoute = ({ children, isPrivate }) => {
  let navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  React.useEffect(() => {
    if (isPrivate && !isAuthenticated) {
      navigate('/');
    } else if (!isPrivate && isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated]); // eslint-disable-line

  return children;
};

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: ['Fira Code'].join(','),
        },
      }),
    [prefersDarkMode],
  );

  theme = responsiveFontSizes(theme);

  const { i18n } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Routes>
          <Route
            path="/"
            element={
              <WrapperRoute isPrivate={false}>
                <LoginPage />
              </WrapperRoute>
            }
          />
          <Route
            path="/register"
            element={
              <WrapperRoute isPrivate={false}>
                <RegisterPage />
              </WrapperRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <WrapperRoute isPrivate>
                <ChatPage />
              </WrapperRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}
