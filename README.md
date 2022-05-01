# transaction-watch-dog
Simple system that will monitor and watch all Ethereum transaction and will filter and store data based on predefined dynamic configuration.

## How to run the project
1. Copy .env.default file as .env in the same folder.
2. Adjust the values of the Environment variables in order to suite your project needs.
3. RUN `npm install`
4. RUN `sequelize db:create`
5. RUN `sequelize db:migrate`
6. RUN `npm run start`

Note: Make sure that you have a running instance of MySQL on your machine locally or in Docker container!