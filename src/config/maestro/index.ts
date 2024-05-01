import { MaestroProvider } from "@meshsdk/core";

const maestro = new MaestroProvider({
  network: "Preprod",
  apiKey: "uggjX5wtuiaJwCHI4QSjkHCUCfqERamE",
  turboSubmit: false,
});

export default maestro;
