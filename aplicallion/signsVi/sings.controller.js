const {getAll} = require ("./sings.service")

module.exports = {
    showAll: (req, res) => {
        getAll((err, results) => {
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
}