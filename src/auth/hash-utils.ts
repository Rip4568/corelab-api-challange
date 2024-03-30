import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds: number = 10;
const secretPassword: string = 'my-strong-and-security-password-keys';

async function generateHash(text: string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  } catch (error) {
    console.error('Erro ao gerar hash:', error);
    throw error;
  }
}

async function compareHash(text: string, hashedText: string): Promise<boolean> {
  try {
    const result = await bcrypt.compare(text, hashedText);
    return result;
  } catch (error) {
    console.error('Erro ao comparar hashes:', error);
    throw error;
  }
}

function generateTokenJWT(payload: object) {
  try {
    const token = jwt.sign({ payload }, secretPassword, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Erro ao gerar token JWT:', error);
    throw error;
  }
}

function validateTokenJWT(token: string) {
  try {
    const decoded = jwt.verify(token, secretPassword);
    return decoded;
  } catch (error) {
    console.error('Token JWT inválido:', error);
    return null;
  }
}

export {
  generateTokenJWT,
  validateTokenJWT,
  generateHash,
  compareHash
};