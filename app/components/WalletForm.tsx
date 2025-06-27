import { useState } from 'react';

interface Props {
  onSubmit: (wallet: string) => void;
}

export default function WalletForm({ onSubmit }: Props) {
  const [wallet, setWallet] = useState('');

  return (
    <form
      className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl mx-auto mb-6"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(wallet);
      }}
    >
      <input
        type="text"
        placeholder="Enter your wallet address"
        value={wallet}
        onChange={e => setWallet(e.target.value)}
        className="flex-1 px-5 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
      >
        Check Airdrop
      </button>
    </form>
  );
} 