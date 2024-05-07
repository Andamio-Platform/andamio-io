import { MaestroProvider } from "@meshsdk/core";
import { env } from "~/env";

export const maestro_key = "jNazh6GY4G27dyNrHLGR6N78bMqlEzDK";

const maestro = new MaestroProvider({
  network: "Preprod",
  apiKey: maestro_key,
  turboSubmit: false,
});

export default maestro;
