import { swaggerFile, swaggerSpec } from "@/routes/api/index";
import { errorHandler } from "@/routes/middleware/error-handler";
import { setupApiV1Router } from "@/routes/v1";
import type { CustomerController } from "@/v1/customer/adapter/in/customer-controller";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";

export const setupExpressServer = (authController: CustomerController) => {
  const app = express();

  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerFile,
      validateRequests: true,
    })
  );
  app.use("/api/v1", setupApiV1Router(authController));
  app.use(errorHandler.handleError);

  return app;
};
