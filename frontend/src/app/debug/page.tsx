'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function DebugPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  const testSignup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Making test signup request to:', `${API_URL}/auth/signup`);
      
      const userData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`, // Make email unique
        password: 'testpassword123'
      };
      
      console.log('Request data:', userData);
      
      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Signup response:', response.data);
      setResult(response.data);
    } catch (err: any) {
      console.error('Signup test error:', err);
      let errorMessage = 'Unknown error occurred';
      
      if (err.response) {
        console.error('Error response:', err.response.data);
        errorMessage = `Error ${err.response.status}: ${err.response.data.message || 'Unknown server error'}`;
      } else if (err.request) {
        console.error('Error request:', err.request);
        errorMessage = 'No response received from server. Check network connection.';
      } else {
        errorMessage = err.message || 'Error in request setup';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Registration Debug</h1>
      
      <div className="mb-6">
        <p className="mb-2">API URL: {API_URL}</p>
        <button 
          onClick={testSignup}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test Signup'}
        </button>
      </div>
      
      {loading && <p className="text-gray-500">Loading...</p>}
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="p-4 mb-4 bg-green-100 rounded">
          <h2 className="font-bold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 