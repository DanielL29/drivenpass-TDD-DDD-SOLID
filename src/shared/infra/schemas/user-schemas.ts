import Joi from "joi";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";

export const createUserSchema = Joi.object<CreateUserDTO>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
