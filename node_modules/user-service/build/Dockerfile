from node:17.0.0

WORKDIR /usr/app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

COPY libs libs
COPY applications/user-service applications/user-service

RUN npm run install-all
RUN npm run build-all

CMD ["node", "/usr/app/applications/user-service"]