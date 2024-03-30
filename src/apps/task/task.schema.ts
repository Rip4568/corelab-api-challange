import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().notRequired(),
  color: yup.string().notRequired().default("red"),
  favorite: yup.boolean().notRequired().default(false),
})
