import { ClientCreator } from "./ClientCreator";

(async () => {
  await ClientCreator.generate();
})().catch(console.log);
