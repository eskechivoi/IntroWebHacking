# Asegúrate de que npm esté instalado
npm install -g npm

# Instala y sirve el backend
Set-Location -Path .\backend
npm install
Start-Process -NoNewWindow npm 'start'

# Instala y sirve el frontend
Set-Location -Path ..\frontend
npm install
npm install -g serve
npm run build
serve -s dist -l 80

