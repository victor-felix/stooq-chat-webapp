import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRive, useStateMachineInput } from 'rive-react';

import { useRegisterSlice } from './slice';
import { messages } from '../../messages';
import styled from 'styled-components';

const STATE_MACHINE_NAME = 'State Machine 1';

export function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useRegisterSlice();

  const { rive, RiveComponent } = useRive({
    src: '520-990-teddy-login-screen.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  const stateSuccess = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'success',
  );
  const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, 'fail');
  const stateHandUp = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'hands_up',
  );

  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Check');
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Look');

  const triggerSuccess = () => {
    stateSuccess && stateSuccess.fire();
  };

  const triggerFail = () => {
    stateFail && stateFail.fire();
  };

  const setHangUp = hangUp => {
    stateHandUp && (stateHandUp.value = hangUp);
  };

  const setCheck = check => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  const setLook = field => {
    if (!stateLook || !stateCheck || !setHangUp) {
      return;
    }
    setHangUp(false);
    setCheck(true);
    let nbChars = 0;

    if (field) {
      nbChars = parseFloat(`${field.split('').length}`);
    }

    let ratio = nbChars / parseFloat('41');

    let lookToSet = ratio * 100 - 25;
    stateLook.value = Math.round(lookToSet);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      user_name: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email(t(messages.emailInvalidMessage()))
        .required(t(messages.emailIsRequiredMessage())),
      password: yup.string().required(t(messages.passwordIsRequiredMessage())),
      user_name: yup.string().required(t(messages.usernameIsRequiredMessage())),
    }),
    onSubmit: values => {
      triggerSuccess();
      dispatch(actions.register(values));
    },
  });

  const setLookEmail = () => {
    setLook(formik.values.email);
  };

  const setLookUsername = () => {
    setLook(formik.values.user_name);
  };

  React.useEffect(() => {
    setLookEmail();
  }, [formik.values.email, formik.values.user_name]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setLookUsername();
  }, [formik.values.user_name]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form onSubmit={formik.handleSubmit}>
      <RiveComponent
        style={{ width: '300px', height: '300px', marginBottom: '10px' }}
      />
      <TextField
        name="email"
        label={t(messages.emailLabel())}
        variant="filled"
        fullWidth
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        name="user_name"
        label={t(messages.usernameLabel())}
        variant="filled"
        fullWidth
        value={formik.values.user_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.user_name && Boolean(formik.errors.user_name)}
        helperText={formik.touched.user_name && formik.errors.user_name}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        name="password"
        label={t(messages.passwordLabel())}
        variant="filled"
        type="password"
        fullWidth
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={event => {
          formik.handleBlur(event);
          setHangUp(false);
        }}
        onFocus={() => setHangUp(true)}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ marginBottom: '10px' }}
      />
      <Button variant="contained" fullWidth type="submit">
        {t(messages.registerButtonLabel())}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
