import { config } from 'dotenv';
config();

export const APP_PORT = Number(process.env.PORT || process.env.APP_PORT);
export const MONGOOSE_CONNECTION_STRING =
  process.env.MONGOOSE_CONNECTION_STRING;
export const JWT_SALT = process.env.JWT_SALT;

export enum ROLES {
  USER = 'user',
  ADMIN = 'admin',
}
