
const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_USER = process.env.DB_USER ?? "root";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_NAME = process.env.DB_NAME ?? "credithealthdb";
const DB_PORT = process.env.DB_PORT ?? 3306;
const dialect = "mysql";
const pool = {
  max: 5, // maximum number of connection in pool
  min: 0, // minimum number of connection in pool
  acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
  idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
}

export {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  dialect,
  pool
}