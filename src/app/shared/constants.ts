// Link(s)
export const LOGIN_ROUTE = 'login';
export const LOGIN_LINK = `/${LOGIN_ROUTE}`;
export const IS_LOGIN_URL = new RegExp(`^(/#)?${LOGIN_LINK}\\b`);

export const FILES_ROUTE = 'files';
export const FILES_LINK = `/${FILES_ROUTE}`;

// Key(s)
export const TOKEN_KEY = 'token';
export const FORCED_LOGOUT = 'forcedLogout';
export const LOGOUT_CAUSE = 'logoutCause';
