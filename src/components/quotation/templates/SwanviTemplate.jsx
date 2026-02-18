import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SwanviTemplate({ 
  firm, formData, quotationRef, date, items, 
  subTotal, gstAmount, roundOff, grandTotal 
}) {
  const primaryColor = '#1e3c72';
  const secondaryColor = '#2a5298';
  const lightBg = '#f0f5ff';

  return (
    <>
      {/* Modern Header with Gradient */}
      <div style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        color: 'white',
        padding: '20px',
        borderRadius: '8px 8px 0 0',
        marginBottom: '20px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          letterSpacing: '2px',
          marginBottom: '5px'
        }}>
          {firm.initials}
        </div>
        <h2 style={{ 
          fontSize: '24px', 
          margin: '5px 0', 
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '3px'
        }}>
          QUOTATION
        </h2>
        <div style={{ 
          fontSize: '14px', 
          opacity: 0.9,
          borderTop: '1px solid rgba(255,255,255,0.3)',
          paddingTop: '8px',
          marginTop: '8px'
        }}>
          {firm.name}
        </div>
      </div>

      {/* Customer Box with Blue Border */}
      <div style={{ 
        border: `2px solid ${primaryColor}`, 
        borderRadius: '8px',
        marginBottom: '20px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr' }}>
          <div style={{ 
            padding: '15px', 
            background: lightBg, 
            borderRight: `2px solid ${primaryColor}` 
          }}>
            <p style={{ 
              fontWeight: 'bold', 
              color: primaryColor, 
              marginBottom: '10px',
              fontSize: '14px',
              textTransform: 'uppercase'
            }}>
              CUSTOMER DETAILS:
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '13px' }}>To,</p>
            <p style={{ 
              fontWeight: 'bold', 
              marginTop: '8px',
              fontSize: '14px',
              color: primaryColor
            }}>
              {formData.customer?.name || '_________________'}
            </p>
            <p style={{ 
              lineHeight: '1.5', 
              marginTop: '8px',
              fontSize: '13px' 
            }}>
              {formData.customer?.address || '_________________'}
            </p>
            {formData.customer?.gst && (
              <p style={{ 
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                GST: {formData.customer.gst}
              </p>
            )}
          </div>

          <div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              borderBottom: `2px solid ${primaryColor}` 
            }}>
              <div style={{ 
                padding: '12px', 
                borderRight: `2px solid ${primaryColor}`,
                fontSize: '13px'
              }}>
                <span style={{ fontWeight: 'bold', color: primaryColor }}>Ref:</span> {quotationRef}
              </div>
              <div style={{ 
                padding: '12px',
                fontSize: '13px'
              }}>
                <span style={{ fontWeight: 'bold', color: primaryColor }}>Date:</span> {date}
              </div>
            </div>
            <div style={{ 
              padding: '12px', 
              borderBottom: `2px solid ${primaryColor}`,
              fontSize: '13px'
            }}>
              <span style={{ fontWeight: 'bold', color: primaryColor }}>GST No:</span> {firm.gst}
            </div>
            <div style={{ 
              padding: '15px', 
              textAlign: 'center',
              background: '#fafafa'
            }}>
              <p style={{ 
                fontWeight: 'bold', 
                color: primaryColor, 
                textDecoration: 'underline',
                marginBottom: '8px',
                fontSize: '13px'
              }}>
                KINDLY PLACE YOUR ORDER ON
              </p>
              <p style={{ 
                fontWeight: 'bold', 
                marginTop: '8px',
                fontSize: '14px',
                color: primaryColor
              }}>
                {firm.tradeName || firm.name}
              </p>
              <p style={{ 
                fontSize: '12px',
                marginTop: '5px',
                lineHeight: '1.5'
              }}>
                {firm.address}
              </p>
              <p style={{ 
                fontSize: '12px',
                marginTop: '5px'
              }}>
                Phone: {firm.phone.join(', ')} | Email: {firm.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ 
          fontSize: '13px',
          fontWeight: '500',
          color: primaryColor,
          marginBottom: '8px'
        }}>
          Subject: Quotation for your requirement
        </p>
        <p style={{ fontSize: '13px', marginBottom: '5px' }}>Dear Sir/Madam,</p>
        <p style={{ 
          fontSize: '13px', 
          lineHeight: '1.5',
          color: '#333'
        }}>
          With reference to your inquiry, we are pleased to quote our best prices as below:
        </p>
      </div>

      {/* Items Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
      }}>
        <thead>
          <tr style={{ 
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`, 
            color: 'white' 
          }}>
            <th style={{ padding: '12px 8px', border: `1px solid ${primaryColor}`, textAlign: 'center', width: '40px' }}>S.No</th>
            <th style={{ padding: '12px 8px', border: `1px solid ${primaryColor}`, textAlign: 'left' }}>DESCRIPTION</th>
            <th style={{ padding: '12px 8px', border: `1px solid ${primaryColor}`, textAlign: 'center', width: '60px' }}>QTY</th>
            <th style={{ padding: '12px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', width: '100px' }}>UNIT PRICE (₹)</th>
            <th style={{ padding: '12px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', width: '100px' }}>TOTAL (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map((item, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8faff' }}>
              <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}` }}>
                <span style={{ fontWeight: 'bold', color: primaryColor }}>{item.description || '_________________'}</span>
                {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                  <div style={{ marginTop: '5px' }}>
                    {item.specifications.map((spec, i) => 
                      spec && spec.trim() && (
                        <div key={i} style={{ marginLeft: '15px', fontSize: '11px', color: '#555' }}>• {spec}</div>
                      )
                    )}
                  </div>
                )}
              </td>
              <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'center' }}>{item.qty}</td>
              <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right' }}>₹{Number(item.price || 0).toFixed(2)}</td>
              <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right' }}>₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ padding: '30px', border: `1px solid ${primaryColor}`, textAlign: 'center', color: '#999' }}>
                No items added
              </td>
            </tr>
          )}

          {items.length > 0 && (
            <>
              <tr style={{ background: '#f8faff' }}>
                <td colSpan="4" style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>Sub-Total</td>
                <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>₹{subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>GST @ 18%</td>
                <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>₹{gstAmount.toFixed(2)}</td>
              </tr>
              <tr style={{ background: '#f8faff' }}>
                <td colSpan="4" style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>Round Off</td>
                <td style={{ padding: '10px 8px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>₹{roundOff.toFixed(2)}</td>
              </tr>
              <tr style={{ background: lightBg }}>
                <td colSpan="4" style={{ 
                  padding: '12px 8px', 
                  border: `1px solid ${primaryColor}`, 
                  textAlign: 'right', 
                  fontWeight: 'bold', 
                  fontSize: '15px',
                  color: primaryColor
                }}>
                  Grand Total
                </td>
                <td style={{ 
                  padding: '12px 8px', 
                  border: `1px solid ${primaryColor}`, 
                  textAlign: 'right', 
                  fontWeight: 'bold', 
                  fontSize: '15px',
                  color: primaryColor
                }}>
                  ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Amount in Words */}
      {grandTotal > 0 && (
        <p style={{ 
          fontSize: '13px', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          color: primaryColor,
          padding: '8px',
          background: lightBg,
          borderRadius: '4px'
        }}>
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )}

      {/* Terms and Footer */}
      <div>
        <p style={{ 
          fontWeight: 'bold', 
          color: primaryColor,
          fontSize: '14px',
          marginBottom: '5px'
        }}>
          Terms and Conditions:
        </p>
        <hr style={{ border: `1px solid ${primaryColor}`, width: '80px', margin: '5px 0 15px' }} />
        
        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '13px', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>• Payment:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </p>
          <p style={{ fontSize: '13px' }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>• Delivery:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </p>
        </div>

        <div style={{ fontSize: '12px', color: '#555', marginBottom: '20px' }}>
          <p>• This is a computer generated quotation and does not require signature.</p>
          <p>• Prices are subject to change without prior notice.</p>
          <p>• Goods once sold will not be taken back.</p>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '25px',
          padding: '15px 0',
          borderTop: `1px dashed ${primaryColor}`
        }}>
          <div style={{ fontSize: '12px' }}>
            <p style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '8px' }}>Bank Details:</p>
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
              width: '160px',
              fontWeight: 'bold',
              color: primaryColor
            }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr style={{ marginTop: '20px', border: `1px solid ${primaryColor}` }} />
        <p style={{ 
          textAlign: 'center', 
          marginTop: '12px', 
          fontSize: '11px',
          color: '#666'
        }}>
          {firm.address} | Ph: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </>
  );
}