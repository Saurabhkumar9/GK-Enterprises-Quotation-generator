import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SymgmatiqTemplate({
  firm, formData, quotationRef, date, items,
  subTotal, gstAmount, roundOff, grandTotal
}) {
  // Updated color scheme - lighter purple background to make red logo stand out
  const primaryColor = '#b91c1c'; // Rich red for accents (matches logo)
  const secondaryColor = '#f3f4f6'; // Light gray for table headers
  const lightBg = '#fee2e2'; // Light red background for highlights
  const headerBg = '#ffffff'; // White header background

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-2 sm:p-3">
      {/* Header with white background to make red logo pop */}
      <div
  className="p-2 sm:p-3 mb-2 bg-white shadow-md relative rounded overflow-hidden border-b-2"
  style={{ borderBottomColor: primaryColor }}
>
  <div className="relative flex items-center justify-between">

    {/* Left Side - QUOTATION */}
    <h1
      className="text-lg sm:text-xl font-bold z-10"
      style={{ color: primaryColor }}
    >
      QUOTATION
    </h1>

    {/* Center - Company Name */}
    <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
      <h2 className="text-sm sm:text-lg font-bold  tracking-wide" style={{ color: primaryColor }}>
        SYGMATIQ TECHNOSOFT PVT. LTD.
      </h2>
      <p className="text-[2px] sm:text-xs text-black font-medium tracking-wider">
        BETTER SERVICE, BETTER PRODUCT
      </p>
    </div>

    {/* Right Side - Logo */}
    <div className="z-10">
      <img
        src="/logo/syg.png"
        alt="Logo"
        className="h-10 sm:h-16 w-auto object-contain"
      />
    </div>
  </div>

  {/* Bottom Info Row */}
  <div className="flex flex-col sm:flex-row sm:justify-between mt-2 text-[9px] sm:text-xs text-gray-600 gap-0.5">
    <span>Ref: {quotationRef}</span>
    <span>Date: {date}</span>
  </div>
</div>


      {/* Customer Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2">
        <div
          className="p-2 sm:p-3 rounded-r"
          style={{
            background: lightBg,
            borderLeft: `4px solid ${primaryColor}`
          }}
        >
          <h3 className="text-xs sm:text-sm font-bold mb-1" style={{ color: primaryColor }}>CUSTOMER DETAILS:</h3>
          <p className="font-bold text-xs sm:text-sm">{formData.customer?.name || ''}</p>
          <p className="text-[9px] sm:text-xs leading-snug mt-0.5">{formData.customer?.address || ''}</p>
          {formData.customer?.gst && (
            <p className="text-[9px] sm:text-xs mt-0.5" style={{ color: primaryColor }}>GST: {formData.customer.gst}</p>
          )}
        </div>

        <div
          className="bg-white p-2 sm:p-3 border rounded"
          style={{ borderColor: lightBg }}
        >
          <h3 className="text-xs sm:text-sm font-bold mb-1" style={{ color: primaryColor }}>DETAILS</h3>
          <p className="text-[9px] sm:text-xs"><span className="font-bold">GST No:</span> {firm.gst}</p>
          <p className="font-semibold mt-1 text-[9px] sm:text-xs" style={{ color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>
          <p className="text-[8px] sm:text-[10px] mt-0.5 leading-snug">{firm.address}</p>
          <p className="text-[8px] sm:text-[10px] mt-0.5">Ph : {firm.phone.join(', ')}</p>
        </div>
      </div>

      {/* Subject */}
      <div
        className="mb-2 bg-gradient-to-r from-red-50 to-white p-2 border-b-2"
        style={{ borderBottomColor: primaryColor }}
      >
        <p className="font-bold text-[9px] sm:text-xs" style={{ color: primaryColor }}>
          Subject: 
        </p>
        <p className="mt-1 text-[9px] sm:text-xs">Dear Sir/Madam,</p>
        <p className="mt-0.5 text-[9px] sm:text-xs leading-snug">
          We thank you for your inquiry and are pleased to provide our most competitive quotation as detailed below:
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-2">
        <table className="w-full text-[8px] sm:text-xs border-collapse">
          <thead>
            <tr style={{ background: secondaryColor }}>
              <th className="p-1 sm:p-1.5 text-center w-6 sm:w-8 border border-gray-300">#</th>
              <th className="p-1 sm:p-1.5 text-left border border-gray-300">DESCRIPTION</th>
              <th className="p-1 sm:p-1.5 text-center w-10 sm:w-12 border border-gray-300">QTY</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20 border border-gray-300">UNIT PRICE</th>
              <th className="p-1 sm:p-1.5 text-right w-16 sm:w-20 border border-gray-300">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-red-50/30'}>
                <td className="p-1 sm:p-1.5 border border-gray-300 text-center align-top">{index + 1}</td>
                <td className="p-1 sm:p-1.5 border border-gray-300">
                  <span className="font-bold text-[8px] sm:text-xs" style={{ color: primaryColor }}>
                    {item.description || ''}
                  </span>
                  {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                    <div className="mt-0.5 space-y-0.5">
                      {item.specifications.map((spec, i) =>
                        spec && spec.trim() && (
                          <div key={i} className="ml-1.5 sm:ml-2 text-[7px] sm:text-[9px] text-gray-600">• {spec}</div>
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
                  <td colSpan="4"
                    className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
                    style={{ color: primaryColor }}
                  >
                    GRAND TOTAL
                  </td>
                  <td
                    className="p-1.5 sm:p-2 border border-gray-300 text-right font-bold text-xs sm:text-sm"
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

      {/* Amount in Words - Uncommented */}
      {/* {grandTotal > 0 && (
        <div 
          className="p-1.5 sm:p-2 mb-2 rounded-r bg-gradient-to-r from-red-50 to-white"
          style={{ borderLeft: `4px solid ${primaryColor}` }}
        >
          <p className="font-bold text-[8px] sm:text-xs" style={{ color: primaryColor }}>
            Amount in words: {numberToWords(grandTotal)}
          </p>
        </div>
      )} */}

      {/* Terms and Footer */}
      <div>
        <h3 className="text-xs sm:text-sm font-bold mb-4" style={{ color: primaryColor }}>
          Terms and Conditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2">
          <div className="bg-gray-50 p-1.5 text-[8px] sm:text-[10px] rounded border ">
            <span className="font-bold block mb-2" style={{ color: primaryColor }}>Payment:</span>
            <span>{formData.terms?.payment || firm.defaultTerms.payment}</span>
          </div>
          <div className="bg-gray-50 p-1.5 text-[8px] sm:text-[10px] rounded border ">
            <span className="font-bold block mb-2" style={{ color: primaryColor }}>Delivery:</span>
            <span>{formData.terms?.delivery || firm.defaultTerms.delivery}</span>
          </div>
        </div>

        <div className="text-[7px] sm:text-[9px] text-gray-600 mb-2 space-y-0.5 pl-1">
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            This quotation is valid for 30 days
          </p>
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Prices are subject to market fluctuations
          </p>
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            Delivery schedule subject to order confirmation
          </p>
          <p className="flex items-start">
            <span className="mr-1" style={{ color: primaryColor }}>•</span>
            This is a computer generated document
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mt-3 pt-3 "
             style={{ borderColor: primaryColor }}>
          <div className="text-[7px] sm:text-[9px] space-y-0.5">
            <p className="font-bold text-[8px] sm:text-xs mb-2" style={{ color: primaryColor }}>Bank Details:</p>
            <p><span className="font-medium">Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span className="font-medium">Account No:</span> {firm.bankDetails.accountNo}</p>
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
              className="border-t-2 pt-1 mt-1 font-bold text-[8px] sm:text-xs inline-block"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr className="my-2 border-t-2" style={{ borderColor: primaryColor }} />
        <p className="text-center text-[7px] sm:text-[8px] text-gray-600 leading-snug">
          {firm.address} | Phone: {firm.phone.join(', ')}
        </p>
      </div>
    </div>
  );
}