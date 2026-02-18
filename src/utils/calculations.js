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

export const generateQuotationRef = (prefix = 'GK/NG') => {
  // Generate random number only once per session
  const random = Math.floor(100 + Math.random() * 900);
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  return `${prefix}/${year}${month}/${random}`;
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