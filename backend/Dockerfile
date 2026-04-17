FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files để install dependencies trước (tối ưu cache)
COPY package*.json ./
RUN npm install

# Copy toàn bộ code và build
COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

# Chỉ copy những thứ cần thiết từ stage builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]