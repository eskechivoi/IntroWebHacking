import express from 'express';
import path from 'path';

const app = express();

// Sirve los archivos estáticos de la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(80, () => {
  console.log('El servidor está corriendo en el puerto 80');
});
