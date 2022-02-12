FROM node:16.6.1-alpine3.14
#RUN addgroup app && adduser -S -G app app app
#RUN mkdir app && chown app:app /app
#USER app 
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
CMD ["npm","run","dev"]