import type { CustomerDto as CustomerDtoType } from "@/routes/dto/customer";

export interface ICustomerUseCase {
  getCustomerById(id: number): Promise<CustomerDtoType | null>;
}
