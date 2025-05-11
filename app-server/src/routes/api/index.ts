import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";
import { CustomerParameters, CustomerSchemas } from "./schema/customer";
import { ErrorSchemas } from "./schema/error";
import { HealthcheckSchemas } from "./schema/healthcheck";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AWS Hackathon API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "/api",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        ...CustomerParameters,
      },
      schemas: {
        ...HealthcheckSchemas,
        ...ErrorSchemas,
        ...CustomerSchemas,
      },
    },
  },
  apis: ["./src/routes*.ts", "./src/index.ts", "./src/**/adapter/in/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerFile = path.join(__dirname, "../dto/swagger.json");

export { swaggerSpec, swaggerFile };
