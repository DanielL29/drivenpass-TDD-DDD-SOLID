import { Entity } from "@core/domain/entity";
import { Check } from "@core/logic/check";
import { CustomError } from "@core/logic/error";

export interface NoteProps {
  title: string;
  note: string;
  userId: string;
  createdAt: Date;
}

export type CreateNoteProps = Omit<NoteProps, "userId" | "createdAt">;

export class Note extends Entity<NoteProps> {
  constructor(props: NoteProps, id?: string) {
    super(props, id);
  }

  public get title(): string {
    return this.props.title;
  }

  public get note(): string {
    return this.props.note;
  }

  public get userId(): string {
    return this.props.userId;
  }

  private static checkValues({ title, note }: CreateNoteProps) {
    const checkInputValues = [
      Check.notEmpty(title, "note[title]"),
      Check.notEmpty(note, "note[note]"),
      Check.maximumLength(50, title, "note[title]"),
      Check.maximumLength(1000, note, "note[note]"),
    ];

    const verifyCheckedValues = Check.checkAllValues(checkInputValues);

    if (!verifyCheckedValues.checked) {
      throw new CustomError("error_bad_request", verifyCheckedValues.message);
    }
  }

  public static create(
    { title, note }: CreateNoteProps,
    userId: string,
    id?: string,
    createdAt?: Date
  ): Note {
    this.checkValues({ title, note });

    return new Note(
      {
        title,
        note,
        userId,
        createdAt: createdAt ?? new Date(),
      },
      id
    );
  }
}
