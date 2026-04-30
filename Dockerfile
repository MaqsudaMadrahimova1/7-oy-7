FROM node:20-alpine
WORKDIR /app
# Mana shu yerda nuqta qo'yilganiga e'tibor bering
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]