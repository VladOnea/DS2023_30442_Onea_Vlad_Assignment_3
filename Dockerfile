FROM node:20.9.0

RUN mkdir -p /EnergyManagementFrontEnd/node_modules && chown -R node:node /EnergyManagementFrontEnd/node_modules

WORKDIR /EnergyManagementFrontEnd
COPY package*.json ./
COPY . .

RUN npm install -g npm@10.2.4
RUN npm run build

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
