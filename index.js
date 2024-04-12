require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const app = express();
const userRouter = require("./aplicallion/users/user.router");
const patientRouter = require("./aplicallion/pacientes/patient.router");
const adminRouter = require("./aplicallion/admin/admin.router");
const singsRouter = require("./aplicallion/signsVi/sings.router");


app.use(express.json());
app.use(cors());


app.use("/api/users", userRouter);
app.use("/api/pacientes", patientRouter);
app.use("/api/admin", adminRouter);
app.use("/api/sings", singsRouter);


app.listen(process.env.APP_PORT, () => {
  console.log("VT en mi cuarto corriendo en el puerto:", process.env.APP_PORT);
});
