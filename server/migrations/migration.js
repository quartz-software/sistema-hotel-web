import { sequelize } from "../models/index.js";

class Migration {
  static async migrate() {
    try {
      await sequelize.sync({ force: true });
    } catch (error) {
      console.error(error);
    }
  }
}

Migration.migrate();
