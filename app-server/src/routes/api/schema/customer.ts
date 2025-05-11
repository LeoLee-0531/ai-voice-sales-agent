import { z } from "zod";
export const CustomerParameters = {
  CustomerId: {
    name: "customerId",
    required: true,
    in: "path",
    description: "Customer ID",
    schema: {
      type: "integer",
      example: "1",
    },
  },
};

export const CustomerSchemas = {
  CustomerDto: {
    type: "object",
    required: ["id", "attributes"],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      attributes: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "name", "value"],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Customer Name",
            },
            value: {
              type: "string",
              example: "Customer Value",
            },
          },
        },
        example: [
          {
            id: 1,
            name: "Customer Name",
            value: "Customer Value",
          },
        ],
      },
    },
  },
};

export const CustomerDto = z.object({
  id: z.number(),
  attributes: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      value: z.string(),
    })
  ),
});
