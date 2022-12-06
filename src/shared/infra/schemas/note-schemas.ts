import Joi from "joi";
import { CreateNoteDTO } from "@shared/dtos/notes/create-note.dto";

export const createNoteSchema = Joi.object<CreateNoteDTO>({
  title: Joi.string().required(),
  note: Joi.string().required(),
});
