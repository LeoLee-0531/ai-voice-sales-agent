import type { Request, Response } from "express";
import type { ICustomerUseCase } from "@/v1/customer/service/port/in/i-customer-use-case";
import type { CustomerParameters } from "@/routes/dto/customer";
import { createSuccessResponse } from "@/routes/dto/response";
import { StatusCodes } from "http-status-codes";

export class CustomerController {
  constructor(private customerUseCase: ICustomerUseCase) {}

  /**
   * @swagger
   * /v1/customer/{customerId}:
   *   get:
   *     tags:
   *      - Customer
   *     summary: Get customer by ID
   *     parameters:
   *      - $ref: '#/components/parameters/CustomerId'
   *     responses:
   *       200:
   *         description: Customer retrieved successfully
   *       404:
   *         description: Customer not found
   */

  getCustomerById = async (req: Request<CustomerParameters>, res: Response) => {
    const { customerId } = req.params;

    const customerIdNumber = Number.parseInt(
      customerId as unknown as string,
      10
    );

    const customer = await this.customerUseCase.getCustomerById(
      customerIdNumber
    );

    res.status(StatusCodes.OK).json(createSuccessResponse(customer));
  };
}
