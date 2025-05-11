import type { Customer } from "@/v1/customer/domain/customer";

export interface ICustomerRepository {
  getCustomerById(id: number): Promise<Customer | null>;
}
