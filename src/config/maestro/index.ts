import { MaestroProvider } from "@meshsdk/core";
import { env } from "~/env";
import { MaestroClient, Configuration } from "@maestro-org/typescript-sdk";

export const maestro_key = "jNazh6GY4G27dyNrHLGR6N78bMqlEzDK";

const maestro = new MaestroProvider({
  network: "Preprod",
  apiKey: maestro_key,
  turboSubmit: false,
});

export default maestro;

const maestroClient = new MaestroClient(
  new Configuration({
    apiKey: maestro_key,
    network: "Preprod",
  })
);

export { maestroClient };