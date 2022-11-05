import { encrypt, decrypt } from './encryptUtils';

describe('encryptUtils', () => {
  const { env } = process;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  test('encrypt and decrypt', () => {
    process.env.REACT_APP_ENCRYPT_KEY = '1234567890123456';
    process.env.REACT_APP_ENCRYPT_IV = '1234567890123456';
    const text = encrypt('test');
    expect(decrypt(text)).toBe('test');
  });

  afterEach(() => {
    process.env = env;
  });
});
