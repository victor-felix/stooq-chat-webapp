import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { Features } from './Features';

export function ChatPage() {
  return (
    <>
      <Helmet>
        <title>ChatPage</title>
        <meta
          name="description"
          content="A Boilerplate application chat page"
        />
      </Helmet>
      <Container
        maxWidth="lg"
        sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <Features />
      </Container>
    </>
  );
}
