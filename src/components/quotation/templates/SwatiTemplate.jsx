import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SwatiTemplate({ 
  firm, formData, quotationRef, date, items, 
  subTotal, gstAmount, roundOff, grandTotal 
}) {
  const primaryColor = '#00695c';
  const secondaryColor = '#004d40';
  const lightBg = '#e0f2f1';

  return (
    <>
      {/* Elegant Teal Theme */}
      <div style={{ 
        border: `2px solid ${primaryColor}`,
        padding: '20px',
        marginBottom: '25px',
        background: lightBg,
        borderRadius: '15px 15px 0 15px',
        position: 'relative',
        boxShadow: '0 5px 15px rgba(0,105,92,0.1)'
      }}>
        <div style={{ 
          position: 'absolute',
          top: '15px',
          right: '20px',
          color: primaryColor,
          fontSize: '28px',
          fontWeight: 'bold',
          fontStyle: 'italic',
          opacity: 0.8
        }}>
          {firm.initials}
        </div>
        <h2 style={{ 
          textAlign: 'center', 
          color: primaryColor,
          fontSize: '28px',
          margin: '5px 0',
          fontWeight: '300',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          QUOTATION
        </h2>
        <div style={{ 
          textAlign: 'center', 
          fontSize: '13px', 
          color: secondaryColor,
          fontStyle: 'italic',
          marginTop: '5px'
        }}>
          {firm.name}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px',
          marginTop: '15px',
          fontSize: '12px',
          color: secondaryColor
        }}>
          <span>Ref: {quotationRef}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Section with Elegant Design */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '25px'
      }}>
        <div style={{ 
          background: '#fff',
          padding: '18px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          border: `1px solid ${lightBg}`
        }}>
          <div style={{ 
            display: 'inline-block',
            background: primaryColor,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            marginBottom: '12px'
          }}>
            CUSTOMER DETAILS
          </div>
          <p style={{ fontWeight: '600', color: secondaryColor, fontSize: '14px' }}>To,</p>
          <p style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor, marginTop: '5px' }}>
            {formData.customer?.name || '_________________'}
          </p>
          <p style={{ lineHeight: '1.6', marginTop: '8px', fontSize: '13px' }}>
            {formData.customer?.address || '_________________'}
          </p>
          {formData.customer?.gst && (
            <p style={{ marginTop: '8px', fontSize: '13px', color: secondaryColor }}>
              <span style={{ fontWeight: '500' }}>GST:</span> {formData.customer.gst}
            </p>
          )}
        </div>

        <div style={{ 
          background: '#fff',
          padding: '18px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          border: `1px solid ${lightBg}`
        }}>
          <div style={{ 
            display: 'inline-block',
            background: primaryColor,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            marginBottom: '12px'
          }}>
            COMPANY DETAILS
          </div>
          <p style={{ fontSize: '13px', marginBottom: '5px' }}>
            <span style={{ fontWeight: '500', color: secondaryColor }}>GST No:</span> {firm.gst}
          </p>
          <p style={{ fontSize: '13px', marginTop: '8px', color: secondaryColor, fontWeight: '500' }}>Place orders on:</p>
          <p style={{ fontWeight: 'bold', marginTop: '5px', fontSize: '15px', color: primaryColor }}>
            {firm.tradeName || firm.name}
          </p>
          <p style={{ fontSize: '12px', marginTop: '5px', lineHeight: '1.5' }}>{firm.address}</p>
          <p style={{ fontSize: '12px', marginTop: '5px' }}>📞 {firm.phone.join(', ')}</p>
          <p style={{ fontSize: '12px', marginTop: '5px' }}>✉ {firm.email}</p>
        </div>
      </div>

      {/* Subject with Elegant Border */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        background: 'linear-gradient(to right, #fff, #f8f8f8)',
        borderLeft: `5px solid ${primaryColor}`,
        borderRadius: '0 8px 8px 0'
      }}>
        <p style={{ fontWeight: '500', color: secondaryColor }}>Subject: Quotation for your kind perusal</p>
        <p style={{ marginTop: '10px' }}>Dear Sir/Madam,</p>
        <p style={{ marginTop: '5px', lineHeight: '1.6', fontSize: '13px' }}>
          With reference to your esteemed inquiry, we are delighted to present our most competitive quotation:
        </p>
      </div>

      {/* Items Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <thead>
          <tr style={{ background: primaryColor, color: 'white' }}>
            <th style={{ padding: '12px', border: 'none', textAlign: 'center', width: '40px' }}>#</th>
            <th style={{ padding: '12px', border: 'none', textAlign: 'left' }}>DESCRIPTION</th>
            <th style={{ padding: '12px', border: 'none', textAlign: 'center', width: '60px' }}>QTY</th>
            <th style={{ padding: '12px', border: 'none', textAlign: 'right', width: '100px' }}>UNIT PRICE (₹)</th>
            <th style={{ padding: '12px', border: 'none', textAlign: 'right', width: '100px' }}>TOTAL (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map((item, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <span style={{ fontWeight: '600', color: secondaryColor }}>{item.description || '_________________'}</span>
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
              <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>{item.qty}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>₹{Number(item.price || 0).toFixed(2)}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ padding: '30px', border: '1px solid #ddd', textAlign: 'center', color: '#999' }}>
                No items added
              </td>
            </tr>
          )}

          {items.length > 0 && (
            <>
              <tr>
                <td colSpan="4" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: '500' }}>Sub-Total</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: '500' }}>₹{subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: '500' }}>GST @ 18%</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: '500' }}>₹{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: '500' }}>Round Off</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: '500' }}>₹{roundOff.toFixed(2)}</td>
              </tr>
              <tr style={{ background: lightBg }}>
                <td colSpan="4" style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>Grand Total</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Amount in Words */}
      {grandTotal > 0 && (
        <div style={{ 
          padding: '12px',
          marginBottom: '20px',
          background: lightBg,
          borderRadius: '8px',
          textAlign: 'center',
          border: `1px dashed ${primaryColor}`
        }}>
          <p style={{ fontWeight: '500', color: secondaryColor }}>
            <span style={{ fontWeight: 'bold' }}>Amount in words:</span> {numberToWords(grandTotal)}
          </p>
        </div>
      )}

      {/* Terms and Footer */}
      <div>
        <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: '500', marginBottom: '5px' }}>Terms & Conditions</h3>
        <div style={{ width: '60px', height: '2px', background: primaryColor, marginBottom: '15px' }}></div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            background: '#fff',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${lightBg}`
          }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>Payment:</span>
            <p style={{ marginTop: '5px', fontSize: '13px' }}>{formData.terms?.payment || firm.defaultTerms.payment}</p>
          </div>
          <div style={{ 
            background: '#fff',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${lightBg}`
          }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>Delivery:</span>
            <p style={{ marginTop: '5px', fontSize: '13px' }}>{formData.terms?.delivery || firm.defaultTerms.delivery}</p>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#555', marginBottom: '25px', padding: '10px', background: '#f9f9f9', borderRadius: '6px' }}>
          <p style={{ marginBottom: '5px' }}>• This is a computer generated quotation, no signature required</p>
          <p style={{ marginBottom: '5px' }}>• Prices are subject to change without prior notice</p>
          <p style={{ marginBottom: '5px' }}>• Goods once sold will not be taken back</p>
          <p>• Quotation valid for 15 days from date of issue</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '12px' }}>
            <p style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '10px', fontSize: '14px' }}>Bank Account Details:</p>
            <p><span style={{ fontWeight: '500' }}>Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span style={{ fontWeight: '500' }}>A/c No:</span> {firm.bankDetails.accountNo}</p>
            <p><span style={{ fontWeight: '500' }}>IFSC:</span> {firm.bankDetails.ifsc}</p>
            <p><span style={{ fontWeight: '500' }}>Branch:</span> {firm.bankDetails.branch}</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src={firm.signature}
              alt="signature"
              style={{ maxWidth: '100px', height: 'auto', margin: '0 auto' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p style={{ 
              borderTop: `2px solid ${primaryColor}`, 
              paddingTop: '8px', 
              marginTop: '8px', 
              width: '150px',
              fontWeight: '500',
              color: primaryColor
            }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr style={{ marginTop: '25px', border: 'none', borderTop: `1px solid ${lightBg}` }} />
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '11px', color: '#666' }}>
          {firm.address} | Phone: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </>
  );
}