import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'gk_quotations';

export const saveQuotation = (quotation) => {
  const quotations = getQuotations();
  const newQuotation = {
    ...quotation,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };
  quotations.push(newQuotation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotations));
  return newQuotation;
};

export const getQuotations = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getQuotationById = (id) => {
  const quotations = getQuotations();
  return quotations.find(q => q.id === id);
};

export const deleteQuotation = (id) => {
  const quotations = getQuotations();
  const filtered = quotations.filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearAllQuotations = () => {
  localStorage.removeItem(STORAGE_KEY);
};