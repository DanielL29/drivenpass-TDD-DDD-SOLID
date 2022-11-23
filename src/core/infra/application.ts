export abstract class Application {
  protected abstract configDependencies(): void;
  public abstract init(): Promise<void>;
}
