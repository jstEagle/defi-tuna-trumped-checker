import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { wallet } = await req.json();
  
  try {
    // Make a real request to the DeFiTuna wallet API
    const response = await fetch(`https://embed.defituna.com/airdrop/wallet/${wallet}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const result = await response.json();
    
    // Transform the DeFiTuna response to match our frontend expectations
    const { data } = result;
    const allocation = data.lending + data.trade + data.trumped;
    
    return NextResponse.json({
      allocation,
      breakdown: {
        lending: data.lending,
        trade: data.trade,
        trumped: data.trumped,
      },
    });
  } catch (error) {
    console.error('Error fetching from DeFiTuna wallet API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch airdrop data from DeFiTuna API' },
      { status: 500 }
    );
  }
} 