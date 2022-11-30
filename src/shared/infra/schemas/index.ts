import { createUserSchema, authUserSchema } from "./user-schemas";
import { createCredentialSchema } from "./credential-schemas";

export const BodySchemas = {
  createUserSchema,
  authUserSchema,
  createCredentialSchema,
};
