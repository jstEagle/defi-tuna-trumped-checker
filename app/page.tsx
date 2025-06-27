"use client"

import { useState } from 'react';
import WalletForm from './components/WalletForm';
import AirdropResult from './components/AirdropResult';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    allocation: number;
    breakdown: Record<string, number>;
  } | null>(null);

  const handleWalletSubmit = async (wallet: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // 1. Get airdrop data
      const dataRes = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet }),
      });
      if (!dataRes.ok) throw new Error('Failed to fetch airdrop data');
      const { allocation, breakdown } = await dataRes.json();
      setResult({ allocation, breakdown });
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-800 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-slate-300 bg-clip-text text-transparent">
          Check Your $TUNA Airdrop
        </h1>
        <p className="text-slate-300 text-lg md:text-2xl mb-8 max-w-2xl">
          Enter your wallet address below to see exactly how your airdrop breaks down.
        </p>
        <WalletForm onSubmit={handleWalletSubmit} />
        {loading && <div className="text-purple-400 mt-4">Loading...</div>}
        {error && <div className="text-red-400 mt-4">{error}</div>}
        {result && (
          <AirdropResult
            allocation={result.allocation}
            breakdown={result.breakdown}
          />
        )}
      </section>
      {/* Footer */}
      <footer className="text-slate-400 text-center py-6 text-sm">
        Not affiliated with DeFiTuna. Made by a guy who just likes to build stuff :)
      </footer>
    </main>
  );
}
