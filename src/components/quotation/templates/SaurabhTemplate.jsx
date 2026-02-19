import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SaurabhTemplate({
  firm, formData, quotationRef, date, items,
  subTotal, gstAmount, roundOff, grandTotal
}) {
  const primaryColor = '#2e7d32';
  const secondaryColor = '#1b5e20';
  const lightBg = '#e8f5e9';

  return (
    <div className="template-container">
      {/* Header */}
      <div
        className="border-b pb-2 mb-4"
        style={{ borderColor: primaryColor }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1
              className="text-lg sm:text-xl font-semibold"
              style={{ color: primaryColor }}
            >
              {firm.name}
            </h1>
            <p className="text-xs text-gray-600">{firm.address}</p>
          </div>

        <div
          className="absolute top-3 right-4 opacity-60"
        >
          <img
            src="/logo/guru.png"
            alt="Logo"
            className="h-8 w-auto sm:h-20 object-contain"
          />
        </div>
        </div>

        <h2
          className="text-center mt-2 text-sm sm:text-md font-semibold uppercase"
          style={{ color: primaryColor }}
        >
          Quotation
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-4 text-xs text-gray-600 border-t pt-1 mt-2">
          <span>Ref: {quotationRef}</span>
          <span className="hidden sm:inline">|</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Section */}
      <div
        className="mb-4 border rounded overflow-hidden"
        style={{ borderColor: primaryColor }}
      >
        <div
          className="text-white px-3 py-1.5 font-semibold text-xs sm:text-sm"
          style={{ background: primaryColor }}
        >
          Customer Information
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
          <div className="sm:pr-3 sm:border-r" style={{ borderColor: primaryColor }}>
            <p className="font-semibold mb-1 text-xs sm:text-sm" style={{ color: primaryColor }}>
              Bill To:
            </p>
            <p className="font-medium text-sm">
              {formData.customer?.name || '_________________'}
            </p>
            <p className="text-xs mt-1 leading-relaxed">
              {formData.customer?.address || '_________________'}
            </p>
            {formData.customer?.gst && (
              <p className="text-xs mt-1" style={{ color: primaryColor }}>
                GST: {formData.customer.gst}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs">
              <span className="font-semibold" style={{ color: primaryColor }}>
                GST No:
              </span>{' '}
              {firm.gst}
            </p>
            <p className="text-xs mt-2 font-medium">
              {firm.tradeName || firm.name}
            </p>
            <p className="text-xs mt-1 leading-relaxed">{firm.address}</p>
            <p className="text-xs mt-1">
              Ph: {firm.phone.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div
        className="mb-4 p-2 sm:p-3 text-xs sm:text-sm"
        style={{ background: lightBg }}
      >
        <p className="font-semibold" style={{ color: primaryColor }}>
          Subject: Quotation for your requirement
        </p>
        <p className="mt-1">
          Thank you for your inquiry. Please find our quotation below:
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr
              className="text-black"
              style={{ background: primaryColor }}
            >
              <th className="p-2 text-center w-8 sm:w-10">#</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center w-12 sm:w-16">Qty</th>
              <th className="p-2 text-right w-20 sm:w-24">Unit Price</th>
              <th className="p-2 text-right w-20 sm:w-24">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">
                  <span
                    className="font-medium text-xs sm:text-sm"
                    style={{ color: secondaryColor }}
                  >
                    {item.description || '_________________'}
                  </span>
                  {item.specifications?.filter(s => s?.trim()).length > 0 && (
                    <div className="mt-1">
                      {item.specifications.map((spec, i) =>
                        spec?.trim() && (
                          <div key={i} className="ml-2 sm:ml-3 text-xs text-gray-600">
                            • {spec}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td className="p-2 border text-center">{item.qty}</td>
                <td className="p-2 border text-right">
                  ₹{Number(item.price || 0).toFixed(2)}
                </td>
                <td className="p-2 border text-right">
                  ₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}
                </td>
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
                  <td colSpan="4" className="p-2 border text-right font-semibold">
                    Sub-Total
                  </td>
                  <td className="p-2 border text-right font-semibold">
                    ₹{subTotal.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-2 border text-right font-semibold">
                    GST @ 18%
                  </td>
                  <td className="p-2 border text-right font-semibold">
                    ₹{gstAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-2 border text-right font-semibold">
                    Round Off
                  </td>
                  <td className="p-2 border text-right font-semibold">
                    ₹{roundOff.toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-green-50">
                  <td
                    colSpan="4"
                    className="p-3 border text-right font-bold text-sm"
                    style={{ color: secondaryColor }}
                  >
                    Grand Total
                  </td>
                  <td
                    className="p-3 border text-right font-bold text-sm"
                    style={{ color: secondaryColor }}
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
          className="text-xs sm:text-sm font-semibold mb-4 p-2 sm:p-3 border-l-4"
          style={{ borderLeftColor: primaryColor, background: lightBg }}
        >
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )} */}

      {/* Footer */}
      <div className="text-xs leading-relaxed">
        <p className="font-semibold mb-2" style={{ color: primaryColor }}>
          Terms & Conditions
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="p-2 bg-gray-50 rounded">
            <span className="font-semibold">Payment:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <span className="font-semibold">Delivery:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </div>
        </div>

        <ul className="list-disc pl-4 mb-4 space-y-1">
          <li>Valid for 15 days</li>
          <li>Goods once sold will not be taken back</li>
          <li>Prices subject to change without notice</li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
          <div>
            <p className="font-semibold mb-1" style={{ color: primaryColor }}>Bank Details:</p>
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
              className="border-t mt-2 pt-1 font-semibold text-xs sm:text-sm"
              style={{ borderColor: primaryColor }}
            >
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}