import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { HTTP_STATUS_CODE } from 'utils/constants';
import { translations } from 'locales/translations';

let globalAxiosInstance: any;

export const axiosInterface = {
  get instance() {
    return globalAxiosInstance || createAxiosInstance();
  },
};

export const axiosInstance: AxiosInstance = axiosInterface.instance;

export function createAxiosInstance() {
  const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
  };
  const instance = axios.create(config);

  globalAxiosInstance = instance;

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status >= HTTP_STATUS_CODE.InternalServerError) {
        const { t } = useTranslation();
        const { enqueueSnackbar } = useSnackbar();
        enqueueSnackbar({
          variant: 'error',
          message: t(translations.plugins.axios.error.internal.message),
        });
      }

      return Promise.reject(error);
    },
  );

  return instance;
}
