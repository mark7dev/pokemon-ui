import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG, CORS_HEADERS } from '@/constants/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name: pokemonName } = await params;
    
    if (!pokemonName || typeof pokemonName !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid Pokemon name',
          details: 'Pokemon name is required'
        },
        { 
          status: 400,
          headers: CORS_HEADERS,
        }
      );
    }

    const url = `${API_CONFIG.BACKEND_URL}/api/pokemons/${pokemonName}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Proxy: Backend error: ${response.status} - ${errorText}`);
      
      if (response.status === 404) {
        return NextResponse.json(
          { 
            error: 'Pokemon not found',
            details: `Pokemon with name "${pokemonName}" not found`
          },
          { 
            status: 404,
            headers: CORS_HEADERS,
          }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch pokemon from backend',
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
        error: 'Failed to fetch pokemon from backend',
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

