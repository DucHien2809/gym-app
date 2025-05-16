'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { equipmentAPI } from '@/services/api';
import { Equipment, MaintenanceLog } from '@/types';
import { FiEdit, FiArrowLeft, FiPlus, FiCalendar, FiTool, FiDollarSign, FiUser, FiAlertCircle, FiX } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default function EquipmentDetailsPage({ params }: Props) {
  const router = useRouter();
  const { id } = params;
  
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    maintenanceDate: new Date().toISOString().split('T')[0],
    maintenanceType: 'Routine',
    description: '',
    cost: '',
    technician: '',
    parts: '',
    status: 'completed'
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch equipment details
  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      setLoading(true);
      try {
        const response = await equipmentAPI.getEquipment(id);
        if (response.data) {
          setEquipment(response.data as unknown as Equipment);
          if (response.data.maintenanceLogs) {
            setMaintenanceLogs(response.data.maintenanceLogs as unknown as MaintenanceLog[]);
          }
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch equipment details');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle maintenance form input change
  const handleMaintenanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMaintenanceFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle maintenance form submission
  const handleAddMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form
      if (!maintenanceFormData.maintenanceType || !maintenanceFormData.description) {
        throw new Error('Please fill all required fields');
      }

      // Submit form
      await equipmentAPI.createMaintenanceLog(id, {
        ...maintenanceFormData,
        cost: maintenanceFormData.cost ? parseFloat(maintenanceFormData.cost) : undefined
      });

      // Refresh equipment details
      const response = await equipmentAPI.getEquipment(id);
      if (response.data) {
        setEquipment(response.data as unknown as Equipment);
        if (response.data.maintenanceLogs) {
          setMaintenanceLogs(response.data.maintenanceLogs as unknown as MaintenanceLog[]);
        }
      }

      // Reset form and close modal
      setMaintenanceFormData({
        maintenanceDate: new Date().toISOString().split('T')[0],
        maintenanceType: 'Routine',
        description: '',
        cost: '',
        technician: '',
        parts: '',
        status: 'completed'
      });
      setShowAddMaintenanceModal(false);
    } catch (err: any) {
      setError(err.message || 'Failed to add maintenance log');
    } finally {
      setSubmitting(false);
    }
  };

  // Status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'retired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Maintenance status badge color
  const getMaintenanceStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Loading equipment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link
          href="/dashboard/admin/equipment"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Equipment List
        </Link>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Equipment not found</div>
        <Link
          href="/dashboard/admin/equipment"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Equipment List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="w-full md:w-auto flex items-center mb-4 md:mb-0">
          <Link
            href="/dashboard/admin/equipment"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
          >
            <FiArrowLeft className="mr-2" /> Back
          </Link>
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddMaintenanceModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
          >
            <FiTool /> Log Maintenance
          </button>
          <Link
            href={`/dashboard/admin/equipment/edit/${equipment.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
          >
            <FiEdit /> Edit Equipment
          </Link>
        </div>
      </div>

      {/* Equipment details */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Equipment Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Category:</span>
                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {equipment.category}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Status:</span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      equipment.status
                    )}`}
                  >
                    {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Manufacturer:</span>
                  <span className="ml-2">{equipment.manufacturer}</span>
                </div>
                {equipment.model && (
                  <div>
                    <span className="text-gray-500 text-sm">Model:</span>
                    <span className="ml-2">{equipment.model}</span>
                  </div>
                )}
                {equipment.serialNumber && (
                  <div>
                    <span className="text-gray-500 text-sm">Serial Number:</span>
                    <span className="ml-2">{equipment.serialNumber}</span>
                  </div>
                )}
                {equipment.location && (
                  <div>
                    <span className="text-gray-500 text-sm">Location:</span>
                    <span className="ml-2">{equipment.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Maintenance Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Purchase Date:</span>
                  <span className="ml-2">{formatDate(equipment.purchaseDate)}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Purchase Price:</span>
                  <span className="ml-2">${equipment.purchasePrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Last Maintenance:</span>
                  <span className="ml-2">
                    {equipment.lastMaintenance ? formatDate(equipment.lastMaintenance) : 'Never'}
                  </span>
                </div>
                {equipment.nextMaintenance && (
                  <div>
                    <span className="text-gray-500 text-sm">Next Scheduled Maintenance:</span>
                    <span className="ml-2">{formatDate(equipment.nextMaintenance)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{equipment.description}</p>
          </div>

          {equipment.notes && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Notes</h2>
              <p className="text-gray-700">{equipment.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Logs */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Maintenance History</h2>
        </div>

        {maintenanceLogs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No maintenance logs recorded for this equipment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(log.maintenanceDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.maintenanceType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.cost ? `$${log.cost.toFixed(2)}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMaintenanceStatusBadgeClass(
                          log.status
                        )}`}
                      >
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Maintenance Modal */}
      {showAddMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add Maintenance Log</h3>
              <button
                onClick={() => setShowAddMaintenanceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMaintenance}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Maintenance Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="maintenanceDate"
                        value={maintenanceFormData.maintenanceDate}
                        onChange={handleMaintenanceChange}
                        className="w-full px-4 py-2 border rounded-md text-gray-900"
                        required
                      />
                      <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Maintenance Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="maintenanceType"
                      value={maintenanceFormData.maintenanceType}
                      onChange={handleMaintenanceChange}
                      className="w-full px-4 py-2 border rounded-md text-gray-900"
                      required
                    >
                      <option value="Routine">Routine</option>
                      <option value="Repair">Repair</option>
                      <option value="Inspection">Inspection</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Upgrade">Upgrade</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={maintenanceFormData.status}
                      onChange={handleMaintenanceChange}
                      className="w-full px-4 py-2 border rounded-md text-gray-900"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        name="cost"
                        value={maintenanceFormData.cost}
                        onChange={handleMaintenanceChange}
                        className="w-full px-4 py-2 border rounded-md text-gray-900"
                        placeholder="0.00"
                      />
                      <FiDollarSign className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Technician */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technician
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="technician"
                        value={maintenanceFormData.technician}
                        onChange={handleMaintenanceChange}
                        className="w-full px-4 py-2 border rounded-md text-gray-900"
                      />
                      <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Parts */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parts
                    </label>
                    <input
                      type="text"
                      name="parts"
                      value={maintenanceFormData.parts}
                      onChange={handleMaintenanceChange}
                      className="w-full px-4 py-2 border rounded-md text-gray-900"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={maintenanceFormData.description}
                    onChange={handleMaintenanceChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-900"
                    rows={4}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Form Actions */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddMaintenanceModal(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 disabled:bg-green-300"
                >
                  {submitting ? 'Saving...' : 'Save Maintenance Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 