import { setupExpressServer } from "@/routes";
import { MysqlCustomerRepository } from "@/v1/customer/adapter/out/mysql-customer-repository";
import { CustomerService } from "@/v1/customer/service/customer-service";
import { CustomerController } from "@/v1/customer/adapter/in/customer-controller";
import type { Express } from "express";

const PORT = 6882;

const customerRepository = new MysqlCustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

const app: Express = setupExpressServer(customerController);

export const server = app.listen(PORT);

console.log(`Server running on port ${PORT}`);
console.log(`http://localhost:${PORT}/api/v1`);
console.log(`http://localhost:${PORT}/api-docs`);

export default server;
