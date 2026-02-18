import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function PriceModeToggle() {
  const { register, watch } = useFormContext();
  const priceMode = watch('priceMode');

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Price Calculation Mode
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            {...register('priceMode')}
            value="unit"
            checked={priceMode === 'unit'}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Unit Price (without GST)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            {...register('priceMode')}
            value="total"
            checked={priceMode === 'total'}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Total with GST</span>
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {priceMode === 'unit' 
          ? 'Enter unit price without GST - total will auto-calculate with 18% GST'
          : 'Enter total amount including GST - unit price will auto-calculate'
        }
      </p>
    </div>
  );
}