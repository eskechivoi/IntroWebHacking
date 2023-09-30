import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const app = express();

// Obtiene la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sirve los archivos estáticos de la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

// Redirige todas las rutas al index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(80, () => {
  console.log('El servidor está corriendo en el puerto 80');
});