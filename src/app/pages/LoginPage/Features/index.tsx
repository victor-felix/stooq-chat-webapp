import React from 'react';
import { Grid, Paper } from '@mui/material';
import { LoginForm } from './LoginForm';
import { RegisterLink } from './RegisterLink';

export function Features() {
  return (
    <Grid container component={Paper} spacing={1}>
      <Grid item xs={12} sx={{ padding: '10px' }}>
        <LoginForm />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
      >
        <RegisterLink />
      </Grid>
    </Grid>
  );
}
