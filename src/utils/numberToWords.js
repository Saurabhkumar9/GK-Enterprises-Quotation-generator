export const numberToWords = (num) => {
  if (num === 0) return 'Zero Rupees Only';
  
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
  
  if (crore > 0) {
    result += convertLessThanThousand(crore) + 'Crore ';
  }
  
  if (lakh > 0) {
    result += convertLessThanThousand(lakh) + 'Lakh ';
  }
  
  if (thousand > 0) {
    result += convertLessThanThousand(thousand) + 'Thousand ';
  }
  
  if (num > 0) {
    result += convertLessThanThousand(num);
  }
  
  return result.trim() + ' Rupees Only';
};