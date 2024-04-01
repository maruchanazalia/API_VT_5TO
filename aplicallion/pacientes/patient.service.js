const { query } = require("express");
const pool = require("../../db/database");

module.exports ={

    createPaciente: (data, callBack) => {
        const { nombre,apeMaterno, apePaterno,  fecha_nacimiento,sexo,idUser, ciudad, direccion, celular, telFijo } = data;
        const edad = calcularEdad(fecha_nacimiento); 
        pool.query(
            `INSERT INTO pacientes (nombre,apeMaterno, apePaterno,  fecha_nacimiento,edad,sexo,idUser, ciudad, direccion, celular, telFijo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre,apeMaterno, apePaterno,  fecha_nacimiento,edad,sexo,idUser, ciudad, direccion, celular, telFijo],
            (error, results, fields) => {
              if (error) {
                callBack(error);
                return;
              }
              callBack(null, results);
            }
          );
    },

    getPacientes: (callBack) => {
        pool.query(`select * from pacientes`, [], (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        });
      },

    getPatientByName: (nombre, callBack) => {
        pool.query(`select * from pacientes where nombre=?`, [nombre], (error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

      deletePatient: (data, callBack) => {
        pool.query(
          `delete from pacientes where ID=?`,
          [data.ID],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

      updatePatient: (data, callBack) => {
        const { ID, nombre, apeMaterno, apePaterno, fecha_nacimiento, sexo, ciudad, direccion, celular, telFijo } = data;
        const edad = calcularEdad(fecha_nacimiento); 
        pool.query(
          `UPDATE pacientes SET nombre=?, apeMaterno=?, apePaterno=?, fecha_nacimiento=?, edad=?, sexo=?, ciudad=?, direccion=?, celular=?, telFijo=? WHERE ID=?`,
          [nombre, apeMaterno, apePaterno, fecha_nacimiento, edad, sexo, ciudad, direccion, celular, telFijo, ID],
          (error, results, fields) => {
            if (error) {
              callBack(error);
              return;
            }
            callBack(null, results);
          }
        );
    }
     
    

}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}
