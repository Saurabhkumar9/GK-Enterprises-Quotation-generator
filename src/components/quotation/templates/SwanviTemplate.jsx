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
    <div className="template-container">
      {/* Modern Header with Gradient */}
      <div 
        className="text-white p-3 sm:p-4 mb-4 text-center relative rounded-t-lg"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
      >
        <h2 className="text-xl sm:text-2xl my-1 font-medium uppercase tracking-wider">
          QUOTATION
        </h2>
        <div className="text-xs sm:text-sm opacity-90 border-t border-white/30 pt-2 mt-2">
          {firm.name}
        </div>
        <div className="absolute top-2 right-3 text-white text-opacity-20 text-4xl sm:text-5xl font-bold">
          {firm.initials}
        </div>
      </div>

      {/* Customer Box with Blue Border */}
      <div 
        className="border-2 rounded-lg mb-4 overflow-hidden shadow-sm"
        style={{ borderColor: primaryColor }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div 
            className="p-3 sm:p-4 sm:border-r-2"
            style={{ background: lightBg, borderColor: primaryColor }}
          >
            <p 
              className="font-bold mb-2 text-xs sm:text-sm uppercase"
              style={{ color: primaryColor }}
            >
              CUSTOMER DETAILS:
            </p>
            <p className="font-bold text-xs sm:text-sm">To,</p>
            <p 
              className="font-bold mt-1 text-sm sm:text-base"
              style={{ color: primaryColor }}
            >
              {formData.customer?.name || '_________________'}
            </p>
            <p className="leading-relaxed mt-2 text-xs sm:text-sm">
              {formData.customer?.address || '_________________'}
            </p>
            {formData.customer?.gst && (
              <p className="mt-2 text-xs sm:text-sm font-medium">
                GST: {formData.customer.gst}
              </p>
            )}
          </div>

          <div>
            <div 
              className="grid grid-cols-2 border-b-2"
              style={{ borderColor: primaryColor }}
            >
              <div 
                className="p-2 sm:p-3 text-xs sm:text-sm border-r-2"
                style={{ borderColor: primaryColor }}
              >
                <span className="font-bold" style={{ color: primaryColor }}>Ref:</span> {quotationRef}
              </div>
              <div className="p-2 sm:p-3 text-xs sm:text-sm">
                <span className="font-bold" style={{ color: primaryColor }}>Date:</span> {date}
              </div>
            </div>
            <div 
              className="p-2 sm:p-3 text-xs sm:text-sm border-b-2"
              style={{ borderColor: primaryColor }}
            >
              <span className="font-bold" style={{ color: primaryColor }}>GST No:</span> {firm.gst}
            </div>
            <div className="p-3 sm:p-4 text-center bg-gray-50">
              <p 
                className="font-bold underline mb-2 text-xs sm:text-sm"
                style={{ color: primaryColor }}
              >
                KINDLY PLACE YOUR ORDER ON
              </p>
              <p 
                className="font-bold mt-2 text-sm sm:text-base"
                style={{ color: primaryColor }}
              >
                {firm.tradeName || firm.name}
              </p>
              <p className="text-xs mt-1 leading-relaxed">
                {firm.address}
              </p>
              <p className="text-xs mt-1">
                Phone: {firm.phone.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <p className="text-xs sm:text-sm mb-1">Dear Sir/Madam,</p>
        <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
          With reference to your inquiry, we are pleased to quote our best prices as below:
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr 
              className="text-black"
              style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
            >
              <th className="p-2 sm:p-3 text-center w-8 sm:w-10">#</th>
              <th className="p-2 sm:p-3 text-left">DESCRIPTION</th>
              <th className="p-2 sm:p-3 text-center w-12 sm:w-16">QTY</th>
              <th className="p-2 sm:p-3 text-right w-20 sm:w-24">UNIT PRICE</th>
              <th className="p-2 sm:p-3 text-right w-20 sm:w-24">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                <td className="p-2 sm:p-3 border text-center">{index + 1}</td>
                <td className="p-2 sm:p-3 border">
                  <span className="font-bold text-xs sm:text-sm" style={{ color: primaryColor }}>
                    {item.description || '_________________'}
                  </span>
                  {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                    <div className="mt-1">
                      {item.specifications.map((spec, i) => 
                        spec && spec.trim() && (
                          <div key={i} className="ml-2 sm:ml-4 text-xs text-gray-600">• {spec}</div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td className="p-2 sm:p-3 border text-center">{item.qty}</td>
                <td className="p-2 sm:p-3 border text-right">₹{Number(item.price || 0).toFixed(2)}</td>
                <td className="p-2 sm:p-3 border text-right">₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400 border">
                  No items added
                </td>
              </tr>
            )}

            {items.length > 0 && (
              <>
                <tr className="bg-blue-50">
                  <td colSpan="4" className="p-2 sm:p-3 border text-right font-bold">Sub-Total</td>
                  <td className="p-2 sm:p-3 border text-right font-bold">₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-2 sm:p-3 border text-right font-bold">GST @ 18%</td>
                  <td className="p-2 sm:p-3 border text-right font-bold">₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr className="bg-blue-50">
                  <td colSpan="4" className="p-2 sm:p-3 border text-right font-bold">Round Off</td>
                  <td className="p-2 sm:p-3 border text-right font-bold">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr style={{ background: lightBg }}>
                  <td colSpan="4" 
                    className="p-3 border text-right font-bold text-sm sm:text-base"
                    style={{ color: primaryColor }}
                  >
                    Grand Total
                  </td>
                  <td 
                    className="p-3 border text-right font-bold text-sm sm:text-base"
                    style={{ color: primaryColor }}
                  >
                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Amount in Words
      {grandTotal > 0 && (
        <p 
          className="text-xs sm:text-sm font-bold mb-4 p-2 sm:p-3 rounded"
          style={{ color: primaryColor, background: lightBg }}
        >
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )} */}

      {/* Terms and Footer */}
      <div>
        <p 
          className="font-bold text-sm sm:text-base mb-1"
          style={{ color: primaryColor }}
        >
          Terms and Conditions:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="p-2 bg-gray-50 rounded">
            <span className="font-bold">Payment:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="font-bold">Delivery:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4 space-y-1">
          <p>• This is a computer generated quotation</p>
          <p>• Prices are subject to change without prior notice</p>
          <p>• Goods once sold will not be taken back</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4 py-3 border-t border-dashed">
          <div className="text-xs">
            <p className="font-bold mb-2" style={{ color: primaryColor }}>Bank Details:</p>
            <p>Bank: {firm.bankDetails.bankName}</p>
            <p>A/c No: {firm.bankDetails.accountNo}</p>
            <p>IFSC: {firm.bankDetails.ifsc}</p>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">
            <img
              src={firm.signature}
              alt="signature"
              className="max-w-[80px] sm:max-w-[100px] h-auto mx-auto sm:mx-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p 
              className="border-t-2 pt-2 mt-2 font-bold text-xs sm:text-sm"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: primaryColor }} />
        <p className="text-center text-xs text-gray-600">
          {firm.address} | Ph: {firm.phone.join(', ')}
        </p>
      </div>
    </div>
  );
}