import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { messages } from '../../messages';

export function LoginLink() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  return (
    <Link component="button" onClick={() => navigate('/')}>
      {t(messages.loginLabel())}
    </Link>
  );
}
