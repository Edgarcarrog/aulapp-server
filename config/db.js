require("dotenv").config();

const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
