import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { firms } from '../firms/firms.json';
import { calculateTotals, generateQuotationRef } from '../../utils/calculations';
import { downloadPDF } from '../../utils/pdfGenerator';
import QuotationActions from './QuotationActions';

export default function QuotationTemplate({ firmId }) {
  const pdfRef = useRef();
  const { watch } = useFormContext();
  const formData = watch();
  const [quotationRef, setQuotationRef] = useState('');
  const refGenerated = useRef(false);

  const firm = firms.find(f => f.id === firmId) || firms[0];
  const items = formData.items || [];
  const { subTotal, gstAmount, finalAmount, grandTotal, roundOff } = calculateTotals(items);
  
  // Generate reference only once when component mounts or firm changes
  useEffect(() => {
    if (!refGenerated.current) {
      setQuotationRef(generateQuotationRef(firm.quotationPrefix));
      refGenerated.current = true;
    }
  }, [firm.quotationPrefix]);

  const date = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const handleDownloadPDF = useCallback(async () => {
    try {
      // Add a class to optimize for PDF before downloading
      const element = pdfRef.current;
      element.classList.add('pdf-optimized');
      
      await downloadPDF(element, `${firm.initials}-${quotationRef}`, {
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        scale: 2,
        quality: 100,
        pagebreak: { mode: ['css', 'legacy'] }
      });
      
      // Remove the PDF optimization class after download
      element.classList.remove('pdf-optimized');
    } catch (error) {
      console.error('PDF download failed:', error);
    }
  }, [firm.initials, quotationRef]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = pdfRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Quotation ${quotationRef}</title>
            <style>
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                margin: 0;
                background: white;
                line-height: 1.3;
              }
              .quotation-container {
                max-width: 794px;
                margin: 0 auto;
                position: relative;
                background: white;
              }
              .firm-initials {
                position: absolute;
                top: 20px;
                right: 20px;
                color: #b91c1c;
                font-size: 36px;
                font-weight: bold;
                z-index: 10;
              }
              .quotation-title {
                text-align: center;
                margin-top: 10px;
                margin-bottom: 30px;
                width: 100%;
              }
              .quotation-title h2 {
                font-size: 24px;
                font-weight: bold;
                margin: 0;
              }
              .quotation-title .border-line {
                border-bottom: 2px solid black;
                width: 120px;
                margin: 8px auto 0;
              }
              table { 
                border-collapse: collapse; 
                width: 100%; 
                margin: 15px 0;
              }
              th, td { 
                border: 1px solid black; 
                padding: 10px 8px; 
                vertical-align: top;
              }
              th { 
                background-color: #f2f2f2; 
                font-weight: bold;
              }
              .text-right { 
                text-align: right; 
              }
              .text-center { 
                text-align: center; 
              }
              .font-bold { 
                font-weight: bold; 
              }
              .bg-gray-50 { 
                background-color: #f9fafb; 
              }
              .border-black { 
                border-color: black; 
              }
              .mt-1 { margin-top: 4px; }
              .mt-2 { margin-top: 8px; }
              .mt-3 { margin-top: 12px; }
              .mt-4 { margin-top: 16px; }
              .mt-6 { margin-top: 24px; }
              .mb-1 { margin-bottom: 4px; }
              .mb-2 { margin-bottom: 8px; }
              .mb-3 { margin-bottom: 12px; }
              .mb-4 { margin-bottom: 16px; }
              .mx-auto { 
                margin-left: auto; 
                margin-right: auto; 
              }
              .w-8 { width: 32px; }
              .w-12 { width: 48px; }
              .w-16 { width: 64px; }
              .w-20 { width: 80px; }
              .w-24 { width: 96px; }
              .w-32 { width: 128px; }
              .w-40 { width: 160px; }
              .flex { 
                display: flex; 
              }
              .justify-between { 
                justify-content: space-between; 
              }
              .items-center { 
                align-items: center; 
              }
              .gap-3 { 
                gap: 12px; 
              }
              .gap-4 { 
                gap: 16px; 
              }
              .grid { 
                display: grid; 
              }
              .grid-cols-5 { 
                grid-template-columns: repeat(5, 1fr); 
              }
              .col-span-2 { 
                grid-column: span 2; 
              }
              .col-span-3 { 
                grid-column: span 3; 
              }
              .border { 
                border: 1px solid black; 
              }
              .border-r { 
                border-right: 1px solid black; 
              }
              .border-b { 
                border-bottom: 1px solid black; 
              }
              .border-t { 
                border-top: 1px solid black; 
              }
              .rounded-lg { 
                border-radius: 4px; 
              }
              .p-1 { padding: 4px; }
              .p-2 { padding: 8px; }
              .p-3 { padding: 12px; }
              .p-4 { padding: 16px; }
              .py-1 { padding-top: 4px; padding-bottom: 4px; }
              .py-2 { padding-top: 8px; padding-bottom: 8px; }
              .px-2 { padding-left: 8px; padding-right: 8px; }
              .pt-1 { padding-top: 4px; }
              .pt-2 { padding-top: 8px; }
              .pt-3 { padding-top: 12px; }
              .pt-4 { padding-top: 16px; }
              .pb-1 { padding-bottom: 4px; }
              .pb-2 { padding-bottom: 8px; }
              .pl-2 { padding-left: 8px; }
              .ml-2 { margin-left: 8px; }
              .whitespace-pre-line { 
                white-space: pre-line; 
              }
              .text-xs { 
                font-size: 12px; 
              }
              .text-sm { 
                font-size: 14px; 
              }
              .text-base { 
                font-size: 16px; 
              }
              .text-red-700 { 
                color: #b91c1c; 
              }
              .text-gray-600 { 
                color: #4b5563; 
              }
              .text-gray-400 { 
                color: #9ca3af; 
              }
              .underline { 
                text-decoration: underline; 
              }
              .specification-item { 
                margin-left: 16px; 
                font-size: 11px; 
                color: #4b5563; 
                line-height: 1.4;
              }
              hr {
                border: none;
                border-top: 1px solid black;
                margin: 20px 0 10px;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              .pdf-optimized {
                background: white;
                padding: 20px !important;
              }
              .pdf-optimized * {
                line-height: 1.3 !important;
              }
              @media print {
                body { 
                  margin: 0; 
                  padding: 0.5in; 
                }
                .no-print {
                  display: none;
                }
                .firm-initials {
                  position: absolute;
                  top: 20px;
                  right: 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="quotation-container">
              ${content}
            </div>
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }, [quotationRef]);

  // Number to words function
  const numberToWords = (num) => {
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

  return (
    <div className="mt-6">
      <QuotationActions 
        onDownload={handleDownloadPDF}
        onPrint={handlePrint}
      />

      <div
        ref={pdfRef}
        className="bg-white mx-auto p-4 md:p-6 text-xs md:text-sm print:p-6 quotation-content"
        style={{
          maxWidth: '794px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          minHeight: 'auto',
          backgroundColor: 'white',
          lineHeight: '1.4',
          wordWrap: 'break-word'
        }}
      >
        {/* Header with Firm Initials - Always on Right */}
        <div 
          style={{
            position: 'absolute',
            top: '25px',
            right: '25px',
            color: '#b91c1c',
            fontSize: '36px',
            fontWeight: 'bold',
            zIndex: 10,
            letterSpacing: '1px'
          }}
        >
          {firm.initials}
        </div>

        {/* Quotation Title - Perfectly Centered */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '15px', 
          marginBottom: '30px',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            QUOTATION
          </h2>
          <div style={{ 
            borderBottom: '2px solid black', 
            width: '120px',
            margin: '8px auto 0'
          }}></div>
        </div>

        {/* Customer Box */}
        <div className="border border-black rounded-lg mt-4 grid grid-cols-5 text-xs">
          <div className="col-span-2 border-r border-black p-2">
            <p className="font-bold text-xs" style={{ marginBottom: '4px' }}>CUSTOMER DETAILS:</p>
            <p className="mt-1 font-bold text-xs">To,</p>
            <p className="font-bold text-xs" style={{ marginTop: '4px' }}>{formData.customer?.name || '_________________'}</p>
            <p className="whitespace-pre-line text-xs mt-1" style={{ lineHeight: '1.4' }}>{formData.customer?.address || '_________________'}</p>
            {formData.customer?.gst && (
              <p className="text-xs mt-1">GST: {formData.customer.gst}</p>
            )}
          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-2 border-b border-black">
              <div className="p-2 border-r border-black">
                <span className="font-semibold text-xs">Ref:</span> {quotationRef}
              </div>
              <div className="p-2">
                <span className="font-semibold text-xs">Date:</span> {date}
              </div>
            </div>

            <div className="border-b border-black p-2">
              <span className="font-semibold text-xs">GST No:</span> {firm.gst}
            </div>

            <div className="p-2 text-center">
              <p className="font-bold text-xs underline">KINDLY PLACE YOUR ORDER ON</p>
              <p className="font-bold text-xs mt-1">{firm.tradeName || firm.name}</p>
              <p className="text-xs" style={{ lineHeight: '1.4' }}>{firm.address}</p>
              <p className="text-xs">Phone: {firm.phone.join(', ')}</p>
              <p className="text-xs">Email: {firm.email}</p>
            </div>
          </div>
        </div>

        {/* Subject Line */}
        <div className="pt-3 space-y-1" style={{ marginTop: '16px' }}>
          <p className="text-xs">Subject: </p>
          <p className="text-xs">Dear Sir/Madam,</p>
          <p className="text-xs" style={{ lineHeight: '1.4' }}>
            This is reference to our mentioned subject. We are quoting you the best price for the same. Which prices and description is as mentioned below:
          </p>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full border border-black text-xs" style={{ borderCollapse: 'collapse', marginTop: '12px' }}>
            <thead>
              <tr>
                <th className="border border-black p-2 text-center" style={{ width: '40px' }}>S.No</th>
                <th className="border border-black p-2 text-left">DESCRIPTION</th>
                <th className="border border-black p-2 text-center" style={{ width: '50px' }}>QTY</th>
                <th className="border border-black p-2 text-right" style={{ width: '90px' }}>UNIT PRICE (₹)</th>
                <th className="border border-black p-2 text-right" style={{ width: '90px' }}>TOTAL (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black p-2 text-center align-top">{index + 1}</td>
                  <td className="border border-black p-2">
                    <span className="font-semibold text-xs">{item.description || '_________________'}</span>
                    {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                      <div className="mt-1 text-gray-600">
                        {item.specifications.map((spec, i) => 
                          spec && spec.trim() && (
                            <div key={i} className="specification-item" style={{ marginLeft: '16px', fontSize: '11px' }}>• {spec}</div>
                          )
                        )}
                      </div>
                    )}
                  </td>
                  <td className="border border-black p-2 text-center align-top">{item.qty}</td>
                  <td className="border border-black p-2 text-right align-top">₹{Number(item.price || 0).toFixed(2)}</td>
                  <td className="border border-black p-2 text-right align-top">₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="border border-black p-4 text-center text-gray-400">
                    No items added
                  </td>
                </tr>
              )}

              {items.length > 0 && (
                <>
                  <tr>
                    <td colSpan="4" className="border border-black p-2 text-right font-medium">Sub-Total</td>
                    <td className="border border-black p-2 text-right">₹{subTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="border border-black p-2 text-right font-medium">GST @ 18%</td>
                    <td className="border border-black p-2 text-right">₹{gstAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="border border-black p-2 text-right font-medium">Round Off</td>
                    <td className="border border-black p-2 text-right">₹{roundOff.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="border border-black p-2 font-bold text-right bg-gray-50">Grand Total</td>
                    <td className="border border-black p-2 font-bold text-right bg-gray-50">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Amount in Words */}
        {grandTotal > 0 && (
          <p className="text-xs mt-3 font-semibold" style={{ marginTop: '12px' }}>
            Amount in words: {numberToWords(grandTotal)}
          </p>
        )}

        {/* Terms and Footer */}
        <div className="mt-4 text-xs" style={{ marginTop: '20px' }}>
          <p className="font-bold text-xs">Terms and Conditions:</p>
          <div className="border-b border-black" style={{ width: '80px', marginTop: '2px', borderBottom: '1px solid black' }}></div>
          
          <div className="mt-2 space-y-1" style={{ marginTop: '8px' }}>
            <p className="text-xs font-semibold">• Payment: {formData.terms?.payment || firm.defaultTerms.payment}</p>
            <p className="text-xs font-semibold">• Delivery: {formData.terms?.delivery || firm.defaultTerms.delivery}</p>
          </div>

          <p className="text-xs mt-3" style={{ marginTop: '12px' }}>• This is a computer generated quotation and does not require signature.</p>
          <p className="text-xs">• Prices are subject to change without prior notice.</p>
          <p className="text-xs">• Goods once sold will not be taken back.</p>

          <div className="flex flex-col md:flex-row justify-between mt-4 gap-3" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div className="text-xs">
              <p className="font-bold text-xs" style={{ marginBottom: '4px' }}>Bank Details:</p>
              <p className="text-xs">Bank: {firm.bankDetails.bankName}</p>
              <p className="text-xs">A/c No: {firm.bankDetails.accountNo}</p>
              <p className="text-xs">IFSC: {firm.bankDetails.ifsc}</p>
              <p className="text-xs">Branch: {firm.bankDetails.branch}</p>
            </div>

            <div className="text-center" style={{ textAlign: 'center' }}>
              <div className="mt-2">
                <img
                  src={firm.signature}
                  alt="signature"
                  className="w-24 h-auto mx-auto"
                  style={{ maxWidth: '96px', height: 'auto', margin: '0 auto' }}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <p className="border-t border-black pt-1 mt-1 w-32 mx-auto text-xs" style={{ borderTop: '1px solid black', paddingTop: '4px', marginTop: '4px', width: '128px', marginLeft: 'auto', marginRight: 'auto' }}>
                  For {firm.tradeName || firm.name}
                </p>
              </div>
            </div>
          </div>

          <hr className="mt-4 border-black" style={{ marginTop: '20px', border: 'none', borderTop: '1px solid black' }} />
          <p className="text-center mt-2 text-gray-600 text-xs" style={{ textAlign: 'center', marginTop: '8px', color: '#4b5563' }}>
            {firm.address} | Ph: {firm.phone.join(', ')} | Email: {firm.email}
          </p>
        </div>
      </div>
    </div>
  );
}