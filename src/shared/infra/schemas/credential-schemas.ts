import Joi from "joi";
import { CreateCredentialDTO } from "@shared/dtos/credentials/create-credential.dto";

export const createCredentialSchema = Joi.object<CreateCredentialDTO>({
  title: Joi.string().required(),
  url: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
