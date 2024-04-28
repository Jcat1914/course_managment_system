import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("schedulingSystem", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
