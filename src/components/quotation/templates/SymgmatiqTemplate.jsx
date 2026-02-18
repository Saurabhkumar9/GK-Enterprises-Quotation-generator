import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SymgmatiqTemplate({
  firm, formData, quotationRef, date, items,
  subTotal, gstAmount, roundOff, grandTotal
}) {
  const primaryColor = '#4a148c';
  const secondaryColor = '#7b1fa2';
  const lightBg = '#f3e5f5';

  return (
    <div className="template-container">
      {/* Corporate Purple Theme */}
      <div
        className="text-white p-4 sm:p-5 mb-4 shadow-lg relative overflow-hidden rounded"
        style={{
          background: primaryColor,
        }}
      >

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 relative z-10">
          <div>

            <h1 className="text-xl sm:text-2xl font-bold mt-1">QUOTATION</h1>
          </div>
          <div
            className="bg-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-xl sm:text-2xl shadow"
            style={{ color: primaryColor }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="40,40 140,100 40,160" fill="black" />
              <polygon points="80,40 180,100 80,160" fill="black" />
              <polygon points="60,60 130,100 60,140" fill="#e5093f" />
              <polygon points="100,60 170,100 100,140" fill="#e5093f" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-3 text-xs sm:text-sm opacity-90 gap-1">
          <span>Ref: {quotationRef}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div
          className="p-3 sm:p-4 rounded-r"
          style={{
            background: lightBg,
            borderLeft: `4px solid ${primaryColor}`
          }}
        >
          <h3 className="text-sm sm:text-base font-bold mb-2" style={{ color: primaryColor }}>BILL TO</h3>
          <p className="font-bold text-sm sm:text-base">{formData.customer?.name || '_________________'}</p>
          <p className="text-xs sm:text-sm leading-relaxed mt-1">{formData.customer?.address || '_________________'}</p>
          {formData.customer?.gst && (
            <p className="text-xs mt-1" style={{ color: primaryColor }}>GST: {formData.customer.gst}</p>
          )}
        </div>

        <div
          className="bg-white p-3 sm:p-4 border rounded"
          style={{ borderColor: lightBg }}
        >
          <h3 className="text-sm sm:text-base font-bold mb-2" style={{ color: primaryColor }}>DETAILS</h3>
          <p className="text-xs sm:text-sm"><span className="font-bold">GST No:</span> {firm.gst}</p>
          <p className="font-semibold mt-2 text-xs sm:text-sm" style={{ color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>
          <p className="text-xs mt-1 leading-relaxed">{firm.address}</p>
          <p className="text-xs mt-1">📞 {firm.phone.join(', ')}</p>
        </div>
      </div>

      {/* Subject */}
      <div
        className="mb-4 bg-gradient-to-r from-white to-gray-50 p-3 border-b-2"
        style={{ borderBottomColor: primaryColor }}
      >
        <p className="font-bold text-xs sm:text-sm" style={{ color: primaryColor }}>
          Subject: Quotation for your requirement
        </p>
        <p className="mt-2 text-xs sm:text-sm">Dear Sir/Madam,</p>
        <p className="mt-1 text-xs sm:text-sm leading-relaxed">
          We thank you for your inquiry and are pleased to provide our most competitive quotation as detailed below:
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-black" style={{ background: secondaryColor }}>
              <th className="p-2 text-center w-8 sm:w-10">#</th>
              <th className="p-2 text-left">DESCRIPTION</th>
              <th className="p-2 text-center w-12 sm:w-16">QTY</th>
              <th className="p-2 text-right w-20 sm:w-24">UNIT PRICE</th>
              <th className="p-2 text-right w-20 sm:w-24">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">
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
                  <td colSpan="4"
                    className="p-3 border text-right font-bold text-sm sm:text-base"
                    style={{ color: primaryColor }}
                  >
                    GRAND TOTAL
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

      {/* Amount in Words */}
      {/* {grandTotal > 0 && (
        <div 
          className="p-3 mb-4 rounded-r bg-gradient-to-r from-purple-50 to-white"
          style={{ borderLeft: `4px solid ${primaryColor}` }}
        >
          <p className="font-bold text-xs sm:text-sm" style={{ color: primaryColor }}>
            Amount in words: {numberToWords(grandTotal)}
          </p>
        </div>
      )} */}

      {/* Terms and Footer */}
      <div>
        <h3 className="text-sm sm:text-base font-bold mb-1" style={{ color: primaryColor }}>
          Terms and Conditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 p-2 text-xs sm:text-sm rounded">
            <span className="font-bold" style={{ color: primaryColor }}>Payment:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </div>
          <div className="bg-gray-50 p-2 text-xs sm:text-sm rounded">
            <span className="font-bold" style={{ color: primaryColor }}>Delivery:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4 space-y-1">
          <p>• This quotation is valid for 30 days</p>
          <p>• Prices are subject to market fluctuations</p>
          <p>• Delivery schedule subject to order confirmation</p>
          <p>• This is a computer generated document</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
          <div className="text-xs">
            <p className="font-bold text-sm mb-2" style={{ color: primaryColor }}>Bank Details:</p>
            <p>Bank: {firm.bankDetails.bankName}</p>
            <p>Account No: {firm.bankDetails.accountNo}</p>
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
          {firm.address} | Phone: {firm.phone.join(', ')}
        </p>
      </div>
    </div>
  );
}