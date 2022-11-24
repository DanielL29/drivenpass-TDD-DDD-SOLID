import { Request, Response } from "express";

export abstract class BaseController {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  protected abstract executeImpl(req: Request, res: Response): Promise<void>;

  public async execute(req: Request, res: Response): Promise<void> {
    await this.executeImpl(req, res);
  }

  protected ok<DTO>(res: Response, dto?: DTO) {
    if (dto) {
      return res.status(200).json(dto);
    }

    return res.sendStatus(200);
  }

  protected created<DTO>(res: Response, dto?: DTO) {
    if (dto) {
      return res.status(201).json(dto);
    }

    return res.sendStatus(201);
  }
}
