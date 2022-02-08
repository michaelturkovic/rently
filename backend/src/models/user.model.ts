import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces';
import { config } from '../config';

export interface UserDoc extends User, Document {
  validatePassword(password: string): Promise<boolean>;
  generateJwt(): string;
}

const schema: Schema = new Schema<UserDoc>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

schema.pre('save', async function (this: UserDoc, next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

schema.method(
  'validatePassword',
  async function (this: UserDoc, password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  },
);

schema.method('generateJwt', async function (this: UserDoc) {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
});

export const UserModel = model<UserDoc>('User', schema);
