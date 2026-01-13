import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Definiamo Paseo Asset Hub come chain personalizzata
const paseoAssetHub = {
  id: 424242, // ID testnet Paseo
  name: 'Paseo Asset Hub',
  network: 'paseo-asset-hub',
  nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://paseo-asset-hub-rpc.polkadot.io'] },
    public: { http: ['https://paseo-asset-hub-rpc.polkadot.io'] },
  },
};

const { publicClient, webSocketPublicClient } = configureChains(
  [paseoAssetHub],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
