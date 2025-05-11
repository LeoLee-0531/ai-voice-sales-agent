import assert from "node:assert";

export type CustomerProps = {
  attributes: CustomerAttributes[];
};

export type CustomerAttributes = {
  id: number;
  name: string;
  value: string;
};

export class Customer {
  public id: number | null;
  public props: CustomerProps;

  constructor(id: number | null, props: CustomerProps) {
    this.id = id;
    this.props = props;

    assert(this.props.attributes, "Attributes are required");
  }
}
