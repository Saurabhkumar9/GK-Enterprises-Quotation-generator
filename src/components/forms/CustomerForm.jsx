import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CustomerForm() {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const selectedDate = watch('quotationDate');
  
  // State for manual date inputs
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Generate options for day, month, year
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  // Update form value when manual inputs change
  useEffect(() => {
    if (day && month && year) {
      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');
      const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
      setValue('quotationDate', dateStr);
    }
  }, [day, month, year, setValue]);

  // Set today's date
  const setToday = () => {
    const today = new Date();
    setDay(today.getDate());
    setMonth((today.getMonth() + 1).toString().padStart(2, '0'));
    setYear(today.getFullYear());
    setValue('quotationDate', todayStr);
  };

  // Initialize with today's date on mount
  useEffect(() => {
    setToday();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Customer Details
      </h2>
      
      {/* Customer Name and Date in same row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Name - Left Side */}
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

        {/* Date Selection - Right Side with manual inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quotation Date <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {/* Day Dropdown */}
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Day</option>
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Month Dropdown */}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Month</option>
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Year</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={setToday}
              className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Today
            </button>
            
            {errors.quotationDate && (
              <p className="text-sm text-red-600">{errors.quotationDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Customer Address - Full Width Below */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Address
        </label>
        <textarea
          {...register('customer.address')}
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