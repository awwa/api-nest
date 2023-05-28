export default () => ({
  port: parseInt(process.env.PORT || '3100', 10) || 3100,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432 ', 10) || 5432,
  },
});
