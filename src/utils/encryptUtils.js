import {
  AES, enc, mode, pad,
} from 'crypto-js';

const {
  REACT_APP_ENCRYPT_KEY, REACT_APP_ENCRYPT_IV,
} = process.env;

const key = REACT_APP_ENCRYPT_KEY;

const cfg = {
  iv: enc.Utf8.parse(REACT_APP_ENCRYPT_IV),
  padding: pad.Pkcs7,
  mode: mode.CBC,
};

export function encrypt(text) {
  const cipher = AES.encrypt(text, enc.Utf8.parse(key), cfg);

  return cipher.toString();
}

export function decrypt(ciphertext) {
  const bytes = AES.decrypt(ciphertext, enc.Utf8.parse(key), cfg);
  const originalText = bytes.toString(enc.Utf8);
  return originalText;
}
