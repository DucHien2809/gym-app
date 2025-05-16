import React, { useState, useEffect } from 'react';
import { FiInfo, FiEye, FiEyeOff } from 'react-icons/fi';
import { membershipAPI } from '@/services/api';

export default function DebugHelper() {
  const [showDebug, setShowDebug] = useState(false);
  const [localData, setLocalData] = useState<any>(null);
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDebugData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get localStorage data
      const localStorageData = localStorage.getItem('gymMemberships');
      setLocalData(localStorageData ? JSON.parse(localStorageData) : null);
      
      // Get API data
      const response = await membershipAPI.getAllMemberships();
      setApiData(response);
    } catch (err) {
      console.error('Error loading debug data:', err);
      setError('Failed to load debug data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showDebug) {
      loadDebugData();
    }
  }, [showDebug]);

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg opacity-50 hover:opacity-100 z-50"
      >
        <FiEye className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg max-w-lg w-full z-50 max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Debug Information</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <FiEyeOff className="w-5 h-5" />
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="p-3 bg-red-50 text-red-700 rounded-md">{error}</div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">LocalStorage (gymMemberships)</h4>
            {localData ? (
              <div className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40">
                <pre>{JSON.stringify(localData, null, 2)}</pre>
              </div>
            ) : (
              <div className="bg-yellow-50 p-3 rounded-md text-yellow-700">
                No data found in localStorage
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-2">API Response</h4>
            {apiData ? (
              <div className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40">
                <pre>{JSON.stringify(apiData, null, 2)}</pre>
              </div>
            ) : (
              <div className="bg-yellow-50 p-3 rounded-md text-yellow-700">
                No data received from API
              </div>
            )}
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={loadDebugData}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
            >
              Refresh Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 