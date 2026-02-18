import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { calculateTotals, generateQuotationRef } from '../utils/calculations';
import { firms } from '../components/firms/firms.json';

export const useQuotation = (initialFirmId = 'gk') => {
  const [selectedFirm, setSelectedFirm] = useLocalStorage('selectedFirm', initialFirmId);
  const quotationRefGenerated = useRef(false);
  
  const currentFirm = firms.find(f => f.id === selectedFirm) || firms[0];
  
  const [quotationData, setQuotationData] = useLocalStorage('quotationData', {
    customer: { name: '', address: '', gst: '' },
    items: [],
    priceMode: 'unit',
    terms: {
      payment: currentFirm.defaultTerms.payment,
      delivery: currentFirm.defaultTerms.delivery
    }
  });

  const [totals, setTotals] = useState({ 
    subTotal: 0, 
    gstAmount: 0, 
    finalAmount: 0, 
    grandTotal: 0, 
    roundOff: 0 
  });
  
  const [quotationRef, setQuotationRef] = useState('');
  const [date] = useState(new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }));

  // Generate quotation reference only once per firm
  useEffect(() => {
    if (!quotationRefGenerated.current) {
      setQuotationRef(generateQuotationRef(currentFirm.quotationPrefix));
      quotationRefGenerated.current = true;
    }
  }, [currentFirm.quotationPrefix]);

  // Update totals when items change
  useEffect(() => {
    const newTotals = calculateTotals(quotationData.items || []);
    setTotals(newTotals);
  }, [quotationData.items]);

  // Update customer details
  const updateCustomer = useCallback((field, value) => {
    setQuotationData(prev => ({
      ...prev,
      customer: { ...prev.customer, [field]: value }
    }));
  }, [setQuotationData]);

  // Update price mode
  const updatePriceMode = useCallback((mode) => {
    setQuotationData(prev => ({ ...prev, priceMode: mode }));
  }, [setQuotationData]);

  // Update terms
  const updateTerms = useCallback((field, value) => {
    setQuotationData(prev => ({
      ...prev,
      terms: { ...prev.terms, [field]: value }
    }));
  }, [setQuotationData]);

  // Add new item
  const addItem = useCallback(() => {
    setQuotationData(prev => ({
      ...prev,
      items: [
        ...(prev.items || []),
        {
          description: '',
          specifications: [''],
          qty: 1,
          price: 0,
          totalWithGST: 0
        }
      ]
    }));
  }, [setQuotationData]);

  // Update item
  const updateItem = useCallback((index, field, value) => {
    setQuotationData(prev => {
      const updatedItems = [...(prev.items || [])];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      
      // Auto-calculate based on mode
      const item = updatedItems[index];
      const mode = prev.priceMode;
      
      if (mode === 'unit' && field === 'price') {
        item.totalWithGST = Number((item.price * item.qty * 1.18).toFixed(2));
      } else if (mode === 'total' && field === 'totalWithGST') {
        item.price = Number((item.totalWithGST / (1.18 * item.qty)).toFixed(2));
      } else if (field === 'qty') {
        if (mode === 'unit' && item.price > 0) {
          item.totalWithGST = Number((item.price * item.qty * 1.18).toFixed(2));
        } else if (mode === 'total' && item.totalWithGST > 0) {
          item.price = Number((item.totalWithGST / (1.18 * item.qty)).toFixed(2));
        }
      }
      
      return { ...prev, items: updatedItems };
    });
  }, [setQuotationData]);

  // Add specification
  const addSpecification = useCallback((itemIndex) => {
    setQuotationData(prev => {
      const updatedItems = [...(prev.items || [])];
      updatedItems[itemIndex].specifications.push('');
      return { ...prev, items: updatedItems };
    });
  }, [setQuotationData]);

  // Remove specification
  const removeSpecification = useCallback((itemIndex, specIndex) => {
    setQuotationData(prev => {
      const updatedItems = [...(prev.items || [])];
      if (updatedItems[itemIndex].specifications.length > 1) {
        updatedItems[itemIndex].specifications = updatedItems[itemIndex].specifications.filter((_, i) => i !== specIndex);
      } else {
        updatedItems[itemIndex].specifications = [''];
      }
      return { ...prev, items: updatedItems };
    });
  }, [setQuotationData]);

  // Remove item
  const removeItem = useCallback((index) => {
    setQuotationData(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      return { ...prev, items: updatedItems.length ? updatedItems : [] };
    });
  }, [setQuotationData]);

  // Reset quotation
  const resetQuotation = useCallback(() => {
    setQuotationData({
      customer: { name: '', address: '', gst: '' },
      items: [],
      priceMode: 'unit',
      terms: {
        payment: currentFirm.defaultTerms.payment,
        delivery: currentFirm.defaultTerms.delivery
      }
    });
    quotationRefGenerated.current = false;
  }, [setQuotationData, currentFirm]);

  return {
    selectedFirm,
    setSelectedFirm,
    quotationData,
    totals,
    quotationRef,
    date,
    updateCustomer,
    updatePriceMode,
    updateTerms,
    addItem,
    updateItem,
    addSpecification,
    removeSpecification,
    removeItem,
    resetQuotation
  };
};