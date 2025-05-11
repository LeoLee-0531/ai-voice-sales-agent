import type { ICustomerUseCase } from "@/v1/customer/service/port/in/i-customer-use-case";
import type { ICustomerRepository } from "@/v1/customer/service/port/out/i-customer-repository";

import type { Customer } from "@/v1/customer/domain/customer";
import { CustomerDto } from "@/routes/api/schema/customer";
import type { CustomerDto as CustomerDtoType } from "@/routes/dto/customer";
import { NotFoundError } from "@/routes/dto/response";

export class CustomerService implements ICustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async getCustomerById(id: number): Promise<CustomerDtoType | null> {
    const customer = await this.customerRepository.getCustomerById(id);

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id} not found`);
    }

    return this.mapToCustomerDto(customer);
  }

  private mapToCustomerDto(customer: Customer): CustomerDtoType {
    const dto = {
      id: customer.id,
      attributes: customer.props.attributes,
    };

    return CustomerDto.parse(dto);
  }
}
