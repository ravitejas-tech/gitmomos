import keytar from 'keytar';

const SERVICE_NAME = 'gitmomos';
const ACCOUNT_NAME = 'session';

export const saveSession = async (token: string) => {
  await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
};

export const getSession = async () => {
  return await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
};

export const clearSession = async () => {
  await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
};
