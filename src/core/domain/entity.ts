import { faker } from "@faker-js/faker";

export abstract class Entity<Props> {
  public readonly props: Props;
  public readonly _id: string;

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id || faker.datatype.uuid();
  }
}
