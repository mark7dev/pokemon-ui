import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Proxy: Making request to backend...');
    
    const backendUrl = 'http://localhost:4000';
    const url = `${backendUrl}/api/pokemons`;
    
    console.log(`Proxy: Fetching from ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Proxy: Backend responded with status ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Proxy: Backend error: ${response.status} - ${errorText}`);
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Proxy: Successfully got ${data.length} pokemon`);
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy: Error occurred:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch from backend',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}