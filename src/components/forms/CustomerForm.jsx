import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function CustomerForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Customer Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('customer.name', { required: 'Customer name is required' })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.customer?.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter customer name"
          />
          {errors.customer?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.customer.name.message}</p>
          )}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer GST (Optional)
          </label>
          <input
            {...register('customer.gst')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter GST number"
          />
        </div> */}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Details <span className="text-red-500"></span>
        </label>
        <textarea
          {...register('customer.address', )}
          rows="3"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.customer?.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter full address"
        />
        {errors.customer?.address && (
          <p className="mt-1 text-sm text-red-600">{errors.customer.address.message}</p>
        )}
      </div>
    </div>
  );
}