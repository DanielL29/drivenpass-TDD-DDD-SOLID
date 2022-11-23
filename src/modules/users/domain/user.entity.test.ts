import { faker } from "@faker-js/faker";
import { CreateUserProps, User } from "./user";

function createFakeUser({
  name,
  email,
  password,
}: Partial<CreateUserProps>): CreateUserProps {
  const isEmpty = (value: string) => (value === "" ? true : false);

  return {
    name: isEmpty(name) ? "" : name || faker.internet.userName(),
    email: isEmpty(email) ? "" : email || faker.internet.email(),
    password: isEmpty(password) ? "" : password || faker.internet.password(6),
  };
}

describe("user entity", () => {
  it("should create an user entity", () => {
    const createUserProps = createFakeUser({});

    const user = User.create(createUserProps);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toEqual(createUserProps.name);
    expect(user.email).toEqual(createUserProps.email);
    expect(user.password).toEqual(createUserProps.password);
    expect(user.props).toHaveProperty("createdAt");
    expect(user).toHaveProperty("_id");
  });

  it("should throw an error if user[name] is empty", () => {
    const createUserProps = createFakeUser({ name: "" });

    expect(() => User.create(createUserProps)).toThrow(
      "user[name] cannot be empty"
    );
  });

  it("should throw an error if user[email] is empty", () => {
    const createUserProps = createFakeUser({ email: "" });

    expect(() => User.create(createUserProps)).toThrow(
      "user[email] cannot be empty"
    );
  });

  it("should throw an error if user[password] is empty", () => {
    const createUserProps = createFakeUser({ password: "" });

    expect(() => User.create(createUserProps)).toThrow(
      "user[password] cannot be empty"
    );
  });

  it("should throw an error if user[email] is not valid", () => {
    const createUserProps = createFakeUser({ email: faker.lorem.word() });

    expect(() => User.create(createUserProps)).toThrow(
      "user[email] must be a valid email"
    );
  });

  it("should throw an error if user[password] is less than 6 length", () => {
    const createUserProps = createFakeUser({ password: faker.lorem.word(5) });

    expect(() => User.create(createUserProps)).toThrow(
      "user[password] must be at minimum 6 length"
    );
  });
});
