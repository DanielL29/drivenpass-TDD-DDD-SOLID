import { Entity } from "@core/domain/entity";
import { Check } from "@core/logic/check";
import { CustomError } from "@core/logic/error";
import Cryptr from "cryptr";

export interface WifiProps {
  title: string;
  name: string;
  password: string;
  userId: string;
  createdAt: Date;
}

export type CreateWifiProps = Omit<WifiProps, "createdAt" | "userId">;

export class Wifi extends Entity<WifiProps> {
  private static cryptr = new Cryptr(`${process.env.CRYPTR_SECRET}`);

  constructor(props: WifiProps, id?: string) {
    super(props, id);
  }

  public get title(): string {
    return this.props.title;
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

  private static checkValues({ title, name, password }: CreateWifiProps) {
    const checkInputValues = [
      Check.notEmpty(title, "wifi[title]"),
      Check.notEmpty(name, "wifi[name]"),
      Check.notEmpty(password, "wifi[password]"),
      Check.minimumLength(6, password, "wifi[password]"),
    ];

    const verifyCheckedValues = Check.checkAllValues(checkInputValues);

    if (!verifyCheckedValues.checked) {
      throw new CustomError("error_bad_request", verifyCheckedValues.message);
    }
  }

  private static encryptPassword(password: string): string {
    return Wifi.cryptr.encrypt(password);
  }

  public decryptPassword(): string {
    return Wifi.cryptr.decrypt(this.props.password);
  }

  public static create(
    { title, name, password }: CreateWifiProps,
    userId: string,
    isEncrypted: boolean = false,
    id?: string,
    createdAt?: Date
  ) {
    this.checkValues({ title, name, password });

    let encryptedPassword = password;

    if (!isEncrypted) {
      encryptedPassword = this.encryptPassword(password);
    }

    return new Wifi(
      {
        title,
        name,
        password: encryptedPassword,
        userId,
        createdAt: createdAt ?? new Date(),
      },
      id
    );
  }
}
