import React from 'react';
import { Grid, Paper } from '@mui/material';
import useWebSocket from 'react-use-websocket';

import { Rooms } from './Rooms';
import { Messages } from './Messages';
import { selectToken } from 'app/pages/LoginPage/Features/LoginForm/slice/selectors';
import { useSelector } from 'react-redux';

export function Features() {
  const token = useSelector(selectToken);

  const { sendMessage, lastMessage } = useWebSocket(
    `${process.env.REACT_APP_WS_BASE_URL}?access_token=${token}`,
    {
      onOpen: () => console.log('opened'),
      shouldReconnect: closeEvent => true,
    },
  );

  return (
    <Grid container component={Paper} sx={{ height: '80vh' }}>
      <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #e0e0e0' }}>
        <Rooms sendMessage={sendMessage} lastMessage={lastMessage} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Messages sendMessage={sendMessage} lastMessage={lastMessage} />
      </Grid>
    </Grid>
  );
}
