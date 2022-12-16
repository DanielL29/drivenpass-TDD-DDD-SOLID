import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Card, CreateCardProps } from "./card";

type FakeCardProps = Omit<CreateCardProps, "type" | "isVirtual"> & {
  type: string;
  isVirtual: any;
};

function createFakeCard({
  title,
  number,
  name,
  securityCode,
  expirationDate,
  password,
  type,
  isVirtual,
}: FakeCardProps): FakeCardProps {
  const isEmpty = (value: string) => (value === "" ? true : false);

  return {
    title: isEmpty(title!) ? "" : title || faker.lorem.word(5),
    number: isEmpty(number!)
      ? ""
      : number || faker.finance.creditCardNumber("################"),
    name: isEmpty(name!) ? "" : name || faker.lorem.word(5),
    securityCode: isEmpty(securityCode!)
      ? ""
      : securityCode || faker.finance.creditCardCVV(),
    expirationDate: isEmpty(expirationDate!)
      ? ""
      : expirationDate || dayjs().format("MM/YY"),
    password: isEmpty(password!) ? "" : password || faker.random.numeric(4),
    isVirtual: isVirtual ?? false,
    type: isEmpty(type!) ? "" : type || "CREDIT",
  };
}

describe("card entity", () => {
  it("should create a card entity", async () => {
    const createCardProps = createFakeCard({} as FakeCardProps);
    const userId = faker.datatype.uuid();

    const card = Card.create(createCardProps as CreateCardProps, userId);

    expect(card).toHaveProperty("_id");
    expect(card.props).toHaveProperty("createdAt");
    expect(card.title).toEqual(createCardProps.title);
    expect(card.number).toEqual(createCardProps.number);
    expect(card.decrypt("securityCode")).toEqual(createCardProps.securityCode);
    expect(card.expirationDate).toEqual(createCardProps.expirationDate);
    expect(card.decrypt("password")).toEqual(createCardProps.password);
    expect(card.isVirtual).toEqual(createCardProps.isVirtual);
    expect(card.type).toEqual(createCardProps.type);
  });

  it("should throw an error if card[title] is empty", async () => {
    const createCardProps = createFakeCard({ title: "" } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[title] cannot be empty");
  });

  it("should throw an error if card[number] is empty", async () => {
    const createCardProps = createFakeCard({ number: "" } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[number] cannot be empty");
  });

  it("should throw an error if card[name] is empty", async () => {
    const createCardProps = createFakeCard({ name: "" } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[name] cannot be empty");
  });

  it("should throw an error if card[securityCode] is empty", async () => {
    const createCardProps = createFakeCard({
      securityCode: "",
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[securityCode] cannot be empty");
  });

  it("should throw an error if card[expirationDate] is empty", async () => {
    const createCardProps = createFakeCard({
      expirationDate: "",
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[expirationDate] cannot be empty");
  });

  it("should throw an error if card[password] is empty", async () => {
    const createCardProps = createFakeCard({ password: "" } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps as CreateCardProps, userId)
    ).toThrow("card[password] cannot be empty");
  });

  it("should throw an error if card[type] is empty", async () => {
    const createCardProps = createFakeCard({ type: "" } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[type] cannot be empty");
  });

  it("should throw an error if card[password] is not a string of numbers", async () => {
    const createCardProps = createFakeCard({
      password: faker.lorem.word(3),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[password] must have only numbers");
  });

  it("should throw an error if card[password] is less than 4 characters length", async () => {
    const createCardProps = createFakeCard({
      password: faker.random.numeric(3),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[password] must have at least 4 characters length");
  });

  it("should throw an error if card[password] is more than 6 characters length", async () => {
    const createCardProps = createFakeCard({
      password: faker.random.numeric(7),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[password] must have at most 6 characters length");
  });

  it("should throw an error if card[number] is not a string of numbers", async () => {
    const createCardProps = createFakeCard({
      number: faker.lorem.word(5),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[number] must have only numbers");
  });

  it("should throw an error if card[number] is less than 16 characters length", async () => {
    const createCardProps = createFakeCard({
      number: faker.random.numeric(5),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[number] must have at least 16 characters length");
  });

  it("should throw an error if card[number] is more than 16 characters length", async () => {
    const createCardProps = createFakeCard({
      number: faker.random.numeric(17),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[number] must have at most 16 characters length");
  });

  it("should throw an error if card[securityCode] is not a string of numbers", async () => {
    const createCardProps = createFakeCard({
      securityCode: faker.lorem.word(5),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[securityCode] must have only numbers");
  });

  it("should throw an error if card[securityCode] is less than 3 characters length", async () => {
    const createCardProps = createFakeCard({
      securityCode: faker.random.numeric(2),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[securityCode] must have at least 3 characters length");
  });

  it("should throw an error if card[expirationDate] does not have format MM/YY", async () => {
    const createCardProps = createFakeCard({
      expirationDate: faker.lorem.word(5),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[expirationDate] must have format: MM/YY");
  });

  it("should throw an error if card[expirationDate] have month greater than 12", async () => {
    const createCardProps = createFakeCard({
      expirationDate: "13/22",
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow("card[expirationDate] must be a valid month between 01-12");
  });

  it("should throw an error if card[expirationDate] have year less than current year", async () => {
    const createCardProps = createFakeCard({
      expirationDate: "07/10",
    } as FakeCardProps);
    const userId = faker.datatype.uuid();
    const currentYear = new Date().getFullYear();
    const formattedYear = Number(currentYear.toString().slice(2, 4));

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow(
      `card[expirationDate] must be greater than or equal to the current year: ${currentYear} (${formattedYear})`
    );
  });

  it("should throw an error if card[type] is different of types CREDIT | DEBIT | BOTH", async () => {
    const createCardProps = createFakeCard({
      type: faker.lorem.word(5),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow(`card[type] must be CREDIT | DEBIT | BOTH`);
  });

  it("should throw an error if card[isVirtual] is not a boolean (true or false)", async () => {
    const createCardProps = createFakeCard({
      isVirtual: faker.lorem.word(3),
    } as FakeCardProps);
    const userId = faker.datatype.uuid();

    expect(() =>
      Card.create(createCardProps as CreateCardProps, userId)
    ).toThrow(`card[isVirtual] must be a boolean true or false`);
  });
});
