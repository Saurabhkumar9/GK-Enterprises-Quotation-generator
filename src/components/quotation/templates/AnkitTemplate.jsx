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
    <>
      {/* Bold Orange Theme */}
      <div style={{ 
        background: primaryColor,
        color: 'white',
        padding: '20px 25px 25px',
        marginBottom: '25px',
        borderRadius: '0 0 30px 30px',
        boxShadow: '0 8px 20px rgba(230,81,0,0.4)',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute',
          bottom: '15px',
          right: '20px',
          fontSize: '60px',
          fontWeight: 'bold',
          opacity: 0.1,
          color: 'white'
        }}>
          {firm.initials}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ fontSize: '14px', opacity: 0.9, letterSpacing: '1px' }}>{firm.name}</div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '5px 0 0', letterSpacing: '2px' }}>QUOTATION</h1>
          </div>
          <div style={{ 
            background: 'white', 
            color: primaryColor, 
            padding: '10px 25px',
            borderRadius: '40px',
            fontWeight: 'bold',
            fontSize: '32px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            {firm.initials}
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px', 
          fontSize: '14px', 
          background: 'rgba(255,255,255,0.2)',
          padding: '10px 15px',
          borderRadius: '50px'
        }}>
          <span>Reference: {quotationRef}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Section with Bold Design */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '25px'
      }}>
        <div style={{ 
          background: lightBg,
          padding: '20px',
          borderRadius: '15px',
          borderLeft: `8px solid ${primaryColor}`,
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
          <div style={{ 
            background: primaryColor,
            color: 'white',
            display: 'inline-block',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            CUSTOMER DETAILS
          </div>
          <p style={{ fontWeight: 'bold', fontSize: '16px', color: secondaryColor }}>To,</p>
          <p style={{ fontWeight: '800', fontSize: '18px', color: primaryColor, marginTop: '8px' }}>
            {formData.customer?.name || '_________________'}
          </p>
          <p style={{ lineHeight: '1.6', marginTop: '10px', fontSize: '14px' }}>
            {formData.customer?.address || '_________________'}
          </p>
          {formData.customer?.gst && (
            <p style={{ marginTop: '10px', fontSize: '14px', fontWeight: '500', color: secondaryColor }}>
              GST: {formData.customer.gst}
            </p>
          )}
        </div>

        <div style={{ 
          background: '#fff',
          padding: '20px',
          borderRadius: '15px',
          border: `2px solid ${lightBg}`,
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
          <div style={{ 
            background: secondaryColor,
            color: 'white',
            display: 'inline-block',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            COMPANY INFO
          </div>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', color: secondaryColor }}>GST No:</span> {firm.gst}
          </p>
          <p style={{ fontSize: '14px', marginTop: '12px', fontWeight: 'bold', color: secondaryColor }}>Place orders with:</p>
          <p style={{ fontWeight: '800', marginTop: '5px', fontSize: '16px', color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>
          <p style={{ fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }}>{firm.address}</p>
          <p style={{ fontSize: '13px', marginTop: '8px' }}>📞 {firm.phone.join(', ')}</p>
          <p style={{ fontSize: '13px', marginTop: '5px' }}>✉ {firm.email}</p>
        </div>
      </div>

      {/* Subject */}
      <div style={{ 
        marginBottom: '25px',
        padding: '15px 20px',
        background: 'linear-gradient(145deg, #fff, #f5f5f5)',
        border: `1px solid ${lightBg}`,
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5px',
          height: '100%',
          background: primaryColor
        }}></div>
        <p style={{ fontWeight: 'bold', color: secondaryColor, marginBottom: '8px' }}>Subject: Quotation for your requirement</p>
        <p>Dear Sir/Madam,</p>
        <p style={{ marginTop: '8px', lineHeight: '1.6' }}>
          We thank you for your inquiry and are pleased to submit our best quotation as under:
        </p>
      </div>

      {/* Items Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ background: primaryColor, color: 'white' }}>
            <th style={{ padding: '15px 10px', textAlign: 'center', width: '40px' }}>#</th>
            <th style={{ padding: '15px 10px', textAlign: 'left' }}>DESCRIPTION</th>
            <th style={{ padding: '15px 10px', textAlign: 'center', width: '60px' }}>QTY</th>
            <th style={{ padding: '15px 10px', textAlign: 'right', width: '100px' }}>UNIT PRICE (₹)</th>
            <th style={{ padding: '15px 10px', textAlign: 'right', width: '100px' }}>TOTAL (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map((item, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? '#fff' : '#fff9f0' }}>
              <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2' }}>
                <span style={{ fontWeight: 'bold', color: secondaryColor }}>{item.description || '_________________'}</span>
                {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                  <div style={{ marginTop: '5px' }}>
                    {item.specifications.map((spec, i) => 
                      spec && spec.trim() && (
                        <div key={i} style={{ marginLeft: '15px', fontSize: '11px', color: '#666' }}>• {spec}</div>
                      )
                    )}
                  </div>
                )}
              </td>
              <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'center' }}>{item.qty}</td>
              <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right' }}>₹{Number(item.price || 0).toFixed(2)}</td>
              <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right' }}>₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ padding: '30px', border: '1px solid #ffe0b2', textAlign: 'center', color: '#999' }}>
                No items added
              </td>
            </tr>
          )}

          {items.length > 0 && (
            <>
              <tr>
                <td colSpan="4" style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: 'bold' }}>Sub-Total</td>
                <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: 'bold' }}>₹{subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: 'bold' }}>GST @ 18%</td>
                <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: 'bold' }}>₹{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: 'bold' }}>Round Off</td>
                <td style={{ padding: '12px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: 'bold' }}>₹{roundOff.toFixed(2)}</td>
              </tr>
              <tr style={{ background: lightBg }}>
                <td colSpan="4" style={{ padding: '15px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: '800', fontSize: '16px', color: primaryColor }}>GRAND TOTAL</td>
                <td style={{ padding: '15px 10px', border: '1px solid #ffe0b2', textAlign: 'right', fontWeight: '800', fontSize: '16px', color: primaryColor }}>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Amount in Words */}
      {grandTotal > 0 && (
        <div style={{ 
          background: primaryColor,
          color: 'white',
          padding: '15px 20px',
          marginBottom: '25px',
          borderRadius: '10px',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          boxShadow: '0 4px 10px rgba(230,81,0,0.3)'
        }}>
          Amount in words: {numberToWords(grandTotal)}
        </div>
      )}

      {/* Terms and Footer */}
      <div>
        <h3 style={{ color: primaryColor, fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>TERMS & CONDITIONS</h3>
        <div style={{ width: '80px', height: '4px', background: primaryColor, marginBottom: '20px' }}></div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            background: lightBg,
            padding: '15px',
            borderRadius: '10px',
            border: `1px solid ${primaryColor}`
          }}>
            <span style={{ fontWeight: 'bold', color: primaryColor, fontSize: '15px' }}> Payment Terms:</span>
            <p style={{ marginTop: '8px', fontSize: '14px', fontWeight: '500' }}>{formData.terms?.payment || firm.defaultTerms.payment}</p>
          </div>
          <div style={{ 
            background: lightBg,
            padding: '15px',
            borderRadius: '10px',
            border: `1px solid ${primaryColor}`
          }}>
            <span style={{ fontWeight: 'bold', color: primaryColor, fontSize: '15px' }}> Delivery Terms:</span>
            <p style={{ marginTop: '8px', fontSize: '14px', fontWeight: '500' }}>{formData.terms?.delivery || firm.defaultTerms.delivery}</p>
          </div>
        </div>

        <div style={{ 
          background: '#fff',
          padding: '15px',
          borderRadius: '10px',
          border: `1px solid ${lightBg}`,
          marginBottom: '25px',
          fontSize: '13px'
        }}>
          <p style={{ marginBottom: '8px' }}>• This quotation is valid for 15 days</p>
          <p style={{ marginBottom: '8px' }}>• Prices are subject to change without prior notice</p>
          <p style={{ marginBottom: '8px' }}>• Goods once sold will not be taken back or exchanged</p>
          <p>• This is a computer generated document, no signature required</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '13px' }}>
            <p style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '12px', fontSize: '15px' }}> Bank Details:</p>
            <p><span style={{ fontWeight: '600' }}>Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span style={{ fontWeight: '600' }}>Account No:</span> {firm.bankDetails.accountNo}</p>
            <p><span style={{ fontWeight: '600' }}>IFSC:</span> {firm.bankDetails.ifsc}</p>
            <p><span style={{ fontWeight: '600' }}>Branch:</span> {firm.bankDetails.branch}</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src={firm.signature}
              alt="signature"
              style={{ maxWidth: '100px', height: 'auto', margin: '0 auto' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p style={{ 
              borderTop: `3px solid ${primaryColor}`, 
              paddingTop: '10px', 
              marginTop: '10px', 
              width: '160px',
              fontWeight: 'bold',
              color: primaryColor,
              fontSize: '14px'
            }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr style={{ marginTop: '30px', border: 'none', borderTop: `2px solid ${primaryColor}` }} />
        <p style={{ 
          textAlign: 'center', 
          marginTop: '15px', 
          fontSize: '12px',
          color: '#666',
          fontWeight: '500'
        }}>
          {firm.address} | Phone: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </>
  );
}