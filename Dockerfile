# Dockerfile

# 1) Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas package.json e lockfile para otimizar cache de dependências
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm install

# Copia o restante do código e gera o build
COPY . .
RUN npm run build

# 2) Production stage
FROM node:18-alpine

WORKDIR /app

# Define variáveis de ambiente para produção e para o Nuxt escutar em 0.0.0.0
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0

# Copia apenas o necessário do builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output

# Expõe a porta padrão do Nuxt
EXPOSE 3000

# Inicia o servidor de preview (produzirá um servidor HTTP baseado em output)
CMD ["npm", "run", "preview"]