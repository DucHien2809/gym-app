'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestPage() {
  const [getResult, setGetResult] = useState<any>(null);
  const [postResult, setPostResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const testGetRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Testing GET request to:', `${API_URL}/test`);
      const response = await axios.get(`${API_URL}/test`);
      console.log('GET response:', response.data);
      setGetResult(response.data);
    } catch (err: any) {
      console.error('GET request error:', err);
      setError(err.message || 'Failed to make GET request');
    } finally {
      setLoading(false);
    }
  };

  const testPostRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Testing POST request to:', `${API_URL}/test`);
      const response = await axios.post(`${API_URL}/test`, {
        test: 'data',
        time: new Date().toISOString()
      });
      console.log('POST response:', response.data);
      setPostResult(response.data);
    } catch (err: any) {
      console.error('POST request error:', err);
      setError(err.message || 'Failed to make POST request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="mb-6">
        <p className="mb-2">API URL: {API_URL}</p>
        <div className="flex gap-4">
          <button 
            onClick={testGetRequest}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            Test GET
          </button>
          <button 
            onClick={testPostRequest}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={loading}
          >
            Test POST
          </button>
        </div>
      </div>
      
      {loading && <p className="text-gray-500">Loading...</p>}
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {getResult && (
        <div className="p-4 mb-4 bg-blue-100 rounded">
          <h2 className="font-bold mb-2">GET Result:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(getResult, null, 2)}</pre>
        </div>
      )}
      
      {postResult && (
        <div className="p-4 mb-4 bg-green-100 rounded">
          <h2 className="font-bold mb-2">POST Result:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(postResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 