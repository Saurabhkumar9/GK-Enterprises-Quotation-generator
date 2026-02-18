import React from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import PriceModeToggle from './PriceModeToggle';

export default function ItemsForm() {
  const { control, register, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const priceMode = useWatch({ control, name: 'priceMode' });

  const addItem = () => {
    append({
      description: '',
      specifications: [''],
      qty: 1,
      price: 0,
      totalWithGST: 0
    });
  };

  const addSpecification = (itemIndex) => {
    // Get current specifications
    const currentSpecs = getValues(`items.${itemIndex}.specifications`) || [''];
    
    // Create new specifications array with an empty string at the end
    const newSpecs = [...currentSpecs, ''];
    
    // Update the specifications array
    setValue(`items.${itemIndex}.specifications`, newSpecs, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  const removeSpecification = (itemIndex, specIndex) => {
    // Get current specifications
    const currentSpecs = getValues(`items.${itemIndex}.specifications`) || [''];
    
    if (currentSpecs.length > 1) {
      // Remove the specified index
      const newSpecs = currentSpecs.filter((_, i) => i !== specIndex);
      setValue(`items.${itemIndex}.specifications`, newSpecs, {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: true
      });
    } else {
      // Keep at least one empty specification
      setValue(`items.${itemIndex}.specifications`, [''], {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };

  const calculateTotal = (itemIndex, field, value) => {
    const item = getValues(`items.${itemIndex}`);
    const qty = field === 'qty' ? Number(value) : Number(item.qty) || 0;
    const price = field === 'price' ? Number(value) : Number(item.price) || 0;
    const totalWithGST = field === 'totalWithGST' ? Number(value) : Number(item.totalWithGST) || 0;

    if (priceMode === 'unit') {
      const newTotal = (price * qty * 1.18).toFixed(2);
      setValue(`items.${itemIndex}.totalWithGST`, parseFloat(newTotal), {
        shouldValidate: false,
        shouldDirty: true
      });
    } else {
      if (qty > 0) {
        const newPrice = totalWithGST / (1.18 * qty);
        setValue(`items.${itemIndex}.price`, parseFloat(newPrice.toFixed(2)), {
          shouldValidate: false,
          shouldDirty: true
        });
      }
    }
  };

  // Helper function to get current specifications for display
  const getSpecifications = (itemIndex) => {
    return getValues(`items.${itemIndex}.specifications`) || [''];
  };

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Items</h2>
        <PriceModeToggle />
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No items added yet</p>
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add First Item
          </button>
        </div>
      ) : (
        <>
          {fields.map((item, itemIndex) => {
            const specifications = getSpecifications(itemIndex);
            
            return (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register(`items.${itemIndex}.description`)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., HP Desktop"
                    />
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(itemIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 md:self-end"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Specifications */}
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specifications
                  </label>
                  
                  {specifications.map((_, specIndex) => (
                    <div key={`${item.id}-spec-${specIndex}`} className="flex gap-2 mb-2">
                      <input
                        {...register(`items.${itemIndex}.specifications.${specIndex}`)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={`Specification ${specIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(itemIndex, specIndex)}
                        className="px-2 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        title="Remove specification"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addSpecification(itemIndex)}
                    className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                  >
                    + Add Specification
                  </button>
                </div>

                {/* Quantity and Price */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register(`items.${itemIndex}.qty`)}
                      onChange={(e) => calculateTotal(itemIndex, 'qty', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="1"
                      step="1"
                    />
                  </div>

                  {priceMode === 'unit' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Price (without GST) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register(`items.${itemIndex}.price`)}
                        onChange={(e) => calculateTotal(itemIndex, 'price', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total with GST <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register(`items.${itemIndex}.totalWithGST`)}
                        onChange={(e) => calculateTotal(itemIndex, 'totalWithGST', e.target.value)}
                        className="w-full p-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}

                  <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {priceMode === 'unit' ? (
                        <>Total: ₹{((Number(getValues(`items.${itemIndex}.price`)) || 0) * 
                           (Number(getValues(`items.${itemIndex}.qty`)) || 1) * 1.18).toFixed(2)}</>
                      ) : (
                        <>Unit: ₹{((Number(getValues(`items.${itemIndex}.totalWithGST`)) || 0) / 
                           (1.18 * (Number(getValues(`items.${itemIndex}.qty`)) || 1))).toFixed(2)}</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addItem}
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Another Item
          </button>
        </>
      )}
    </div>
  );
}