import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  username: Joi.string()
    .regex(/^[a-z0-9_-]{3,15}$/)
    .required(),

  name: Joi.string().min(1).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .required(),

  repeatPassword: Joi.ref('password'),
}).options({ abortEarly: false });
