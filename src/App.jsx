import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FirmSelector from './components/firms/FirmSelector';
import CustomerForm from './components/forms/CustomerForm';
import ItemsForm from './components/forms/ItemsForm';
import TermsForm from './components/forms/TermsForm';
import QuotationTemplate from './components/quotation/QuotationTemplate';
import { useLocalStorage } from './hooks/useLocalStorage';
import { firms } from './components/firms/firms.json';
import './index.css';

export default function App() {
  const [selectedFirm, setSelectedFirm] = useLocalStorage('selectedFirm', 'gk');
  const [showPreview, setShowPreview] = useState(false);
  
  // Get current firm data
  const currentFirm = firms.find(f => f.id === selectedFirm) || firms[0];
  
  // Initialize form data
  const [formData, setFormData] = useState({
    customer: { name: '', address: '', gst: '' },
    items: [],
    priceMode: 'unit',
    terms: {
      payment: currentFirm.defaultTerms.payment,
      delivery: currentFirm.defaultTerms.delivery
    }
  });

  const methods = useForm({
    defaultValues: formData
  });

  const { watch, reset } = methods;
  const watchedValues = watch();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('quotationData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        reset(parsed);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, [reset]);

  // Save to localStorage when form changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('quotationData', JSON.stringify(watchedValues));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Update terms when firm changes
  useEffect(() => {
    const firm = firms.find(f => f.id === selectedFirm) || firms[0];
    const newTerms = {
      payment: firm.defaultTerms.payment,
      delivery: firm.defaultTerms.delivery
    };
    
    setFormData(prev => ({
      ...prev,
      terms: newTerms
    }));
    
    reset({
      ...watchedValues,
      terms: newTerms
    });
  }, [selectedFirm, reset]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        <h1 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-gray-800">
          Multi-Firm Quotation Generator
        </h1>

        <FormProvider {...methods}>
          <div className="space-y-4">
            <FirmSelector 
              selectedFirm={selectedFirm} 
              onFirmChange={setSelectedFirm} 
            />
            
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <CustomerForm />
              <TermsForm />
              <ItemsForm />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>

            {showPreview && (
              <QuotationTemplate 
                firmId={selectedFirm}
              />
            )}
          </div>
        </FormProvider>
      </div>
    </div>
  );
}