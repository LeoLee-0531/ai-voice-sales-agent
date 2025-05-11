import prisma from "@/infra/db/prisma";
import type {
  Customer as PrismaCustomer,
  CustomerAttribute as PrismaCustomerAttribute,
} from "@/infra/db/prisma/generated/client";

import type { ICustomerRepository } from "@/v1/customer/service/port/out/i-customer-repository";
import { Customer } from "@/v1/customer/domain/customer";

type PrismaCustomerWithAttributes = PrismaCustomer & {
  attributes: PrismaCustomerAttribute[];
};

export class MysqlCustomerRepository implements ICustomerRepository {
  async getCustomerById(id: number): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: { attributes: true },
    });

    if (!customer) {
      return null;
    }

    return this.mapToDomain(customer);
  }

  private mapToDomain(customer: PrismaCustomerWithAttributes): Customer {
    return new Customer(customer.id, {
      attributes: customer.attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.attribute,
        value: attribute.value,
      })),
    });
  }
}
