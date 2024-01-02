import { Schema, model, connect } from 'mongoose';

interface UserSchema {
  username: string;
  email: string;
  password: string;
  image?: string;
}

const userSchema = new Schema<UserSchema>(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: 'public/images/abstract-user.png',
      require: false,
    },
  },
  { timestamps: true }
);

const Users = model<UserSchema>('users', userSchema);

export default Users;
