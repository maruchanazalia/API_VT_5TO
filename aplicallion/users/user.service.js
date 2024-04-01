const pool = require("../../db/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [data.username, data.password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
},


  getUsers: (callBack) => {
    pool.query(`select * from users`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  getUserByUserUsername: (email, callBack) => {
    pool.query(
      `select * from users where username=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByUserId: (id, callBack) => {
    pool.query(
      `select ID,username,password from users where ID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where ID=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
