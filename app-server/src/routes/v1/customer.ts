import { handleExpressHandlerError } from "@/routes/middleware/error-handler";
import type { CustomerController } from "@/v1/customer/adapter/in/customer-controller";
import { Router } from "express";

export const setupCustomerRouter = (customerController: CustomerController) => {
  const router: Router = Router();

  router.get(
    "/:customerId",
    handleExpressHandlerError(customerController.getCustomerById)
  );

  return router;
};
