import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  ENVIRONMENT: Joi.string().valid('development', 'production', 'staging').required(),
  PORT: Joi.number().port().required(),
  CORS_CLIENT_URLS: Joi.string().required(),
  API_URL: Joi.string().required(),
  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().integer().required(),
  // database
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  // redis
  REDIS_PORT: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),
  // aws
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  // s3
  S3_REGION_NAME: Joi.string().required(),
  S3_PUBLIC_BUCKET_NAME: Joi.string().required(),
  S3_PRIVATE_BUCKET_NAME: Joi.string().required(),
  S3_PUT_ACTION_EXPIRES_SEC: Joi.number().integer().required(),
  S3_GET_ACTION_EXPIRES_SEC: Joi.number().integer().required(),
});

export default () => ({
  env: process.env.NODE_ENV,
  environment: process.env.ENVIRONMENT,
  port: parseInt(process.env.PORT as string, 10),
  corsClientUrls: (process.env.CORS_CLIENT_URLS as string).split(','),
  apiUrl: process.env.API_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  s3: {
    region: process.env.S3_REGION_NAME,
    publicBucket: process.env.S3_PUBLIC_BUCKET_NAME,
    privateBucket: process.env.S3_PRIVATE_BUCKET_NAME,
    putActionExpiresSec: parseInt(process.env.S3_PUT_ACTION_EXPIRES_SEC as string, 10),
    getActionExpiresSec: parseInt(process.env.S3_GET_ACTION_EXPIRES_SEC as string, 10),
  },
});

export const validationOptions = {
  abortEarly: true,
};
