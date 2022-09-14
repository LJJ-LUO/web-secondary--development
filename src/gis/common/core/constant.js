// intl.get('APP.LARGE')B的私有部署
export const PRIVATE = '0';
// intl.get('COMM.PCD')
export const SAAS = '1';
// windows{intl.get('COMM.CLIENT_MODE')}
export const WIN_CLIENT = '2';
// ssointl.get('COMM.UUMCUM')
export const UUM_SAAS = '3';
// ssointl.get('ASS.PATTERN') 私有云部署
export const UUM_PRIVATE = '4';
// ssointl.get('COMM.PDSUM')
export const SSO_PRIVATE = '5';
// ssointl.get('COMM.IN_MODE')saas化部署子系统
export const SSO_SAAS = '6';

// SSOintl.get('SRC.OPEN')
export const SSO_TRUE = '1';
// SSOintl.get('ANAL.CLOSE')
export const SSO_FALSE = '0';

// URL_TOKEN{intl.get('SRC.OPEN')}
export const SSO_URL_TOKEN_TRUE = '1';
// URL_TOKEN{intl.get('ANAL.CLOSE')}
export const SSO_URL_TOKEN_FALSE = '0';

// SSOintl.get('COMM.USER_SYNCHRONIZATION')
export const SSO_USER_SCHEDUL = '105';

// intl.get('COMM.ICI')UUM主系统模式下
const { configuration: { deploy_mode: { current_value } = {} } = {} } =
  window || {};
export const IS_UUM =
  current_value === UUM_SAAS || current_value === UUM_PRIVATE;
