const { create, getAdminById,getAdminByAdminName, getAdmin, deleteAdmin} = require("./admin.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

    createAdmin: (req, res) => {
        const body = req.body;
        console.log("Body:", body);
        const saltRounds = Number(process.env.SALT_ROUNDS || 10);
        const salt = genSaltSync(saltRounds); 
        console.log("Salt:", salt);
        body.contraseña = hashSync(body.contraseña, salt); 
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Error en la conexión de la BD",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },


      login: (req, res) => {
        const body = req.body;
        getAdminByAdminName(body.nombre, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Error en la conexión de la BD",
            });
          }
          if (!results) {
            return res.status(401).json({
              success: 0,
              message: "Nombre de administrador incorrecto",
            });
          }
          const result = compareSync(body.contraseña, results.contraseña);
          if (result) {
            results.contraseña = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h",
            });
            return res.status(200).json({
              success: 1,
              message: "Inicio de sesión exitoso",
              token: jsontoken,
            });
          } else {
            return res.status(401).json({
              success: 0,
              message: "Contraseña incorrecta",
            });
          }
        });
      }
      ,


  getAdminId: (req, res) => {
    const id = req.params.id;
    getAdminById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "no encontrado",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },



  getAll: (req, res) => {
    getAdmin((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },


  deleteAdmin: (req, res) => {
    const data = req.body;
    deleteAdmin(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "no encontrado",
        });
      }
      return res.json({
        success: 1,
        message: "user borrado exitosamente",
      });
    });
  },
};
