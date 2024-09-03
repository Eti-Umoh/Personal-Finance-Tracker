import { Sequelize } from "sequelize";
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const dbDialect = process.env.DB_DIALECT;
const dbPort = parseInt(process.env.DB_PORT, 10);


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,  // You can set this to true if you want to strictly validate the server's SSL certificate.
        },
    },
});

export default sequelize;
