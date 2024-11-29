FROM node:16-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Instala wget e dockerize usando apk
RUN apk add --no-cache wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/v0.8.0/dockerize-linux-amd64-v0.8.0.tar.gz | tar xzf - -C /usr/local/bin

# Inicializa o projeto Node.js e instala dependências
RUN npm init -y
RUN npm install express mysql

# Copia os arquivos do projeto para o container
COPY . .

# Copia o script wait-for-it.sh para o binário local
COPY wait-for-it.sh /usr/local/bin/wait-for-it

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "index.js" ]
