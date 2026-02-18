import React from 'react';
import { firms } from './firms.json';

export default function FirmSelector({ selectedFirm, onFirmChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Firm <span className="text-red-500">*</span>
      </label>
      <select
        value={selectedFirm}
        onChange={(e) => onFirmChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {firms.map((firm) => (
          <option key={firm.id} value={firm.id}>
            {firm.tradeName || firm.name} - {firm.gst}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-2">
        Changing firm will update GST, terms, and quotation format
      </p>
    </div>
  );
}