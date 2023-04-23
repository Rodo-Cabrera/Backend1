const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CLOUD_URL);
    console.log('Conexión existosa');
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
