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
    <div className="w-full max-w-4xl mx-auto bg-white p-2 sm:p-3">
      {/* Header */}
      <div
        className="border-b pb-1.5 mb-2"
        style={{ borderColor: primaryColor }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
          <div>
            <h1
              className="text-base sm:text-lg font-semibold"
              style={{ color: primaryColor }}
            >
              {firm.name}
            </h1>
            <p className="text-[9px] sm:text-xs text-gray-600">{firm.address}</p>
          </div>

          <div className="absolute top-2 right-3 opacity-60">
            <img
              src="/logo/guru.png"
              alt="Logo"
              className="h-6 w-auto sm:h-28 object-contain"
            />
          </div>
        </div>

        <h2
          className="text-center mt-1 text-xs sm:text-sm font-semibold uppercase"
          style={{ color: primaryColor }}
        >
          Quotation
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-2 text-[9px] sm:text-xs text-gray-600  pt-0.5 mt-1 mb-2">
          <span>Ref: {quotationRef}</span>
          <span className="hidden sm:inline">|</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Section */}
      <div
        className="mb-2 border rounded overflow-hidden"
        style={{ borderColor: primaryColor }}
      >
        <div
          className="text-white px-2 py-3 font-semibold text-[10px] sm:text-xs"
          style={{ background: primaryColor }}
        >
          Customer Information
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
          <div className="sm:pr-2 sm:border-r" style={{ borderColor: primaryColor }}>
            <p className="font-semibold mt-2 text-[10px] sm:text-xs" style={{ color: primaryColor }}>
            CUSTOMER DETAILS:
            </p>
            <p className="font-medium text-xs sm:text-sm">
              {formData.customer?.name || ''}
            </p>
            <p className="text-[9px] sm:text-xs mt-2 leading-snug">
              {formData.customer?.address || ''}
            </p>
            {formData.customer?.gst && (
              <p className="text-[9px] sm:text-xs mt-2" style={{ color: primaryColor }}>
                GST: {formData.customer.gst}
              </p>
            )}
          </div>

          <div>
            <p className="text-[9px] sm:text-xs">
              <span className="font-semibold" style={{ color: primaryColor }}>
                GST No:
              </span>{' '}
              {firm.gst}
            </p>
            <p className="text-[9px] sm:text-xs mt-1 font-medium">
              {firm.tradeName || firm.name}
            </p>
            <p className="text-[8px] sm:text-[10px] mt-2 leading-snug">{firm.address}</p>
            <p className="text-[8px] sm:text-[10px] mt-2">
              Ph: {firm.phone.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div
        className="mb-2 p-1.5 sm:p-2 text-[9px] sm:text-xs"
        style={{ background: lightBg }}
      >
        <p className="font-semibold" style={{ color: primaryColor }}>
          Subject: Quotation for your requirement
        </p>
        <p className="mt-2">
          Thank you for your inquiry. Please find our quotation below:
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-2">
        <table className="w-full text-[8px] sm:text-xs border-collapse">
          <thead>
            <tr
              className="text-black"
              style={{ background: primaryColor }}
            >
              <th className="p-1 sm:p-1.5 text-center w-6 sm:w-8">#</th>
              <th className="p-1 sm:p-1.5 text-left">Description</th>
              <th className="p-1 sm:p-1.5 text-center w-10 sm:w-12">Qty</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20">Unit Price</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-center align-top">{index + 1}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300">
                  <span
                    className="font-medium text-[8px] sm:text-xs"
                    style={{ color: secondaryColor }}
                  >
                    {item.description || ''}
                  </span>
                  {item.specifications?.filter(s => s?.trim()).length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      {item.specifications.map((spec, i) =>
                        spec?.trim() && (
                          <div key={i} className="ml-1.5 sm:ml-2 text-[7px] sm:text-[9px] text-gray-600">
                            • {spec}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-center align-top">{item.qty}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-right align-top">
                  ₹{Number(item.price || 0).toFixed(2)}
                </td>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-right align-top">
                  ₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}
                </td>
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
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-semibold">
                    Sub-Total
                  </td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-semibold">
                    ₹{subTotal.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-semibold">
                    GST @ 18%
                  </td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-semibold">
                    ₹{gstAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-semibold">
                    Round Off
                  </td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-semibold">
                    ₹{roundOff.toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-green-50/50">
                  <td
                    colSpan="4"
                    className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: secondaryColor }}
                  >
                    Grand Total
                  </td>
                  <td
                    className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: secondaryColor }}
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
        <p
          className="text-[8px] sm:text-xs font-semibold mb-2 p-1.5 sm:p-2 border-l-4"
          style={{ borderLeftColor: primaryColor, background: lightBg }}
        >
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )} */}

      {/* Footer */}
      <div className="text-[8px] sm:text-xs leading-snug">
        <p className="font-semibold mb-3 text-xs sm:text-sm" style={{ color: primaryColor }}>
          Terms & Conditions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="p-2  rounded border ">
            <span className="font-semibold block mt-2 text-[7px] sm:text-[9px]" style={{ color: primaryColor }}>Payment:</span>
            <span className="text-[7px] sm:text-[9px]">{formData.terms?.payment || firm.defaultTerms.payment}</span>
          </div>
          <div className="p-2  rounded border ">
            <span className="font-semibold block mt-2 text-[7px] sm:text-[9px]" style={{ color: primaryColor }}>Delivery:</span>
            <span className="text-[7px] sm:text-[9px]">{formData.terms?.delivery || firm.defaultTerms.delivery}</span>
          </div>
        </div>

        <ul className="pl-3 mb-2 space-y-0.5 text-[7px] sm:text-[8px] text-gray-600">
          <li className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Valid for 15 days
          </li>
          <li className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Goods once sold will not be taken back
          </li>
          <li className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Prices subject to change without notice
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mt-2 pt-4 "
          style={{ borderColor: primaryColor }}>
          <div className="text-[7px] sm:text-[9px] space-y-0.5">
            <p className="font-semibold text-[8px] sm:text-xs mt-2" style={{ color: primaryColor }}>Bank Details:</p>
            <p><span className="font-medium">Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span className="font-medium">A/c No:</span> {firm.bankDetails.accountNo}</p>
            <p><span className="font-medium">IFSC:</span> {firm.bankDetails.ifsc}</p>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">
            {/* {firm.signature && (
              <img
                src={firm.signature}
                alt="signature"
                className="max-w-[60px] sm:max-w-[80px] h-auto mx-auto sm:mx-0 mt-2"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )} */}
            <p
              className="border-t-2 pt-1 mt-1 font-semibold text-[8px] sm:text-xs inline-block"
              style={{ borderColor: primaryColor, color: secondaryColor }}
            >
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}