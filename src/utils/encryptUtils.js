import { AES, enc } from 'crypto-js';

const {
  REACT_APP_ENCRYPT_KEY,
} = process.env;

export function encrypt(text) {
  return AES.encrypt(text, REACT_APP_ENCRYPT_KEY).toString();
}

export function decrypt(ciphertext) {
  const bytes = AES.decrypt(ciphertext, REACT_APP_ENCRYPT_KEY);
  const originalText = bytes.toString(enc.Utf8);
  return originalText;
}
