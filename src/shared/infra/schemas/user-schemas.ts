import Joi from "joi";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { AuthUserDTO } from "@shared/dtos/users/auth-user.dto";

export const createUserSchema = Joi.object<CreateUserDTO>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const authUserSchema = Joi.object<AuthUserDTO>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
