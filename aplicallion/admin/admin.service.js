const pool = require("../../db/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO administradores (nombre, contraseña) VALUES (?, ?)`,
      [data.nombre, data.contraseña],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
},


  getAdmin: (callBack) => {
    pool.query(`select * from administradores`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  getAdminByAdminName: (nombre, callBack) => {
    pool.query(
      `select * from administradores where nombre=?`,
      [nombre],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getAdminById: (ID, callBack) => {
    pool.query(
      `select ID,nombre,contraseña from administradores where ID=?`,
      [ID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteAdmin: (data, callBack) => {
    pool.query(
      `delete from administradores where ID=?`,
      [data.ID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
