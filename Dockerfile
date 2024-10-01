FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g pnpm


RUN pnpm install

COPY . .


RUN pnpm build

EXPOSE 3000
# ENV PORT=8080
CMD ["pnpm", "run", "start"]


