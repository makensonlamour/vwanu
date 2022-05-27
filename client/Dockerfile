FROM node:14.16.0-alpine3.13
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
RUN mkdir appdata 
COPY package.json .
RUN npm install
COPY . . 
ENV REACT_APP_API_URL=http://localhost:4000
EXPOSE 3000
CMD ["npm", "start"] 