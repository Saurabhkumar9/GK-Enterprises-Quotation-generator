import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function GKTemplate({
  firm, formData, quotationRef, date, items,
  subTotal, gstAmount, roundOff, grandTotal
}) {
  return (
    <>
      {/* Header with Firm Initials - Always on Right */}
      <div className="absolute top-[25px] right-[25px] text-red-700 text-4xl font-bold z-10 tracking-wide">
        {firm.initials}
      </div>

      {/* Quotation Title - Perfectly Centered */}
      <div className="text-center mt-[15px] mb-[30px] w-full relative z-1">
        <h2 className="text-xl font-bold m-0 uppercase tracking-wider">
          QUOTATION
        </h2>
        <div className="border-b-2 border-black w-[120px] mx-auto mt-2"></div>
      </div>

      <div className="border border-black rounded mt-3 grid grid-cols-[2fr_3fr] text-xs leading-tight">

        {/* Left Side */}
        <div className="border-r border-black p-1.5">
          <p className="font-bold mb-2">CUSTOMER DETAILS:</p>
          <p className="font-bold">To,</p>
          <p className="font-bold">{formData.customer?.name || ''}</p>
          <p>{formData.customer?.address || ''}</p>
          {formData.customer?.gst && (
            <p>GST: {formData.customer.gst}</p>
          )}
        </div>

        {/* Right Side */}
        <div>
          <div className="grid grid-cols-2 border-b border-black">
            <div className="p-1.5 border-r border-black">
              <span className="font-semibold">Ref:</span> {quotationRef}
            </div>
            <div className="p-1.5">
              <span className="font-semibold">Date:</span> {date}
            </div>
          </div>

          <div className="border-b border-black p-1.5">
            <span className="font-semibold">GST No:</span> {firm.gst}
          </div>

          <div className="px-1 py-1 text-center text-[11px] leading-[1.2]">
            <p className="font-bold m-0">KINDLY PLACE YOUR ORDER ON</p>
            <p className="font-bold m-0">{firm.tradeName || firm.name}</p>
            <p className="m-0">{firm.address}</p>
            <p className="m-0">Phone: {firm.phone.join(', ')}</p>
            <p className="m-0">Email: {firm.email}</p>
          </div>

        </div>

      </div>


      {/* Subject Line */}
      <div className="mt-4">
        <p className="text-xs">Subject: </p>
        <p className="text-xs">Dear Sir/Madam,</p>
        <p className="text-xs ">
          This is reference to our mentioned subject. We are quoting you the best price for the same. Which prices and description is as mentioned below:
        </p>
      </div>

      {/* Items Table */}
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border border-black p-2 text-center w-10">S.No</th>
              <th className="border border-black p-2 text-left">DESCRIPTION</th>
              <th className="border border-black p-2 text-center w-[50px]">QTY</th>
              <th className="border border-black p-2 text-right w-[90px]">UNIT PRICE (₹)</th>
              <th className="border border-black p-2 text-right w-[90px]">TOTAL (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index}>
                <td className="border border-black p-2 text-center align-top">{index + 1}</td>
                <td className="border border-black p-2">
                  <span className="font-semibold">{item.description || ''}</span>
                  {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                    <div className="mt-1 text-gray-600">
                      {item.specifications.map((spec, i) =>
                        spec && spec.trim() && (
                          <div key={i} className="ml-4 text-[11px]">• {spec}</div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td className="border border-black p-2 text-center align-top">{item.qty}</td>
                <td className="border border-black p-2 text-right align-top">₹{Number(item.price || 0).toFixed(2)}</td>
                <td className="border border-black p-2 text-right align-top">₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="border border-black p-4 text-center text-gray-400">
                  No items added
                </td>
              </tr>
            )}

            {items.length > 0 && (
              <>
                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-medium">Sub-Total</td>
                  <td className="border border-black p-2 text-right">₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-medium">GST @ 18%</td>
                  <td className="border border-black p-2 text-right">₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-medium">Round Off</td>
                  <td className="border border-black p-2 text-right">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="border border-black p-2 font-bold text-right bg-gray-50">Grand Total</td>
                  <td className="border border-black p-2 font-bold text-right bg-gray-50">
                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Amount in Words */}
      {grandTotal > 0 && (
        <p className="text-xs mt-3 font-semibold">
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )}

      {/* Terms and Footer */}
      <div className="mt-2 text-xs">
        <p className="font-bold">Terms and Conditions:</p>
        <div className="w-20 mt-0.5 border-b border-black"></div>

        <div className="mt-2">
          <p className="font-semibold">• Payment: {formData.terms?.payment || firm.defaultTerms.payment}</p>
          <p className="font-semibold">• Delivery: {formData.terms?.delivery || firm.defaultTerms.delivery}</p>
        </div>

        <p className="mt-3">• This is a computer generated quotation and does not require signature.</p>
        <p>• Prices are subject to change without prior notice.</p>
        <p>• Goods once sold will not be taken back.</p>

        <div className="flex justify-between mt-2 gap-3 no-break">
          <div className="text-xs">
            <p className="font-bold mb-1">Bank Details:</p>
            <p>Bank: {firm.bankDetails.bankName}</p>
            <p>A/c No: {firm.bankDetails.accountNo}</p>
            <p>IFSC: {firm.bankDetails.ifsc}</p>
            <p>Branch: {firm.bankDetails.branch}</p>
          </div>

          <div className="text-center ">
            <div className="mt-2">
              <img
                src={firm.signature}
                alt="signature"
                className="max-w-[96px] h-auto mx-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p className="border-t border-black pt-1 mt-1 w-32 mx-auto">
                For {firm.tradeName || firm.name}
              </p>
            </div>
          </div>
        </div>


        <div className="mt-2 text-xs no-break">

          <div className="no-break">
            <hr className="mt-5 border-t border-black" />

            <p className="text-center mt-2 text-gray-600">
              {firm.address} | Ph: {firm.phone.join(', ')} | Email: {firm.email}
            </p>
          </div>

        </div>

      </div>
    </>
  );
}