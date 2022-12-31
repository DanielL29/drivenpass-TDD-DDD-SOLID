import { createUserSchema, authUserSchema } from "./user-schemas";
import { createCredentialSchema } from "./credential-schemas";
import { createNoteSchema } from "./note-schemas";
import { createCardSchema } from "./card-schemas";
import { createWifiSchema } from "./wifi-schemas";

export const BodySchemas = {
  createUserSchema,
  authUserSchema,
  createCredentialSchema,
  createNoteSchema,
  createCardSchema,
  createWifiSchema,
};
