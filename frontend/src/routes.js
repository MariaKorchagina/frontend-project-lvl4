const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelPath: (id) => [apiPath, 'channels', id].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};

export const pathChatPage = '/';
export const pathLoginPage = '/login';
export const pathSignUpPage = '/signup';
export const pathEmpty = '';
export const pathNotFound = '*';

export default routes;
