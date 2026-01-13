import { createClient } from "@polkadot-api/client";
import { chainSpec } from "@polkadot-api/descriptors"; // Generato dopo il setup
import { getScProvider } from "@polkadot-api/sc-provider";

// Utilizziamo un nodo RPC pubblico per Paseo Asset Hub
const scProvider = getScProvider();
const provider = scProvider.addChain(chainSpec);

export const client = createClient(provider);
