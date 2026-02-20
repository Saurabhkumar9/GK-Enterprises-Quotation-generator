import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SwatiTemplate({
  firm, formData, quotationRef, date, items,
  subTotal, gstAmount, roundOff, grandTotal
}) {
  const primaryColor = '#0f766e';
  const secondaryColor = '#115e59';
  const lightBg = '#f0fdfa';

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-2 sm:p-3">
      {/* Header */}
      <div className="border-2 p-2 sm:p-3 mb-2 rounded-t-xl rounded-br-xl bg-[#5eddbf] relative shadow-sm"
        style={{ borderColor: primaryColor }}
      >
        <div className="absolute top-2 right-3 opacity-60">
          <img
            src="/logo/as.png"
            alt="Logo"
            className="h-6 w-auto sm:h-16 object-contain"
          />
        </div>

        <h2 className="text-center text-xl font-bold sm:text-xl  tracking-wider uppercase"
          style={{ color: 'black' }}>
          Quotation
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-4 mt-1.5 text-[9px] sm:text-xs">
          <span>Ref: {quotationRef}</span>
          <span className="hidden sm:inline">|</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2">

        {/* Customer */}
        <div className="bg-white p-2 sm:p-3 rounded shadow-sm border"
          >
          <div className="inline-block text-black px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[9px] sm:text-xs mb-1"
            >
            CUSTOMER DETAILS:
          </div>

          <p className="font-semibold text-[10px] sm:text-xs">To,</p>
          <p className="font-bold text-xs sm:text-sm mt-0.5"
            style={{ color: primaryColor }}>
            {formData.customer?.name || ''}
          </p>
          <p className="mt-1 text-[9px] sm:text-xs leading-snug">
            {formData.customer?.address || ''}
          </p>

          {formData.customer?.gst && (
            <p className="mt-1 text-[9px] sm:text-xs">
              <span className="font-medium">GST:</span> {formData.customer.gst}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="bg-white p-2 sm:p-3 rounded shadow-sm border"
          style={{ borderColor: lightBg }}>
          <div className="inline-block text-black px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[9px] sm:text-xs mb-1"
            >
            COMPANY :
          </div>

          <p className="text-[9px] sm:text-xs">
            <span className="font-medium">GST No:</span> {firm.gst}
          </p>

          <p className="font-bold mt-1 text-xs sm:text-sm"
            style={{ color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>

          <p className="text-[8px] sm:text-[10px] mt-1 leading-snug">{firm.address}</p>
          <p className="text-[8px] sm:text-[10px] mt-1">Ph : {firm.phone.join(', ')}</p>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-2 p-2 bg-gradient-to-r from-white to-gray-50 border-l-4 rounded-r"
        style={{ borderLeftColor: primaryColor }}>
        <p className="font-medium text-[9px] sm:text-xs">
          Subject:
        </p>
        <p className="mt-1 text-[9px] sm:text-xs">Dear Sir/Madam,</p>
        <p className="mt-2 text-[9px] sm:text-xs leading-snug">
          With reference to your esteemed inquiry, we are delighted to present our most competitive quotation:
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-2">
        <table className="w-full text-[8px] sm:text-xs border-collapse">
          <thead>
            <tr className="text-black" style={{ background: primaryColor }}>
              <th className="p-1 sm:p-1.5 text-center w-6 sm:w-8">#</th>
              <th className="p-1 sm:p-1.5 text-left">Description</th>
              <th className="p-1 sm:p-1.5 text-center w-10 sm:w-12">Qty</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20">Unit Price</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-teal-50/30'}>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-center align-top">{index + 1}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300">
                  <span className="font-semibold text-[8px] sm:text-xs"
                    style={{ color: secondaryColor }}>
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
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-medium">
                    Sub-Total
                  </td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-medium">
                    ₹{subTotal.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-medium">
                    GST @ 18%
                  </td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-medium">
                    ₹{gstAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-1 sm:p-1.5 border border-gray-300 text-right font-medium">
                    Round Off
                  </td>
                  <td className="p-1 sm:p-1.5 border border-gray-300 text-right font-medium">
                    ₹{roundOff.toFixed(2)}
                  </td>
                </tr>

                <tr style={{ background: lightBg }}>
                  <td colSpan="4" className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: primaryColor }}>
                    Grand Total
                  </td>
                  <td className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: primaryColor }}>
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
        <div className="p-1.5 sm:p-2 mb-2 bg-teal-50 border border-dashed rounded text-center"
          style={{ borderColor: primaryColor }}>
          <p className="font-medium text-[8px] sm:text-xs">
            <span className="font-bold">Amount in words:</span>{' '}
            {numberToWords(grandTotal)}
          </p>
        </div>
      )} */}

      {/* Terms */}
      <div>
        <h3 className="font-medium text-xs sm:text-sm mb-3"
          style={{ color: primaryColor }}>
          Terms & Conditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
          <div className="bg-white p-1.5 rounded border border-gray-200">
            <span className="font-bold text-[8px] sm:text-[10px]" style={{ color: primaryColor }}>Payment:</span>
            <p className="mt-2 text-[8px] sm:text-[10px]">
              {formData.terms?.payment || firm.defaultTerms.payment}
            </p>
          </div>

          <div className="bg-white p-1.5 rounded border border-gray-200">
            <span className="font-bold text-[8px] sm:text-[10px]" style={{ color: primaryColor }}>Delivery:</span>
            <p className="mt-2 text-[8px] sm:text-[10px]">
              {formData.terms?.delivery || firm.defaultTerms.delivery}
            </p>
          </div>
        </div>

        <div className="text-[7px] sm:text-[9px] text-gray-600 mb-2 p-2 bg-gray-50 rounded space-y-0.5">
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            This is a computer generated quotation
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mt-2 pt-4"
             style={{ borderColor: primaryColor }}>
          <div className="text-[7px] sm:text-[9px] space-y-0.5">
            <p className="font-bold text-[8px] sm:text-xs mt-2" style={{ color: primaryColor }}>
              Bank Account Details:
            </p>
            <p><span className="font-medium">Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span className="font-medium">A/c No:</span> {firm.bankDetails.accountNo}</p>
            <p><span className="font-medium">IFSC:</span> {firm.bankDetails.ifsc}</p>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">
            {/* {firm.signature && (
              <img
                src={firm.signature}
                alt="signature"
                className="max-w-[60px] sm:max-w-[80px] mx-auto sm:mx-0 mt-2"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )} */}
            <p className="border-t-2 pt-1 mt-1 font-medium text-[8px] sm:text-xs inline-block"
              style={{ borderColor: primaryColor, color: primaryColor }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-2 border-t-2" style={{ borderColor: primaryColor }} />
        <p className="text-center text-[7px] sm:text-[8px] text-gray-500 leading-snug">
          {firm.address} | Phone: {firm.phone.join(', ')}
        </p>
      </div>
    </div>
  );
}