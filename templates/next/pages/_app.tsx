import { MoralisConfig, MoralisProvider } from '@moralisweb3/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const moralisConfig: MoralisConfig = {
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider config={moralisConfig}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
