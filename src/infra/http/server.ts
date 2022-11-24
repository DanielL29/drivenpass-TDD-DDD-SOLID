import { ExpressApp } from "./app";

async function Bootstrap() {
  const app = new ExpressApp();

  await app.init();
}

Bootstrap();
