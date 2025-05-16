import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // This will run on the server - we can't access localStorage directly
    // But we can make a request to the backend API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    let apiData;
    try {
      const response = await axios.get(`${API_URL}/memberships`);
      apiData = response.data;
    } catch (error) {
      apiData = { error: 'Failed to fetch from backend API', details: (error as any).message };
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'This is a debug endpoint. Client-side localStorage data is not available here.',
      api: {
        url: `${API_URL}/memberships`,
        data: apiData
      },
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: (error as Error).message 
      },
      { status: 500 }
    );
  }
} 