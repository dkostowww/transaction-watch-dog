# transaction-watch-dog
Simple system that will monitor and watch all Ethereum transaction and will filter and store data based on predefined dynamic configuration. The system itself is being separated into two micro-services:
* Transactions
* Configurations

## How to run the project
* In order to run the transactions service:
1. EXECUTE in your terminal `cd transactions`
2. Copy .env.default file as .env in the same folder;
3. Adjust the values of the Environment variables in order to suite your project needs;
4. RUN `npm install`
5. RUN `sequelize db:create`
6. RUN `sequelize db:migrate`
7. RUN `npm run start`

* In order to run the configurations service:
1. EXECUTE in your terminal `cd configurations`
2. Copy .env.default file as .env in the same folder;
3. Adjust the values of the Environment variables in order to suite your project needs;
4. RUN `npm install`
5. RUN `sequelize db:create`
6. RUN `sequelize db:migrate`
7. RUN `npm run start`

NOTE: Make sure that you have a running instance of MySQL on your machine locally or in Docker container!

## API Documentation
Once you've started the application, you can check the API Docs: 
* At http://localhost:5000/api-documentation/ for Configurations API Docs;
* At http://localhost:5001/api-documentation/ for Transactions API Docs;