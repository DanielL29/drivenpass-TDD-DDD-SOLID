import { Router } from "express";

export abstract class ExpressRoute {
  public router = Router();

  constructor() {
    this.useRouter();
  }

  public abstract useRouter(): void;
}
