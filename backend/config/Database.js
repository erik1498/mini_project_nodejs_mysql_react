import { Sequelize } from "sequelize";

const db = new Sequelize('mini_project_nodejs_mysql_react', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

export default db;