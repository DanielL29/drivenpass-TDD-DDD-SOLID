import { createUserSchema, authUserSchema } from "./user-schemas";
import { createCredentialSchema } from "./credential-schemas";
import { createNoteSchema } from "./note-schemas";
import { createCardSchema } from "./card-schemas";

export const BodySchemas = {
  createUserSchema,
  authUserSchema,
  createCredentialSchema,
  createNoteSchema,
  createCardSchema,
};
