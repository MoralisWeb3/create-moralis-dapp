import '../styles/globals.css';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
  sepolia,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
  avalanche,
  avalancheFuji,
  fantom,
  cronos,
  arbitrum,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const { provider, webSocketProvider } = configureChains(
  [
    mainnet,
    goerli,
    sepolia,
    polygon,
    polygonMumbai,
    bsc,
    bscTestnet,
    avalanche,
    avalancheFuji,
    fantom,
    cronos,
    arbitrum,
  ],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
