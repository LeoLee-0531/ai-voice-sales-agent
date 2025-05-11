import type { components } from "./swagger";

export type CustomerId = components["parameters"]["CustomerId"];

export type CustomerParameters = {
  customerId: CustomerId;
};

export type CustomerDto = components["schemas"]["CustomerDto"];
