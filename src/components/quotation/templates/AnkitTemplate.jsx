import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function AnkitTemplate({ 
  firm, formData, quotationRef, date, items, 
  subTotal, gstAmount, roundOff, grandTotal 
}) {
  const primaryColor = '#e65100';
  const secondaryColor = '#bf360c';
  const lightBg = '#fff3e0';

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-2 sm:p-3">
      {/* Header with Firm Initials */}
      <div 
        className="text-white px-3 sm:px-4 py-2 sm:py-3 mb-3 rounded-b-lg relative"
        style={{ background: primaryColor }}
      >
        <div className="absolute bottom-4 right-2 text-2xl sm:text-4xl font-bold opacity-10 text-white">
          {firm.initials}
        </div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold mt-0.5">QUOTATION</h1>
          </div>
         <div className="pt-2 pb-2">
  <div
    className="bg-white px-3 py-1 pb-3 rounded-full font-bold text-lg leading-none inline-block"
    style={{ color: primaryColor }}
  >
    {firm.initials}
  </div>
</div>

        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-2 text-[10px] sm:text-xs gap-0.5">
          <span>Ref: {quotationRef}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div 
          className="p-2 sm:p-3 rounded"
          style={{ background: lightBg }}
        >
          <div 
            className="text-black  inline-block px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold mb-1"
            // style={{ background: primaryColor }}
          >
            CUSTOMER
          </div>
          <p className="font-bold text-[10px] sm:text-xs">To,</p>
          <p className="font-bold text-xs sm:text-sm mt-2" style={{ color: primaryColor }}>
            {formData.customer?.name || ''}
          </p>
          <p className="text-[10px] sm:text-xs mt-2 leading-snug">
            {formData.customer?.address || ''}
          </p>
          {formData.customer?.gst && (
            <p className="mt-1 text-[10px] sm:text-xs">
              GST: {formData.customer.gst}
            </p>
          )}
        </div>

        <div className="p-2 sm:p-3 border rounded">
          <div 
            className="text-black inline-block px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold mb-1"
            // style={{ background: secondaryColor }}
          >
            COMPANY :
          </div>
          <p className="text-[10px] sm:text-xs">
            <span className="font-bold">GST:</span> {firm.gst}
          </p>
          <p className="font-bold mt-1 text-[10px] sm:text-xs" style={{ color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>
          <p className="text-[9px] sm:text-[10px] mt-02 leading-snug">{firm.address}</p>
          <p className="text-[9px] sm:text-[10px] mt-0.5">Ph : {firm.phone.join(', ')}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-[9px] sm:text-xs border-collapse">
          <thead>
            <tr style={{ background: primaryColor }} className="text-black">
              <th className="p-1 sm:p-1.5 text-center w-6 sm:w-8">#</th>
              <th className="p-1 sm:p-1.5 text-left">DESCRIPTION</th>
              <th className="p-1 sm:p-1.5 text-center w-10 sm:w-12">QTY</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20">UNIT PRICE</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-center align-top">{index + 1}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300">
                  <span className="font-bold text-[9px] sm:text-xs" style={{ color: secondaryColor }}>
                    {item.description || ''}
                  </span>
                  {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                    <div className="mt-0.5 space-y-0.5">
                      {item.specifications.map((spec, i) => 
                        spec && spec.trim() && (
                          <div key={i} className="ml-1.5 sm:ml-2 text-[8px] sm:text-[9px] text-gray-600">• {spec}</div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-center align-top">{item.qty}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-right align-top">₹{Number(item.price || 0).toFixed(2)}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-right align-top">₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-400 border border-gray-300">
                  No items added
                </td>
              </tr>
            )}

            {items.length > 0 && (
              <>
                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-bold">Sub-Total</td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-bold">₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-bold">GST @ 18%</td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-bold">₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-bold">Round Off</td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-bold">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr style={{ background: lightBg }}>
                  <td colSpan="4" className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm">
                    GRAND TOTAL
                  </td>
                  <td className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm" style={{ color: primaryColor }}>
                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Amount in Words */}
      {/* {grandTotal > 0 && (
        <div 
          className="p-1.5 sm:p-2 mb-3 text-white text-[9px] sm:text-xs font-bold rounded"
          style={{ background: primaryColor }}
        >
          Amount in words: {numberToWords(grandTotal)}
        </div>
      )} */}

      {/* Terms and Footer */}
      <div className="text-[9px] sm:text-xs">
        <h3 className="font-bold mb-3 text-xs sm:text-sm" style={{ color: primaryColor }}>Terms & Conditions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
          <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
            <span className="font-bold block mb-2 text-[8px] sm:text-[10px]" style={{ color: primaryColor }}>Payment:</span>
            <span className="text-[8px] sm:text-[10px]">{formData.terms?.payment || firm.defaultTerms.payment}</span>
          </div>
          <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
            <span className="font-bold block mb-2 text-[8px] sm:text-[10px]" style={{ color: primaryColor }}>Delivery:</span>
            <span className="text-[8px] sm:text-[10px]">{formData.terms?.delivery || firm.defaultTerms.delivery}</span>
          </div>
        </div>

        <div className="space-y-0.5 mb-3 text-[8px] sm:text-[9px] text-gray-600">
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            This quotation is valid for 15 days
          </p>
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Prices are subject to change without prior notice
          </p>
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Goods once sold will not be taken back
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mt-4 pt-2 "
             style={{ borderColor: primaryColor }}>
          <div className="text-[8px] sm:text-[9px] space-y-0.5">
            <p className="font-bold text-[9px] sm:text-xs mb-2" style={{ color: primaryColor }}>Bank Details:</p>
            <p><span className="font-medium">Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span className="font-medium">A/c No:</span> {firm.bankDetails.accountNo}</p>
            <p><span className="font-medium">IFSC:</span> {firm.bankDetails.ifsc}</p>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">
            {firm.signature && (
              <img
                src={firm.signature}
                alt="signature"
                className="max-w-[60px] sm:max-w-[80px] h-auto mx-auto sm:mx-0 mb-2"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <p 
              className="border-t-2 pt-1 mt-1 font-bold text-[9px] sm:text-xs inline-block"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-2 border-t-2" style={{ borderColor: primaryColor }} />
        <p className="text-center text-[7px] sm:text-[8px] text-gray-600 leading-snug">
          {firm.address} | Phone: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </div>
  );
}