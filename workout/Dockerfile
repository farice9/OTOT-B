FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY index.js workout.js ./
COPY model/ model/
COPY test/ test/
EXPOSE 8000/tcp
CMD ["npm", "start"]