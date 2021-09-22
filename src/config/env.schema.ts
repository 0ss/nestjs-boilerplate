// import * as Joi from 'Joi';

// export const envSchema = Joi.object({
//   NODE_ENV: Joi.string()
//     .valid('development', 'production')
//     .default('development'),
//   PORT: Joi.number().default(3000),
//   DB_TYPE: Joi.string().required(), // ex: mysql
//   DB_NAME: Joi.string().required(), // ex: Blog
//   DB_HOST: Joi.string().required(), // ex: localhost:3306
//   DB_USER: Joi.string().required(),
//   DB_PASSWORD: Joi.string().not().required(),
//   DB_PORT: Joi.number().default(5432),
//   JWT_SECRET: Joi.string().when('NODE_ENV', {
//     is: 'production',
//     then: Joi.required(),
//     otherwise: Joi.optional().default('jwt'),
//   }),
//   JWT_EXPIRES_IN: Joi.string().when('NODE_ENV', {
//     is: 'production',
//     then: Joi.required(),
//     otherwise: Joi.optional().default('7 days'),
//   }),
//   FACEBOOK_ID: Joi.string().when('NODE_ENV', {
//     is: 'production',
//     then: Joi.required(),
//     otherwise: Joi.optional().default('fake'),
//   }),
//   FACEBOOK_SECRET: Joi.string().when('NODE_ENV', {
//     is: 'production',
//     then: Joi.required(),
//     otherwise: Joi.optional().default('fake'),
//   }),
//   GOOGLE_ID: Joi.string().when('NODE_ENV', {
//     is: 'production',
//     then: Joi.required(),
//     otherwise: Joi.optional().default('fake'),
//   }),
//   GOOGLE_SECRET: Joi.string().when('NODE_ENV', {
//     is: 'production',
//     then: Joi.required(),
//     otherwise: Joi.optional().default('fake'),
//   }),
// });
