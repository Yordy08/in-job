const express = require('express');
const cors = require('cors');
const propuestaRoutes = require('./routes/propuestaRoutes'); 
const facturaRoutes = require('./routes/facturaRoutes');
const domicilioRoutes = require('./routes/domicilioRoutes');



const app = express();

app.use(express.json()); 
app.use(cors());

// Usa las rutas de propuesta
app.use('/propuesta', propuestaRoutes);
app.use('/facturas', facturaRoutes);
app.use('/domicilios', domicilioRoutes);

module.exports={app}