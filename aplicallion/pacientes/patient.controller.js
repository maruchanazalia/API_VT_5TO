const {createPaciente, getPacientes, getPatientByName, deletePatient, updatePatient} = require ("../pacientes/patient.service");

module.exports = {

    create: (req, res) => {
        const body = req.body;
        const userId = req.userId;
    
        createPaciente(body,userId, (err, results) => {
            if (err) {
                console.error(err);
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

    showPatients: (req, res) => {
        getPacientes((err, results) => {
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

    getByName: (req, res) => {
        const nombrePaciente = req.params.nombrePaciente;
    
        getPatientByName(nombrePaciente, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Error en la conexión de la BD",
                });
            }
            if (results) {
                return res.status(404).json({
                    success: 0,
                    message: "Paciente no encontrado",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Paciente encontrado",
            });
        });
    },

    deletePacient: (req, res) => {
        const data = req.body;
        deletePatient(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (results) {
            return res.json({
              success: 0,
              message: "no encontrado",
            });
          }
          return res.json({
            success: 1,
            message: "paciente borrado exitosamente",
          });
        });
      },

      update: (req, res) => {
        const data = req.body;
        updatePatient(data, (err, results) => {
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
            message: "paciente actualizado exitosamente",
          });
        });
      },
    
}