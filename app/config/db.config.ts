export default  {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  DB: process.env.ENV === "TEST" ? "backpack_dev" : "backpack",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
