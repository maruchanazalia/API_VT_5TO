const { query } = require("express");
const pool = require("../../db/database");

module.exports ={
    
    getAll: (callBack) => {
        pool.query(`SELECT * FROM signos_vitales`, [], (error, results, fields) => {
          if (error) {
            callBack(error);
          } else {
            callBack(null, results);
          }
        });
      }

}
