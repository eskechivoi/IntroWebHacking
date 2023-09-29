# Make sure npm is installed
sudo apt install npm

# Install and serve backend
cd ./backend
npm install
npm start &

# Install and serve frontend
cd ../frontend
npm install
sudo npm install -g serve
npm run build
sudo serve -s dist -l 80
