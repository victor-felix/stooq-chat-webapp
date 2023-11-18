import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  registerLabel: () =>
    _t(translations.links.registerLinkLabel, 'Create new account'),
  emailLabel: () => _t(translations.input.labels.emailLabel, 'Email'),
  passwordLabel: () => _t(translations.input.labels.passwordLabel, 'Password'),
  loginButtonLabel: () =>
    _t(translations.button.labels.loginButtonLabel, 'Login'),
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
};
