# 1. Node.js muhitini tanlaymiz
FROM node:20-alpine

# 2. Ishchi papkani belgilaymiz
WORKDIR /app

# 3. Paketlar ro'yxatini nusxalaymiz
COPY package*.json ./

# 4. Kerakli kutubxonalarni o'rnatamiz
RUN npm install

# 5. Loyihaning barcha fayllarini nusxalaymiz
COPY . .

# 6. NestJS loyihasini build qilamiz
RUN npm run build

# 7. Botni ishga tushirish buyrug'i
CMD ["npm", "run", "start:prod"]