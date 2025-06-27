interface Props {
  allocation: number;
  breakdown: Record<string, number>;
}

export default function AirdropResult({ allocation, breakdown }: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 text-lg text-slate-200 shadow-2xl max-w-xl mx-auto flex flex-col items-center gap-6 border border-purple-700/40">
      <div className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
        Your <span className="text-purple-400">$TUNA</span> Allocation:
        <span className="block text-5xl md:text-6xl font-black mt-2 bg-gradient-to-r from-purple-400 to-slate-200 bg-clip-text text-transparent">
          {allocation.toFixed(2)}
        </span>
      </div>
      <div className="w-full bg-slate-800/80 rounded-xl p-6 shadow-inner">
        <div className="font-bold text-xl mb-3 text-slate-100 flex items-center gap-2">
          Breakdown
        </div>
        <ul className="space-y-2 mt-2">
          {Object.entries(breakdown).map(([key, value]) => (
            <li key={key} className="flex items-center gap-2 text-base">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span>
              <span className="capitalize font-medium">{key}:</span>
              <span className="ml-1 text-slate-100">{Number(value).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 