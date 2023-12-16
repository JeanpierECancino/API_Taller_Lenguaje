const pool = require('../dbdescuentos'); 

exports.obtenerDescuentos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Descuentos');
      const descuentosConDetalle = await Promise.all(rows.map(async (descuento) => {
        const bonificacionesEscalas = await pool.query('SELECT * FROM BonificacionesEscalas WHERE descuento_id = ?', [descuento.descuento_id]);
        const promocionesCombinadas = await pool.query('SELECT * FROM PromocionesCombinadas WHERE descuento_id = ?', [descuento.descuento_id]);
  
        return {
          ...descuento,
          bonificacionesEscalas: bonificacionesEscalas[0],
          promocionesCombinadas: promocionesCombinadas[0], 
        };
      }));
  
      res.json(descuentosConDetalle);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
};

exports.obtenerDescuentoPorId = async (req, res) => {
  const descuentoId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM Descuentos WHERE descuento_id = ?', [descuentoId]);
    if (rows.length === 0) {
      res.status(404).send('Descuento no encontrado');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};