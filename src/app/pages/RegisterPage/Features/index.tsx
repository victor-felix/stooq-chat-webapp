import React from 'react';
import { Grid, Paper } from '@mui/material';
import { RegisterForm } from './RegisterForm';
import { LoginLink } from './LoginLink';

export function Features() {
  return (
    <Grid container component={Paper} spacing={1}>
      <Grid item xs={12} sx={{ padding: '10px' }}>
        <RegisterForm />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}
      >
        <LoginLink />
      </Grid>
    </Grid>
  );
}
