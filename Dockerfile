#Используем образ линукс Alpine с версией node 14
FROM node:19.5.0-alpine

#Указываем нашу рабочую дирректорию
WORKDIR /app

#Скопировать package.json и package-lock.json внутрь контейнера
COPY package*.json ./

#Устанавливаем зависимости
RUN npm install

#Копируем все остальное приложение
COPY . .

#Установить prisma
RUN npm install -g prisma

#Генерируем PrismaClient
RUN prisma generate

#Копируем prisma schema
COPY prisma/schema.prisma ./prisma/

#Открыть порт в нашем контейнере
EXPOSE 3000

#Запускаем сервер
CMD ["npm", "start"]