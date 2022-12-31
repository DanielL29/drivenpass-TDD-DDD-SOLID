import { CreateWifiDTO } from "@shared/dtos/wifis/create-wifi.dto";
import Joi from "joi";

export const createWifiSchema = Joi.object<CreateWifiDTO>({
  title: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
