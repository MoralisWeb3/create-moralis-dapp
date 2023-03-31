import { useSolPortfolio } from '@moralisweb3/react';
import { AddressInput, DataOutput, SectionHeading } from 'components/elements';
import React from 'react';

export default function GetSolanaBalance() {
  const [solanaAddress, setSolanaAddress] = React.useState(
    'BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen'
  );
  const {
    data: solanaBalance,
    refetch: fetchBalance,
    error: errorBalance,
  } = useSolPortfolio({ address: solanaAddress }, { enabled: false });

  return (
    <>
      <SectionHeading>Get Solana Portfolio</SectionHeading>
      <AddressInput
        address={solanaAddress}
        setAddress={setSolanaAddress}
        fetch={fetchBalance}
      />
      <SectionHeading>Result:</SectionHeading>
      {errorBalance ? (
        <DataOutput>{JSON.stringify(errorBalance)}</DataOutput>
      ) : (
        <DataOutput>
          {solanaBalance
            ? JSON.stringify(solanaBalance, null, 2)
            : 'Click the "🔎" button to fetch data'}
        </DataOutput>
      )}
    </>
  );
}
