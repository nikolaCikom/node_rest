import Joi from 'joi';

export const userLoginSchema = Joi.object({
  username: Joi.string()
    .regex(/^[a-z0-9_-]{3,15}$/)
    .required(),

  password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .required(),
}).options({ abortEarly: false });
