
// Esta configuracion es para que NestJS pueda leer las variables de entorno dentro de sus modulos
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  default_limit: +process.env.DEFAULT_LIMIT || 10,
});
// Antes de llegar aca, pasa por joi.validation
