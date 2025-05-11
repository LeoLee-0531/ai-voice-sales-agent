import type { CustomerController } from "@/v1/customer/adapter/in/customer-controller";
import { Router } from "express";
import { setupCustomerRouter } from "@/routes/v1/customer";

export const setupApiV1Router = (
  customerController: CustomerController
): Router => {
  const router: Router = Router();

  router.use("/customer", setupCustomerRouter(customerController));

  return router;
};
