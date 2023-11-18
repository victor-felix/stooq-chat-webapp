import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Grid, TextField, IconButton, Divider } from '@mui/material';
import { Send, SmartToy } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  selectError,
  selectLoading,
  selectMessages,
  selectRoom,
} from './slice/selectors';
import { useMessagesSlice } from './slice';
import { selectProfile } from 'app/pages/LoginPage/Features/LoginForm/slice/selectors';
import { Message } from './slice/types';
import Chat from 'app/components/Chat';

interface Props {
  sendMessage: (message: string) => void;
  lastMessage: any;
}

export function Messages({ sendMessage, lastMessage }: Props) {
  const dispatch = useDispatch();
  const { actions: messageActions } = useMessagesSlice();
  const messages = useSelector(selectMessages);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const room = useSelector(selectRoom);
  const profile = useSelector(selectProfile);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: yup.object({
      content: yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (room && profile) {
        const date = new Date();

        sendMessage(
          JSON.stringify({
            room_id: room.id,
            room_name: room.name,
            content: values.content,
            user_id: profile.id,
            created_at: date.toISOString(),
          }),
        );

        const stock = values.content.includes('/stock=');
        if (!stock) {
          dispatch(
            messageActions.pushMessage({
              content: values.content,
              user_id: profile.id,
              room_id: room.id,
              created_at: date.toISOString(),
            }),
          );
        }
        resetForm();
      }
    },
  });

  React.useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const data = JSON.parse(lastMessage.data);
      const message = data.body as Message;
      const stock = message.content.includes('/stock=');
      if (!stock && message.room_id) {
        dispatch(messageActions.pushMessage(message));
      }
    }
  }, [lastMessage]); // eslint-disable-line

  if (error) {
    return <div>Ocorreu um erro</div>;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <List
        sx={{
          height: '70vh',
          overflow: 'auto',
          padding: '10px',
        }}
      >
        {messages.map(message => {
          const side = message.user_id === profile?.id ? 'right' : 'left';
          return (
            <Chat
              avatar={''}
              AvatarProps={{ component: message.user_id ? '' : SmartToy }}
              messages={[message.content]}
              side={side}
              key={message.id}
            />
          );
        })}
      </List>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{ padding: '20px' }}>
          <Grid item xs={11}>
            <TextField
              name="content"
              label="Mensagem"
              variant="standard"
              fullWidth
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              size="small"
            />
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton type="submit">
              <Send />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
