import * as yup from 'yup'

export interface IUser {
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  root?: boolean
  firstName?: string;
  lastName?: string;
}

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(3),
  root: yup.boolean().default(false),
  firstName: yup.string(),
  lastName: yup.string(),
  password: yup.string().required().min(3),
})