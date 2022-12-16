import Joi from "joi";
import { CreateCardDTO } from "@shared/dtos/cards/create-card.dto";

export const createCardSchema = Joi.object<CreateCardDTO>({
  title: Joi.string().required(),
  number: Joi.string().required(),
  name: Joi.string().required(),
  securityCode: Joi.string().required(),
  expirationDate: Joi.string().required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().required(),
});
