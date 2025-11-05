import { NextResponse } from 'next/server';
import { API_CONFIG, CORS_HEADERS } from '@/constants/api';

export async function GET() {
  try {
    const url = `${API_CONFIG.BACKEND_URL}/api/pokemons`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Proxy: Backend error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { 
          error: 'Failed to fetch from backend',
          details: `Backend responded with status: ${response.status}`
        },
        { 
          status: response.status,
          headers: CORS_HEADERS,
        }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    console.error('Proxy: Error occurred:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch from backend',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}