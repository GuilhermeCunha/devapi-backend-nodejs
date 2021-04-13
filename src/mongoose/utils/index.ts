import { Types } from 'mongoose';

export const toMongooseId = (s?: string | number): Types.ObjectId => {
  if (!s) return;
  return Types.ObjectId(s);
};
