const { query } = require("express");
const pool = require("../../db/database");

module.exports ={
    
    getAll: (callBack) => {
        pool.query(`select * from signos_vitales`, [], (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        });
      }

}