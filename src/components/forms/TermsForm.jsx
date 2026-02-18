import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TermsForm() {
  const { register } = useFormContext();

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Terms & Conditions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Terms
          </label>
          <input
            {...register('terms.payment')}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 100% against Delivery"
          />
          <p className="text-xs text-gray-500 mt-1">Default from selected firm</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Period
          </label>
          <input
            {...register('terms.delivery')}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 8-10 days From Confirm Order"
          />
          <p className="text-xs text-gray-500 mt-1">Default from selected firm</p>
        </div>
      </div>
    </div>
  );
}