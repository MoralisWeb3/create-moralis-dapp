import { Default } from 'components/layouts';
import { GetEvmBalance, GetSolanaBalance } from 'components/modules';

export default function Home() {
  return (
    <Default>
      <GetEvmBalance />
      <GetSolanaBalance />
    </Default>
  );
}
