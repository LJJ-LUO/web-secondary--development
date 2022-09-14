import intl from 'react-intl-universal';

export const setErrorMessage = data => {
  const { code, message = '' } = data;
  const codeKey = code ? `ERROR.${code}` : 'common.empty';
  data.message = intl.get(codeKey).d(message);
};
