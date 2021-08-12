echo Start Installing Depdencies

echo Installing file server deps
cd ./file-server
yarn

echo Installing backend deps
cd ../backend
yarn

echo Installing frontend deps
cd ../frontend
yarn
