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
    <div className="template-container">
      {/* Header with Firm Initials */}
      <div 
        className="text-white px-4 sm:px-6 py-3 sm:py-5 mb-4 sm:mb-6 rounded-b-lg relative"
        style={{ background: primaryColor }}
      >
        <div className="absolute bottom-2 right-3 text-3xl sm:text-5xl font-bold opacity-10 text-white">
          {firm.initials}
        </div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <div className="text-xs sm:text-sm opacity-90">{firm.name}</div>
            <h1 className="text-xl sm:text-3xl font-bold mt-1">QUOTATION</h1>
          </div>
          <div 
            className="bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-lg sm:text-2xl shadow"
            style={{ color: primaryColor }}
          >
            {firm.initials}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-3 text-xs sm:text-sm gap-1">
          <span>Ref: {quotationRef}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div 
          className="p-3 sm:p-4 rounded"
          style={{ background: lightBg }}
        >
          <div 
            className="text-white inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs font-bold mb-2"
            style={{ background: primaryColor }}
          >
            CUSTOMER
          </div>
          <p className="font-bold text-xs sm:text-sm">To,</p>
          <p className="font-bold text-sm sm:text-base mt-1" style={{ color: primaryColor }}>
            {formData.customer?.name || '_________________'}
          </p>
          <p className="text-xs sm:text-sm mt-1 leading-relaxed">
            {formData.customer?.address || '_________________'}
          </p>
          {formData.customer?.gst && (
            <p className="mt-2 text-xs sm:text-sm">
              GST: {formData.customer.gst}
            </p>
          )}
        </div>

        <div className="p-3 sm:p-4 border rounded">
          <div 
            className="text-white inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs font-bold mb-2"
            style={{ background: secondaryColor }}
          >
            COMPANY
          </div>
          <p className="text-xs sm:text-sm">
            <span className="font-bold">GST:</span> {firm.gst}
          </p>
          <p className="font-bold mt-2 text-xs sm:text-sm" style={{ color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>
          <p className="text-xs mt-1 leading-relaxed">{firm.address}</p>
          <p className="text-xs mt-1">📞 {firm.phone.join(', ')}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr style={{ background: primaryColor }} className="text-black">
              <th className="p-2 text-center w-8 sm:w-10">#</th>
              <th className="p-2 text-left">DESCRIPTION</th>
              <th className="p-2 text-center w-12 sm:w-16">QTY</th>
              <th className="p-2 text-right w-20 sm:w-24">UNIT PRICE</th>
              <th className="p-2 text-right w-20 sm:w-24">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">
                  <span className="font-bold text-xs sm:text-sm" style={{ color: secondaryColor }}>
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
                <td className="p-2 border text-center">{item.qty}</td>
                <td className="p-2 border text-right">₹{Number(item.price || 0).toFixed(2)}</td>
                <td className="p-2 border text-right">₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
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
                <tr>
                  <td colSpan="4" className="p-2 border text-right font-bold">Sub-Total</td>
                  <td className="p-2 border text-right font-bold">₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-2 border text-right font-bold">GST @ 18%</td>
                  <td className="p-2 border text-right font-bold">₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-2 border text-right font-bold">Round Off</td>
                  <td className="p-2 border text-right font-bold">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr style={{ background: lightBg }}>
                  <td colSpan="4" className="p-3 border text-right font-bold text-sm sm:text-base">
                    GRAND TOTAL
                  </td>
                  <td className="p-3 border text-right font-bold text-sm sm:text-base" style={{ color: primaryColor }}>
                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
          className="p-2 sm:p-3 mb-4 text-white text-xs sm:text-sm font-bold rounded"
          style={{ background: primaryColor }}
        >
          Amount in words: {numberToWords(grandTotal)}
        </div>
      )} */}

      {/* Terms and Footer */}
      <div className="text-xs sm:text-sm">
        <h3 className="font-bold mb-1" style={{ color: primaryColor }}>Terms & Conditions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="p-2 bg-gray-50 rounded">
            <span className="font-bold">Payment:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="font-bold">Delivery:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </div>
        </div>

        <div className="space-y-1 mb-4 text-xs">
          <p>• This quotation is valid for 15 days</p>
          <p>• Prices are subject to change without prior notice</p>
          <p>• Goods once sold will not be taken back</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <p className="font-bold mb-1" style={{ color: primaryColor }}>Bank Details:</p>
            <p>Bank: {firm.bankDetails.bankName}</p>
            <p>A/c No: {firm.bankDetails.accountNo}</p>
            <p>IFSC: {firm.bankDetails.ifsc}</p>
          </div>

          <div className="text-center sm:text-right">
            <img
              src={firm.signature}
              alt="signature"
              className="max-w-[80px] sm:max-w-[100px] h-auto mx-auto sm:mx-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p className="border-t mt-2 pt-1 font-bold text-xs sm:text-sm" style={{ borderColor: primaryColor }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: primaryColor }} />
        <p className="text-center text-xs text-gray-600">
          {firm.address} | Phone: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </div>
  );
}