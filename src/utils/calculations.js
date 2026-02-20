// utils/calculations.js

export const calculateTotals = (items) => {
  const subTotal = items.reduce(
    (acc, item) => acc + (item.qty || 0) * (item.price || 0),
    0
  );

  const gstAmount = subTotal * 0.18;
  const finalAmount = subTotal + gstAmount;
  const grandTotal = Math.round(finalAmount);
  const roundOff = Number((grandTotal - finalAmount).toFixed(2));

  return {
    subTotal: Number(subTotal.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    finalAmount: Number(finalAmount.toFixed(2)),
    grandTotal,
    roundOff
  };
};

// Generate quotation reference based on firm
export const generateQuotationRef = (firm) => {
  // Generate random number
  const random = Math.floor(100 + Math.random() * 900);
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const shortYear = year.slice(-2);
  
  // If firm is not provided, use default format
  if (!firm) {
    return `GK/NG/${shortYear}${month}/${random}`;
  }

  // Different formats based on firm ID
  const firmId = firm.id?.toLowerCase() || '';

  switch (firmId) {
    case 'gurukripa':
      // Format: GURU/2602/552 (day+month format)
      return `GURU/${day}${month}/${random}`;
    
    case 'ankit goel (huf)':
    case 'ankit':
      // Format: AS/st/2026 (year only format)
      return `AN/ST/${random}`;
    
    case 'swati':
      // Format: ST/AS/2602/552 (day+month format)
      return `AS/DT/${random}`;
    
    case 'gk':
      // Format: GK/NG/2602/552 (using prefix + day+month)
      return `${firm.quotationPrefix || 'GK/NG'}/${day}${month}/${random}`;
    
    case 'swanvi':
      // Format: SV/NG/2602/552
      return `${firm.quotationPrefix || 'SV/NG'}/${day}${month}/${random}`;
    
    case 'symgmatiq':
      // Format: SY/IN/2602/552
      return `${firm.quotationPrefix || 'SY/IN'}/${day}${month}/${random}`;
    
    default:
      // Default format for other firms: PREFIX/YYMM/RANDOM
      return `${firm.quotationPrefix || 'AN/NG'}/${shortYear}${month}/${random}`;
  }
};

export const calculateFromMode = (items, mode) => {
  return items.map(item => {
    if (mode === 'unit') {
      return {
        ...item,
        totalWithGST: Number((item.price * item.qty * 1.18).toFixed(2))
      };
    } else {
      return {
        ...item,
        price: Number((item.totalWithGST / (1.18 * item.qty)).toFixed(2))
      };
    }
  });
};