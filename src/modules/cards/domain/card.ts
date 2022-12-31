import { Entity } from "@core/domain/entity";
import { Check } from "@core/logic/check";
import { CustomError } from "@core/logic/error";
import Cryptr from "cryptr";

export type CardTypes = "CREDIT" | "DEBIT" | "BOTH";

export interface CardProps {
  title: string;
  number: string;
  name: string;
  securityCode: string;
  expirationDate: string;
  password: string;
  isVirtual: boolean;
  type: CardTypes;
  userId: string;
  createdAt: Date;
}

export type CreateCardProps = Omit<CardProps, "createdAt" | "userId">;

interface CardDecrypt {
  password: string;
  securityCode: string;
}

export class Card extends Entity<CardProps> {
  private static cryptr = new Cryptr(`${process.env.CRYPTR_SECRET}`);

  constructor(card: CardProps, id?: string) {
    super(card, id);
  }

  public get title(): string {
    return this.props.title;
  }

  public get number(): string {
    return this.props.number;
  }

  public get name(): string {
    return this.props.name;
  }

  public get securityCode(): string {
    return this.props.securityCode;
  }

  public get expirationDate(): string {
    return this.props.expirationDate;
  }

  public get password(): string {
    return this.props.password;
  }

  public get isVirtual(): boolean {
    return this.props.isVirtual;
  }

  public get type(): CardTypes {
    return this.props.type;
  }

  public get userId(): string {
    return this.props.userId;
  }

  private static checkValues({
    title,
    number,
    name,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    type,
  }: CreateCardProps) {
    const checkInputValues = [
      Check.notEmpty(title, "card[title]"),
      Check.notEmpty(number, "card[number]"),
      Check.notEmpty(name, "card[name]"),
      Check.notEmpty(securityCode, "card[securityCode]"),
      Check.notEmpty(expirationDate, "card[expirationDate]"),
      Check.notEmpty(password, "card[password]"),
      Check.notEmpty(type, "card[type]"),
      Check.isBoolean(isVirtual, "card[isVirtual]"),
      Check.isNumber(password, "card[password]"),
      Check.minimumLength(4, password, "card[password]"),
      Check.maximumLength(6, password, "card[password]"),
      Check.isNumber(number, "card[number]"),
      Check.minimumLength(16, number, "card[number]"),
      Check.maximumLength(16, number, "card[number]"),
      Check.isNumber(securityCode, "card[securityCode]"),
      Check.minimumLength(3, securityCode, "card[securityCode]"),
      Check.maximumLength(3, securityCode, "card[securityCode]"),
      Check.validateDateFormat(expirationDate, "card[expirationDate]"),
      Check.verifyDateRange(expirationDate, "card[expirationDate]"),
      Check.validateCardType(type, "card[type]"),
    ];
    const verifyCheckedValues = Check.checkAllValues(checkInputValues);

    if (!verifyCheckedValues.checked) {
      throw new CustomError("error_bad_request", verifyCheckedValues.message);
    }
  }

  private static encrypt(value: string): string {
    return Card.cryptr.encrypt(value);
  }

  public decrypt(value: string): string {
    return Card.cryptr.decrypt(this.props[value as keyof CardDecrypt]);
  }

  public static create(
    {
      title,
      number,
      name,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      type,
    }: CreateCardProps,
    userId: string,
    isEncrypted: boolean = false,
    id?: string,
    createdAt?: Date
  ) {
    this.checkValues({
      title,
      number,
      name,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      type,
    });

    let encryptedPassword = password;
    let encryptedSecurityCode = securityCode;

    if (!isEncrypted) {
      encryptedPassword = this.encrypt(password);
      encryptedSecurityCode = this.encrypt(securityCode);
    }

    return new Card(
      {
        title,
        number,
        name,
        securityCode: encryptedSecurityCode,
        expirationDate,
        password: encryptedPassword,
        isVirtual,
        type,
        userId,
        createdAt: createdAt ?? new Date(),
      },
      id
    );
  }
}
