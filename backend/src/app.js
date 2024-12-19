const express = require('express');
const cors = require('cors');
const path = require('path');
const propuestaRoutes = require('./routes/propuestaRoutes'); 
const facturaRoutes = require('./routes/facturaRoutes');
const domicilioRoutes = require('./routes/domicilioRoutes');
const egresoRoutes = require('./routes/egresoRoutes');



const app = express();
app.use(express.static(path.join(__dirname ,  '../public/dist')));
app.use(express.json()); 
app.use(cors());
app.get('/', (require, reponse) => {reponse.sendFile (path.join(__dirname ,  '../public/dist'))}) 
// Usa las rutas de propuesta
app.use('/propuesta', propuestaRoutes);
app.use('/facturas', facturaRoutes);
app.use('/domicilios', domicilioRoutes);
app.use('/egresos', egresoRoutes);

module.exports={app}