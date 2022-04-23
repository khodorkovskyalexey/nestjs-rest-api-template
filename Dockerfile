FROM node:14-alpine3.12 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:14-alpine3.12 AS runner
WORKDIR /app
COPY --from=builder /app ./
RUN apk add bash
ENTRYPOINT ["sh", "-c"]
EXPOSE 80
CMD ["node -r ./tsconfig-paths-bootstrap.js dist/main.js"]