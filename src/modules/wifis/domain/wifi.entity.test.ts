import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import { CreateWifiProps, Wifi } from "./wifi";

function createFakeWifi({
  title,
  name,
  password,
}: Partial<CreateWifiProps>): CreateWifiProps {
  const isEmpty = (value: string) => (value === "" ? true : false);

  return {
    title: isEmpty(title!) ? "" : title || faker.lorem.word(5),
    name: isEmpty(name!) ? "" : name || faker.lorem.word(5),
    password: isEmpty(password!) ? "" : password || faker.internet.password(6),
  };
}

describe("wifi entity", () => {
  it("should create a wifi entity", async () => {
    const createWifiProps = createFakeWifi({});
    const userId = faker.datatype.uuid();

    const wifi = Wifi.create(createWifiProps, userId);

    expect(wifi).toHaveProperty("_id");
    expect(wifi.props).toHaveProperty("createdAt");
    expect(wifi.title).toEqual(createWifiProps.title);
    expect(wifi.name).toEqual(createWifiProps.name);
    expect(wifi.decryptPassword()).toEqual(createWifiProps.password);
  });

  it("should throw an error if wifi[title] is empty", async () => {
    const createWifiProps = createFakeWifi({ title: "" });
    const userId = faker.datatype.uuid();

    expect(() => Wifi.create(createWifiProps, userId)).toThrow(
      "wifi[title] cannot be empty"
    );
  });

  it("should throw an error if wifi[name] is empty", async () => {
    const createWifiProps = createFakeWifi({ name: "" });
    const userId = faker.datatype.uuid();

    expect(() => Wifi.create(createWifiProps, userId)).toThrow(
      "wifi[name] cannot be empty"
    );
  });

  it("should throw an error if wifi[password] is empty", async () => {
    const createWifiProps = createFakeWifi({ password: "" });
    const userId = faker.datatype.uuid();

    expect(() => Wifi.create(createWifiProps, userId)).toThrow(
      "wifi[password] cannot be empty"
    );
  });

  it("should throw an error if wifi[password] is less than 6 characters length", async () => {
    const createWifiProps = createFakeWifi({ password: faker.lorem.word(5) });
    const userId = faker.datatype.uuid();

    expect(() => Wifi.create(createWifiProps, userId)).toThrow(
      "wifi[password] must have at least 6 characters length"
    );
  });
});
