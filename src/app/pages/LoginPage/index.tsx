import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { Features } from './Features';

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>LoginPage</title>
        <meta
          name="description"
          content="A Boilerplate application login page"
        />
      </Helmet>
      <Container
        maxWidth="xs"
        sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <Features />
      </Container>
    </>
  );
}
