import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  private static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 6);
  }

  public static comparePassword(
    hashedPassword: string,
    password: string
  ): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  public static generateToken(userData: Partial<User>): string {
    return jwt.sign(userData, process.env.JWT_SECRET!, { expiresIn: "1d" });
  }

  public static create(
    { name, email, password }: CreateUserProps,
    isHashed: boolean,
    id?: string,
    createdAt?: Date
  ) {
    this.checkValues({ name, email, password });

    let hashPassword = password;

    if (!isHashed) {
      hashPassword = this.hashPassword(password);
    }

    return new User(
      {
        name,
        email,
        password: hashPassword,
        createdAt: createdAt ?? new Date(),
      },
      id
    );
  }
}
