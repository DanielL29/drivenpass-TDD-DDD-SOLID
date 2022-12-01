import { faker } from "@faker-js/faker";
import { CreateCredentialProps, Credential } from "./credential";

function createFakeCredential({
  title,
  url,
  name,
  password,
}: Partial<CreateCredentialProps>): CreateCredentialProps {
  const isEmpty = (value: string) => (value === "" ? true : false);

  return {
    title: isEmpty(title!) ? "" : title || faker.random.word(),
    url: isEmpty(url!) ? "" : url || faker.internet.url(),
    name: isEmpty(name!) ? "" : url || faker.lorem.word(),
    password: isEmpty(password!) ? "" : password || faker.internet.password(6),
  };
}

describe("credential entity", () => {
  it("should create a credential entity", async () => {
    const createCredentialProps = createFakeCredential({});
    const userId = faker.datatype.uuid();

    const credential = Credential.create(createCredentialProps, userId);

    expect(credential).toBeInstanceOf(Credential);
    expect(credential.title).toEqual(createCredentialProps.title);
    expect(credential.url).toEqual(createCredentialProps.url);
    expect(credential.name).toEqual(createCredentialProps.name);
    expect(credential.decryptPassword()).toEqual(
      createCredentialProps.password
    );
    expect(credential.props).toHaveProperty("createdAt");
    expect(credential).toHaveProperty("_id");
  });

  it("should throw an error if credential[title] is empty", async () => {
    const createCredentialProps = createFakeCredential({ title: "" });
    const userId = faker.datatype.uuid();

    expect(() => Credential.create(createCredentialProps, userId)).toThrow(
      "credential[title] cannot be empty"
    );
  });

  it("should throw an error if credential[url] is empty", async () => {
    const createCredentialProps = createFakeCredential({ url: "" });
    const userId = faker.datatype.uuid();

    expect(() => Credential.create(createCredentialProps, userId)).toThrow(
      "credential[url] cannot be empty"
    );
  });

  it("should throw an error if credential[name] is empty", async () => {
    const createCredentialProps = createFakeCredential({ name: "" });
    const userId = faker.datatype.uuid();

    expect(() => Credential.create(createCredentialProps, userId)).toThrow(
      "credential[name] cannot be empty"
    );
  });

  it("should throw an error if credential[password] is empty", async () => {
    const createCredentialProps = createFakeCredential({ password: "" });
    const userId = faker.datatype.uuid();

    expect(() => Credential.create(createCredentialProps, userId)).toThrow(
      "credential[password] cannot be empty"
    );
  });

  it("should throw an error if credential[url] is not valid", async () => {
    const createCredentialProps = createFakeCredential({
      url: faker.random.word(),
    });
    const userId = faker.datatype.uuid();

    expect(() => Credential.create(createCredentialProps, userId)).toThrow(
      "credential[url] must be a valid url"
    );
  });

  it("should throw an error if credential[title] is less than 6 characters length", async () => {
    const createCredentialProps = createFakeCredential({
      password: faker.internet.password(5),
    });
    const userId = faker.datatype.uuid();

    expect(() => Credential.create(createCredentialProps, userId)).toThrow(
      "credential[password] must have at least 6 characters length"
    );
  });
});
