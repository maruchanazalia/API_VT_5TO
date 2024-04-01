const { create, getUserByUserId,getUserByUserUsername, getUsers, deleteUser} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

  createUser: (req, res) => {
    const body = req.body;
    const saltRounds = Number(process.env.SALT_ROUNDS || 10);
    const salt = genSaltSync(saltRounds); 
    body.password = hashSync(body.password, salt); 
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
    getUserByUserUsername(body.username, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "username o contra incorrecta",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login Exitoso",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "user o contra incorrecta",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
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
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
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
