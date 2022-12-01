import { Entity } from "@core/domain/entity";
import { Check } from "@core/logic/check";
import { CustomError } from "@core/logic/error";
import Cryptr from "cryptr";

export interface CredentialProps {
  title: string;
  url: string;
  name: string;
  password: string;
  userId: string;
  createdAt: Date;
}

export type CreateCredentialProps = Omit<
  CredentialProps,
  "userId" | "createdAt"
>;

export class Credential extends Entity<CredentialProps> {
  private static cryptr = new Cryptr(`${process.env.CRYPTR_SECRET}`);

  constructor(props: CredentialProps, id?: string) {
    super(props, id);
  }

  public get title(): string {
    return this.props.title;
  }

  public get url(): string {
    return this.props.url;
  }

  public get name(): string {
    return this.props.name;
  }

  public get password(): string {
    return this.props.password;
  }

  public get userId(): string {
    return this.props.userId;
  }

  private static checkValues({
    title,
    url,
    name,
    password,
  }: CreateCredentialProps) {
    const checkInputValues = [
      Check.notEmpty(title, "credential[title]"),
      Check.notEmpty(url, "credential[url]"),
      Check.notEmpty(name, "credential[name]"),
      Check.notEmpty(password, "credential[password]"),
      Check.isUrl(url, "credential[url]"),
      Check.minimumLength(6, password, "credential[password]"),
    ];

    const verifyCheckedValues = Check.checkAllValues(checkInputValues);

    if (!verifyCheckedValues.checked) {
      throw new CustomError("error_bad_request", verifyCheckedValues.message);
    }
  }

  private static encryptPassword(password: string): string {
    return Credential.cryptr.encrypt(password);
  }

  public decryptPassword(): string {
    return Credential.cryptr.decrypt(this.props.password);
  }

  public static create(
    { title, url, name, password }: CreateCredentialProps,
    userId: string,
    isEncrypted: boolean = false,
    id?: string,
    createdAt?: Date
  ) {
    this.checkValues({ title, url, name, password });

    let encryptedPassword = password;

    if (!isEncrypted) {
      encryptedPassword = this.encryptPassword(password);
    }

    return new Credential(
      {
        title,
        url,
        name,
        password: encryptedPassword,
        userId,
        createdAt: createdAt ?? new Date(),
      },
      id
    );
  }
}
