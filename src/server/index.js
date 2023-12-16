const path = require('path');

const express = require("express");

const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 3001;

const app = express();

const pool = mysql.createPool({
  host: 'localhost:8080',
  user: '',
  password: '',
  database: 'dbdescuentos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());

app.get('/api-descuentos', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM Descuentos');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });

  app.get('/api-descuentos/:id', async (req, res) => {
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
  });
  
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
  });

app.post('/api-descuento', async (req, res) => {
    const nuevoDescuento = new Descuento(req.body);
    await nuevoDescuento.save();
    res.json(nuevoDescuento);
  });

const aplicarDescuentos = async (productosEnCarrito, importeTotalCompra) => {

  const descuentos = await Descuento.find();
  
  descuentos.forEach(descuento => {
    const lineasProductosAplicables = descuento.lineasProductosAplicables;
    const sublineasProductosAplicables = descuento.sublineasProductosAplicables;
    const importeMinimoCompra = descuento.importeMinimoCompra;
    const porcentajeDescuento = descuento.porcentajeDescuentoImporte;
    
    productosEnCarrito.forEach(producto => {
      if (lineasProductosAplicables && lineasProductosAplicables.includes(producto.linea)) {

        if (importeTotalCompra >= importeMinimoCompra) {

          const descuentoAplicado = (porcentajeDescuento / 100) * importeTotalCompra;
    
          const importeFinalConDescuento = importeTotalCompra - descuentoAplicado;
    
        }else{

        }
        
      }if(sublineasProductosAplicables && sublineasProductosAplicables.includes(producto.sublinea)) {

          if (importeTotalCompra >= importeMinimoCompra) {

              const descuentoAplicado = (porcentajeDescuento / 100) * importeTotalCompra;
        
              const importeFinalConDescuento = importeTotalCompra - descuentoAplicado;
        
          }
      }else{}



    });

    
  });
};

app.use(express.static(path.resolve(__dirname, '../cliente-tienda/build')));
  
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../cliente-tienda/build', 'index.html'));
  });