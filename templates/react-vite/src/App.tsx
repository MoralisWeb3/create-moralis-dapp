import { useEvmWalletTokenBalances, useSolPortfolio } from '@moralisweb3/react';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

function App() {
  const [evmAddress, setEvmAddress] = useState(
    '0x75e3e9c92162e62000425c98769965a76c2e387a'
  );

  const [solAddress, setSolAddress] = useState(
    'BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen'
  );

  const {
    data: evmBalance,
    refetch: fetchErc20,
    error: errorErc20,
  } = useEvmWalletTokenBalances({ address: evmAddress }, { enabled: false });
  const {
    data: solPortfolio,
    refetch: fetchSol,
    error: errorSol,
  } = useSolPortfolio({ address: solAddress }, { enabled: false });

  return (
    <div className="App">
      <header className="header">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://moralis.io" target="_blank">
          <img src="/moralis.svg" className="logo moralis" alt="Moralis logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Vite React Moralis Template</h1>
      </header>
      <main>
        <section>
          <h4>Get Ethereum Token Balance</h4>
          <div className="address-input">
            <input
              name="evmAddress"
              value={evmAddress}
              onChange={(e) => setEvmAddress(e.target.value)}
            />
            <button className="search_btn" onClick={() => fetchErc20()}>
              🔎
            </button>
          </div>
          <h4>Result:</h4>
          {errorErc20 ? (
            <pre data-out>{JSON.stringify(errorErc20)}</pre>
          ) : (
            <pre data-out>
              {evmBalance
                ? JSON.stringify(evmBalance, null, 2)
                : 'Click the "🔎" button to fetch data'}
            </pre>
          )}
        </section>

        <section>
          <h4>Get Solana Portfolio</h4>
          <div className="address-input">
            <input
              name="solAddress"
              value={solAddress}
              onChange={(e) => setSolAddress(e.target.value)}
            />
            <button className="search_btn" onClick={() => fetchSol()}>
              🔎
            </button>
          </div>
          <h4>Result:</h4>
          {errorSol ? (
            <pre data-out>{JSON.stringify(errorSol)}</pre>
          ) : (
            <pre data-out>
              {solPortfolio
                ? JSON.stringify(solPortfolio, null, 2)
                : 'Click the "🔎" button to fetch data'}
            </pre>
          )}
        </section>
      </main>
      <footer>
        <p>
          🙋 You have questions? Ask them on the{' '}
          <a href="https://forum.moralis.io/">Moralis forum</a>
        </p>
        <p>
          📖 Read more about <a href="https://moralis.io/">Moralis</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
