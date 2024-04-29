import { createApp } from './app.js'
import * as models from './models/index.js'
async function main() {
  try {
    //await sequelize.sync({ force: false })
    createApp({ models });

  } catch (error) {
    console.error('Unable to start the application: ', error);
  }
}
main()
