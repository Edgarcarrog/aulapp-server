
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const conectarDB = require("./config/db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/group");
const studentRoutes = require("./routes/student");
const subjectRoutes = require("./routes/subject");

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//middlewares
app.use(cors());
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/subject", subjectRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
