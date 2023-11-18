import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  loginLabel: () => _t(translations.links.loginLinkLabel, 'Login'),
  usernameLabel: () => _t(translations.input.labels.userNameLabel, 'Name'),
  emailLabel: () => _t(translations.input.labels.emailLabel, 'Email'),
  passwordLabel: () => _t(translations.input.labels.passwordLabel, 'Password'),
  registerButtonLabel: () =>
    _t(translations.button.labels.registerButtonLabel, 'Register'),
  emailInvalidMessage: () =>
    _t(translations.input.validations.emailInvalidMessage, 'Email is invalid'),
  emailIsRequiredMessage: () =>
    _t(
      translations.input.validations.emailIsRequiredMessage,
      'Email is required',
    ),
  passwordIsRequiredMessage: () =>
    _t(
      translations.input.validations.passwordIsRequiredMessage,
      'Password is required',
    ),
  usernameIsRequiredMessage: () =>
    _t(
      translations.input.validations.userNameIsRequiredMessage,
      'Name is required',
    ),
};
