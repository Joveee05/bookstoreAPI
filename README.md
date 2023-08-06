## BookStore-Backend-REST-API-NestJS-Prisma

A simple backend REST API for a BookStore built using NestJS, Prisma, RabbitMQ, Docker, PostgreSQL and Swagger.

### Installation

1. Install dependencies: `npm install`
2. Start a PostgreSQL database & RabbitMQ with docker using: `docker-compose up -d`.
   - If you have a local instance of PostgreSQL running, you can skip this step. In this case, you will need to change the `DATABASE_URL` inside the `.env` file with a valid [PostgreSQL connection string](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-details) for your database.
3. Apply database migrations: `npx prisma migrate dev`
4. Start the project: `npm run start:dev`
5. Access the project swagger documentation at http://localhost:3000/api
