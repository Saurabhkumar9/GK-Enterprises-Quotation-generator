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
    <div className="template-container">
      {/* Header */}
      <div className="border-2 p-4 sm:p-5 mb-4 rounded-t-xl rounded-br-xl relative shadow-sm"
        style={{ borderColor: primaryColor, background: lightBg }}
      >
        <div
          className="absolute top-3 right-4 opacity-60"
        >
          <img
            src="/logo/as.png"
            alt="Logo"
            className="h-8 w-auto sm:h-20 object-contain"
          />
        </div>


        <h2 className="text-center text-xl sm:text-2xl font-light tracking-wider uppercase"
          style={{ color: primaryColor }}>
          Quotation
        </h2>

       

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 mt-3 text-xs">
          <span>Ref: {quotationRef}</span>
          <span className="hidden sm:inline">|</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">

        {/* Customer */}
        <div className="bg-white p-3 sm:p-4 rounded shadow-sm border"
          style={{ borderColor: lightBg }}>
          <div className="inline-block text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs mb-2"
            style={{ background: primaryColor }}>
            CUSTOMER
          </div>

          <p className="font-semibold text-xs sm:text-sm">To,</p>
          <p className="font-bold text-sm sm:text-base mt-1"
            style={{ color: primaryColor }}>
            {formData.customer?.name || '_________________'}
          </p>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed">
            {formData.customer?.address || '_________________'}
          </p>

          {formData.customer?.gst && (
            <p className="mt-2 text-xs">
              <span className="font-medium">GST:</span> {formData.customer.gst}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="bg-white p-3 sm:p-4 rounded shadow-sm border"
          style={{ borderColor: lightBg }}>
          <div className="inline-block text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs mb-2"
            style={{ background: secondaryColor }}>
            COMPANY
          </div>

          <p className="text-xs">
            <span className="font-medium">GST No:</span> {firm.gst}
          </p>

          <p className="font-bold mt-2 text-sm sm:text-base"
            style={{ color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>

          <p className="text-xs mt-1 leading-relaxed">{firm.address}</p>
          <p className="text-xs mt-1">📞 {firm.phone.join(', ')}</p>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-4 p-3 bg-gradient-to-r from-white to-gray-50 border-l-4 rounded-r"
        style={{ borderLeftColor: primaryColor }}>
        <p className="font-medium text-xs sm:text-sm">
          Subject:
        </p>
        <p className="mt-2 text-xs sm:text-sm">Dear Sir/Madam,</p>
        <p className="mt-1 text-xs sm:text-sm leading-relaxed">
          With reference to your esteemed inquiry, we are delighted to present our most competitive quotation:
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-black" style={{ background: primaryColor }}>
              <th className="p-2 text-center w-8 sm:w-10">#</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center w-12 sm:w-16">Qty</th>
              <th className="p-2 text-right w-20 sm:w-24">Unit Price</th>
              <th className="p-2 text-right w-20 sm:w-24">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-teal-50'}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">
                  <span className="font-semibold text-xs sm:text-sm"
                    style={{ color: secondaryColor }}>
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
                  <td colSpan="4" className="p-2 border text-right font-medium">
                    Sub-Total
                  </td>
                  <td className="p-2 border text-right font-medium">
                    ₹{subTotal.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-2 border text-right font-medium">
                    GST @ 18%
                  </td>
                  <td className="p-2 border text-right font-medium">
                    ₹{gstAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="p-2 border text-right font-medium">
                    Round Off
                  </td>
                  <td className="p-2 border text-right font-medium">
                    ₹{roundOff.toFixed(2)}
                  </td>
                </tr>

                <tr style={{ background: lightBg }}>
                  <td colSpan="4" className="p-3 border text-right font-bold text-sm sm:text-base"
                    style={{ color: primaryColor }}>
                    Grand Total
                  </td>
                  <td className="p-3 border text-right font-bold text-sm sm:text-base"
                    style={{ color: primaryColor }}>
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
        <div className="p-3 mb-4 bg-teal-50 border border-dashed rounded text-center"
          style={{ borderColor: primaryColor }}>
          <p className="font-medium text-xs sm:text-sm">
            <span className="font-bold">Amount in words:</span>{' '}
            {numberToWords(grandTotal)}
          </p>
        </div>
      )} */}

      {/* Terms */}
      <div>
        <h3 className="font-medium text-sm sm:text-base mb-1"
          style={{ color: primaryColor }}>
          Terms & Conditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="bg-white p-2 rounded border">
            <span className="font-bold text-xs" style={{ color: primaryColor }}>Payment:</span>
            <p className="mt-1 text-xs">
              {formData.terms?.payment || firm.defaultTerms.payment}
            </p>
          </div>

          <div className="bg-white p-2 rounded border">
            <span className="font-bold text-xs" style={{ color: primaryColor }}>Delivery:</span>
            <p className="mt-1 text-xs">
              {formData.terms?.delivery || firm.defaultTerms.delivery}
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4 p-3 bg-gray-50 rounded space-y-1">
          <p>• This is a computer generated quotation</p>
          <p>• Prices are subject to change without prior notice</p>
          <p>• Goods once sold will not be taken back</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
          <div className="text-xs">
            <p className="font-bold mb-2 text-sm" style={{ color: primaryColor }}>
              Bank Account Details:
            </p>
            <p>Bank: {firm.bankDetails.bankName}</p>
            <p>A/c No: {firm.bankDetails.accountNo}</p>
            <p>IFSC: {firm.bankDetails.ifsc}</p>
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">
            <img
              src={firm.signature}
              alt="signature"
              className="max-w-[80px] sm:max-w-[100px] mx-auto sm:mx-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p className="border-t-2 pt-2 mt-2 font-medium text-xs sm:text-sm"
              style={{ borderColor: primaryColor, color: primaryColor }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: primaryColor }} />
        <p className="text-center text-xs text-gray-500">
          {firm.address} | Phone: {firm.phone.join(', ')}
        </p>
      </div>
    </div>
  );
}