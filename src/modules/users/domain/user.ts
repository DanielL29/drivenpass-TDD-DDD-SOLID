import { Entity } from "@core/domain/entity";
import { Check } from "@core/logic/check";
import { CustomError } from "@core/logic/error";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export type CreateUserProps = Omit<UserProps, "createdAt">;

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  private static checkValues({ name, email, password }: CreateUserProps) {
    const checkInputValues = [
      Check.notEmpty(name, "user[name]"),
      Check.notEmpty(email, "user[email]"),
      Check.notEmpty(password, "user[password]"),
      Check.isEmail(email, "user[email]"),
      Check.minimumLength(6, password, "user[password]"),
    ];

    const verifyCheckedValues = Check.checkAllValues(checkInputValues);

    if (!verifyCheckedValues.checked) {
      throw new CustomError("error_bad_request", verifyCheckedValues.message);
    }
  }

  public static create(
    { name, email, password }: CreateUserProps,
    id?: string,
    createdAt?: Date
  ) {
    this.checkValues({ name, email, password });

    return new User(
      {
        name,
        email,
        password,
        createdAt: createdAt || new Date(),
      },
      id
    );
  }
}
