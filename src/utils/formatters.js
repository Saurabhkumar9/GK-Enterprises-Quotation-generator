export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date, format = 'short') => {
  const options = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    full: { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  };
  
  return new Date(date).toLocaleDateString('en-GB', options[format] || options.short);
};

export const formatGST = (gst) => {
  if (!gst) return '';
  // Format: XXAAAAA0000X0Z0
  const cleaned = gst.replace(/[^A-Z0-9]/g, '');
  if (cleaned.length !== 15) return gst;
  
  return cleaned.replace(/(.{2})(.{5})(.{4})(.{1})(.{1})(.{2})/, '$1-$2-$3-$4$5$6');
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const numberToWords = (num) => {
  if (num === 0) return 'Zero';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
  const convertLessThanThousand = (n) => {
    if (n === 0) return '';
    
    let result = '';
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + ' ';
      n = 0;
    }
    
    if (n > 0) {
      result += ones[n] + ' ';
    }
    
    return result;
  };
  
  let result = '';
  let crore = Math.floor(num / 10000000);
  num %= 10000000;
  
  let lakh = Math.floor(num / 100000);
  num %= 100000;
  
  let thousand = Math.floor(num / 1000);
  num %= 1000;
  
  let hundred = num;
  
  if (crore > 0) {
    result += convertLessThanThousand(crore) + 'Crore ';
  }
  
  if (lakh > 0) {
    result += convertLessThanThousand(lakh) + 'Lakh ';
  }
  
  if (thousand > 0) {
    result += convertLessThanThousand(thousand) + 'Thousand ';
  }
  
  if (hundred > 0) {
    result += convertLessThanThousand(hundred);
  }
  
  return result.trim() + ' Rupees Only';
};