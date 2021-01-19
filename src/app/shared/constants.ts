// Link(s)
export const LOGIN_PATH = 'login';
export const LOGIN_LINK = `/${LOGIN_PATH}`;
export const LOGIN_LINK_RE = new RegExp(`^(/#)?${LOGIN_LINK}\\b`);

export const FILES_PATH = 'files';
export const FILES_LINK = `/${FILES_PATH}`;

// Key(s)
export const TOKEN_KEY = 'token';
export const FORCED_LOGOUT = 'forcedLogout';
export const LOGOUT_CAUSE = 'logoutCause';
