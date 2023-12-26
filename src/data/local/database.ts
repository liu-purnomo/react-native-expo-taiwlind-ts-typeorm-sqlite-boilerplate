import { DataSource } from "typeorm";
import { TaskEntity, UserEntity } from "./models";

export const source = new DataSource({
  database: "rpi.db",
  type: "expo",
  driver: require("expo-sqlite"),
  entities: [TaskEntity, UserEntity],
  synchronize: true,
});
