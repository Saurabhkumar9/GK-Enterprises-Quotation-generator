import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SwanviTemplate({ 
  firm, formData, quotationRef, date, items, 
  subTotal, gstAmount, roundOff, grandTotal 
}) {
  const primaryColor = '#1e3c72';
  const secondaryColor = '#2a5298';
  const lightBg = '#f0f5ff';

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-2 sm:p-3">
      {/* Modern Header with Gradient */}
      <div 
        className="text-white p-2 sm:p-3 mb-3 text-center relative rounded-t-lg"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
      >
        <h2 className="text-xl sm:text-2xl font-medium uppercase tracking-wider">
          QUOTATION
        </h2>
        <div className="text-[10px] sm:text-xs opacity-90 border-t border-white/30 pt-1 mt-1">
          {firm.name}
        </div>
        <div className="absolute top-1 right-2 text-white/20 text-3xl sm:text-4xl font-bold">
          {firm.initials}
        </div>
      </div>

      {/* Customer Box with Blue Border */}
      <div 
        className="border-2 rounded-md mb-3 overflow-hidden shadow-sm"
        style={{ borderColor: primaryColor }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div 
            className="p-2 sm:p-3 sm:border-r-2"
            style={{ background: lightBg, borderColor: primaryColor }}
          >
            <p 
              className="font-bold mb-1 text-[10px] sm:text-xs uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              CUSTOMER DETAILS:
            </p>
            <p className="font-bold text-[10px] sm:text-xs">To,</p>
            <p 
              className="font-bold mt-1 text-xs sm:text-sm"
              style={{ color: primaryColor }}
            >
              {formData.customer?.name || ''}
            </p>
            <p className="whitespace-pre-line">
  {(formData.customer?.address || '').replace(/,\s*/g, '\n')}
</p>
            {formData.customer?.gst && (
              <p className="mt-1.5 text-[10px] sm:text-xs font-medium">
                <span className="font-bold" style={{ color: primaryColor }}>GST:</span> {formData.customer.gst}
              </p>
            )}
          </div>

          <div>
            <div 
              className="grid grid-cols-2 border-b-2"
              style={{ borderColor: primaryColor }}
            >
              <div 
                className="p-2 sm:p-2.5 text-[10px] sm:text-xs border-r-2"
                style={{ borderColor: primaryColor }}
              >
                <span className="font-bold" style={{ color: primaryColor }}>Ref:</span> {quotationRef}
              </div>
              <div className="p-2 sm:p-2.5 text-[10px] sm:text-xs">
                <span className="font-bold" style={{ color: primaryColor }}>Date:</span> {date}
              </div>
            </div>
            <div 
              className="p-2 sm:p-2.5 text-[10px] sm:text-xs border-b-2"
              style={{ borderColor: primaryColor }}
            >
              <span className="font-bold" style={{ color: primaryColor }}>GST No:</span> {firm.gst}
            </div>
            <div className="p-2 sm:p-3 text-center bg-gray-50">
              <p 
                className="font-bold  mb-1 text-[10px] sm:text-xs"
                style={{ color: primaryColor }}
              >
                KINDLY PLACE YOUR ORDER ON
              </p>
              <p 
                className="font-bold mt-1.5 text-xs sm:text-sm"
                style={{ color: primaryColor }}
              >
                {firm.tradeName || firm.name}
              </p>
              <p className="text-[10px] mt-1 leading-snug">
                {firm.address}
              </p>
              <p className="text-[10px] mt-1 font-medium">
                Phone: {firm.phone.join(', ')}
              </p>
              {firm.email && (
                <p className="text-[10px] mt-0.5">
                  Email: {firm.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-2">
        <p className="text-[10px] sm:text-xs mb-1">Dear Sir/Madam,</p>
        <p className="text-[10px] sm:text-xs leading-snug text-gray-700">
          With reference to your inquiry, we are pleased to quote our best prices as below:
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-[10px] sm:text-xs border-collapse">
          <thead>
            <tr 
              className="text-black"
              style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
            >
              <th className="p-1.5 sm:p-2 text-center w-8 sm:w-10">#</th>
              <th className="p-1.5 sm:p-2 text-left">DESCRIPTION</th>
              <th className="p-1.5 sm:p-2 text-center w-12 sm:w-14">QTY</th>
              <th className="p-1.5 sm:p-2 text-right w-20 sm:w-24">UNIT PRICE</th>
              <th className="p-1.5 sm:p-2 text-right w-20 sm:w-24">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'}>
                <td className="p-1.5 sm:p-2 border border-gray-300 text-center align-top">{index + 1}</td>
                <td className="p-1.5 sm:p-2 border border-gray-300">
                  <span className="font-bold text-[10px] sm:text-xs" style={{ color: primaryColor }}>
                    {item.description || ''}
                  </span>
                  {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {item.specifications.map((spec, i) => 
                        spec && spec.trim() && (
                          <div key={i} className="ml-2 sm:ml-3 text-[9px] sm:text-[10px] text-gray-600">• {spec}</div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td className="p-1.5 sm:p-2 border border-gray-300 text-center align-top">{item.qty}</td>
                <td className="p-1.5 sm:p-2 border border-gray-300 text-right align-top">₹{Number(item.price || 0).toFixed(2)}</td>
                <td className="p-1.5 sm:p-2 border border-gray-300 text-right align-top">₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
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
                <tr className="bg-blue-50/50">
                  <td colSpan="4" className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold">Sub-Total</td>
                  <td className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold">₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold">GST @ 18%</td>
                  <td className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold">₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr className="bg-blue-50/50">
                  <td colSpan="4" className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold">Round Off</td>
                  <td className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr style={{ background: lightBg }}>
                  <td colSpan="4" 
                    className="p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: primaryColor }}
                  >
                    Grand Total
                  </td>
                  <td 
                    className="p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: primaryColor }}
                  >
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
          className="text-[10px] sm:text-xs font-bold mb-3 p-2 sm:p-2.5 rounded-lg"
          style={{ color: primaryColor, background: lightBg }}
        >
          <span className="uppercase tracking-wider">Amount in words:</span> {numberToWords(grandTotal)}
        </div>
      )} */}

      {/* Terms and Footer */}
      <div className="mt-3">
        <p 
          className="font-bold text-sm sm:text-base mb-2 uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          Terms and Conditions:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="p-2 bg-gray-50 rounded border border-gray-200">
            <span className="font-bold block mb-2 text-[10px] sm:text-xs" style={{ color: primaryColor }}>Payment:</span>
            <span className="text-[10px] sm:text-xs">{formData.terms?.payment || firm.defaultTerms.payment}</span>
          </div>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">
            <span className="font-bold block mb-2 text-[10px] sm:text-xs" style={{ color: primaryColor }}>Delivery:</span>
            <span className="text-[10px] sm:text-xs">{formData.terms?.delivery || firm.defaultTerms.delivery}</span>
          </div>
        </div>

        <div className="text-[9px] sm:text-[10px] text-gray-600 mb-3 space-y-1 pl-1">
          <p className="flex items-start">
            <span className="mr-1.5" style={{ color: primaryColor }}>•</span>
            This is a computer generated quotation
          </p>
          <p className="flex items-start">
            <span className="mr-1.5" style={{ color: primaryColor }}>•</span>
            Prices are subject to change without prior notice
          </p>
          <p className="flex items-start">
            <span className="mr-1.5" style={{ color: primaryColor }}>•</span>
            Goods once sold will not be taken back
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4 pt-3 border-t-2 border-dashed"
             style={{ borderColor: primaryColor }}>
          <div className="text-[9px] sm:text-[10px] space-y-1">
            <p className="font-bold text-xs sm:text-sm mb-1" style={{ color: primaryColor }}>Bank Details:</p>
            <p><span className="font-medium">Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span className="font-medium">A/c No:</span> {firm.bankDetails.accountNo}</p>
            <p><span className="font-medium">IFSC:</span> {firm.bankDetails.ifsc}</p>
            {firm.bankDetails.branch && (
              <p><span className="font-medium">Branch:</span> {firm.bankDetails.branch}</p>
            )}
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">
            {/* {firm.signature && (
              <img
                src={firm.signature}
                alt="signature"
                className="max-w-[80px] sm:max-w-[100px] h-auto mx-auto sm:mx-0 mb-1"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )} */}
            <p 
              className="border-t-2 pt-1.5 mt-1.5 font-bold text-xs sm:text-sm inline-block"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-3 border-t-2" style={{ borderColor: primaryColor }} />
        <p className="text-center text-[9px] sm:text-[10px] text-gray-600 leading-snug">
          {firm.address} | Ph: {firm.phone.join(', ')} {firm.email && `| Email: ${firm.email}`}
        </p>
      </div>
    </div>
  );
}