import React from 'react';
import {
  List,
  ListItemText,
  ListItem,
  Divider,
  Grid,
  ListItemButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, IconButton, Avatar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  selectError,
  selectLoaded,
  selectLoading,
  selectRooms,
} from './slice/selectors';
import { useRoomsSlice } from './slice';
import { useMessagesSlice } from '../Messages/slice';
import { Room } from './slice/types';
import { selectProfile } from 'app/pages/LoginPage/Features/LoginForm/slice/selectors';
import { Save } from '@mui/icons-material';
import styled from 'styled-components';
import { MenuOptions } from 'app/components/Menu';

interface Props {
  sendMessage: (message: string) => void;
  lastMessage: any;
}

export function Rooms({ sendMessage, lastMessage }: Props) {
  const dispatch = useDispatch();
  const { actions: roomActions } = useRoomsSlice();
  const { actions: messageActions } = useMessagesSlice();
  const rooms = useSelector(selectRooms);
  const loaded = useSelector(selectLoaded);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const profile = useSelector(selectProfile);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(roomActions.createRoom(values.name));
      resetForm();
    },
  });

  if (error) {
    return <div>Ocorreu um erro</div>;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!loaded) {
    dispatch(roomActions.loadRooms());
  }

  const handleClickRoom = (room: Room) => {
    dispatch(messageActions.loadMessages(room));
  };

  return (
    <List>
      <ListItem>
        <Avatar>{profile?.userName[0].toUpperCase()}</Avatar>
        <ListItemText primary={profile?.userName} sx={{ marginLeft: '15px' }} />
        <MenuOptions />
      </ListItem>
      <Divider />
      <ListItem>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                name="name"
                label="Nome da sala"
                variant="outlined"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton type="submit" color="primary">
                <Save />
              </IconButton>
            </Grid>
          </Grid>
        </Form>
      </ListItem>
      <Divider />
      {rooms.map(room => (
        <ListItem key={room.id}>
          <ListItemButton onClick={() => handleClickRoom(room)}>
            <ListItemText primary={room.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

const Form = styled.form`
  width: 100%;
`;
