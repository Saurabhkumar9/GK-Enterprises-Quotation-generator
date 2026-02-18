import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function GKTemplate({ 
  firm, formData, quotationRef, date, items, 
  subTotal, gstAmount, roundOff, grandTotal 
}) {
  return (
    <>
      {/* Header with Firm Initials - Always on Right */}
      <div 
        style={{
          position: 'absolute',
          top: '25px',
          right: '25px',
          color: '#b91c1c',
          fontSize: '36px',
          fontWeight: 'bold',
          zIndex: 10,
          letterSpacing: '1px'
        }}
      >
        {firm.initials}
      </div>

      {/* Quotation Title - Perfectly Centered */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '15px', 
        marginBottom: '30px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          QUOTATION
        </h2>
        <div style={{ 
          borderBottom: '2px solid black', 
          width: '120px',
          margin: '8px auto 0'
        }}></div>
      </div>

      {/* Customer Box */}
      <div style={{ 
        border: '1px solid black', 
        borderRadius: '4px', 
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        fontSize: '12px'
      }}>
        <div style={{ 
          borderRight: '1px solid black', 
          padding: '8px'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>CUSTOMER DETAILS:</p>
          <p style={{ marginTop: '4px', fontWeight: 'bold' }}>To,</p>
          <p style={{ fontWeight: 'bold', marginTop: '4px' }}>{formData.customer?.name || '_________________'}</p>
          <p style={{ lineHeight: '1.4', marginTop: '4px' }}>{formData.customer?.address || '_________________'}</p>
          {formData.customer?.gst && (
            <p style={{ marginTop: '4px' }}>GST: {formData.customer.gst}</p>
          )}
        </div>

        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            borderBottom: '1px solid black' 
          }}>
            <div style={{ 
              padding: '8px', 
              borderRight: '1px solid black' 
            }}>
              <span style={{ fontWeight: '600' }}>Ref:</span> {quotationRef}
            </div>
            <div style={{ padding: '8px' }}>
              <span style={{ fontWeight: '600' }}>Date:</span> {date}
            </div>
          </div>

          <div style={{ 
            borderBottom: '1px solid black', 
            padding: '8px' 
          }}>
            <span style={{ fontWeight: '600' }}>GST No:</span> {firm.gst}
          </div>

          <div style={{ 
            padding: '8px', 
            textAlign: 'center' 
          }}>
            <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>KINDLY PLACE YOUR ORDER ON</p>
            <p style={{ fontWeight: 'bold', marginTop: '4px' }}>{firm.tradeName || firm.name}</p>
            <p style={{ lineHeight: '1.4' }}>{firm.address}</p>
            <p>Phone: {firm.phone.join(', ')}</p>
            <p>Email: {firm.email}</p>
          </div>
        </div>
      </div>

      {/* Subject Line */}
      <div style={{ marginTop: '16px' }}>
        <p style={{ fontSize: '12px' }}>Subject: </p>
        <p style={{ fontSize: '12px' }}>Dear Sir/Madam,</p>
        <p style={{ fontSize: '12px', lineHeight: '1.4' }}>
          This is reference to our mentioned subject. We are quoting you the best price for the same. Which prices and description is as mentioned below:
        </p>
      </div>

      {/* Items Table */}
      <div style={{ marginTop: '12px', overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '12px'
        }}>
          <thead>
            <tr>
              <th style={{ 
                border: '1px solid black', 
                padding: '8px', 
                textAlign: 'center',
                width: '40px'
              }}>S.No</th>
              <th style={{ 
                border: '1px solid black', 
                padding: '8px', 
                textAlign: 'left'
              }}>DESCRIPTION</th>
              <th style={{ 
                border: '1px solid black', 
                padding: '8px', 
                textAlign: 'center',
                width: '50px'
              }}>QTY</th>
              <th style={{ 
                border: '1px solid black', 
                padding: '8px', 
                textAlign: 'right',
                width: '90px'
              }}>UNIT PRICE (₹)</th>
              <th style={{ 
                border: '1px solid black', 
                padding: '8px', 
                textAlign: 'right',
                width: '90px'
              }}>TOTAL (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => (
              <tr key={index}>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '8px', 
                  textAlign: 'center',
                  verticalAlign: 'top'
                }}>{index + 1}</td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '8px'
                }}>
                  <span style={{ fontWeight: '600' }}>{item.description || '_________________'}</span>
                  {item.specifications?.filter(s => s && s.trim()).length > 0 && (
                    <div style={{ marginTop: '4px', color: '#4b5563' }}>
                      {item.specifications.map((spec, i) => 
                        spec && spec.trim() && (
                          <div key={i} style={{ marginLeft: '16px', fontSize: '11px' }}>• {spec}</div>
                        )
                      )}
                    </div>
                  )}
                </td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '8px', 
                  textAlign: 'center',
                  verticalAlign: 'top'
                }}>{item.qty}</td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '8px', 
                  textAlign: 'right',
                  verticalAlign: 'top'
                }}>₹{Number(item.price || 0).toFixed(2)}</td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '8px', 
                  textAlign: 'right',
                  verticalAlign: 'top'
                }}>₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ 
                  border: '1px solid black', 
                  padding: '16px', 
                  textAlign: 'center',
                  color: '#9ca3af'
                }}>
                  No items added
                </td>
              </tr>
            )}

            {items.length > 0 && (
              <>
                <tr>
                  <td colSpan="4" style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontWeight: '500'
                  }}>Sub-Total</td>
                  <td style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    textAlign: 'right'
                  }}>₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontWeight: '500'
                  }}>GST @ 18%</td>
                  <td style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    textAlign: 'right'
                  }}>₹{gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontWeight: '500'
                  }}>Round Off</td>
                  <td style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    textAlign: 'right'
                  }}>₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    fontWeight: 'bold',
                    textAlign: 'right',
                    backgroundColor: '#f9fafb'
                  }}>Grand Total</td>
                  <td style={{ 
                    border: '1px solid black', 
                    padding: '8px', 
                    fontWeight: 'bold',
                    textAlign: 'right',
                    backgroundColor: '#f9fafb'
                  }}>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Amount in Words */}
      {grandTotal > 0 && (
        <p style={{ fontSize: '12px', marginTop: '12px', fontWeight: '600' }}>
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )}

      {/* Terms and Footer */}
      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <p style={{ fontWeight: 'bold' }}>Terms and Conditions:</p>
        <div style={{ width: '80px', marginTop: '2px', borderBottom: '1px solid black' }}></div>
        
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontWeight: '600' }}>• Payment: {formData.terms?.payment || firm.defaultTerms.payment}</p>
          <p style={{ fontWeight: '600' }}>• Delivery: {formData.terms?.delivery || firm.defaultTerms.delivery}</p>
        </div>

        <p style={{ marginTop: '12px' }}>• This is a computer generated quotation and does not require signature.</p>
        <p>• Prices are subject to change without prior notice.</p>
        <p>• Goods once sold will not be taken back.</p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px',
          gap: '12px'
        }}>
          <div style={{ fontSize: '12px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Bank Details:</p>
            <p>Bank: {firm.bankDetails.bankName}</p>
            <p>A/c No: {firm.bankDetails.accountNo}</p>
            <p>IFSC: {firm.bankDetails.ifsc}</p>
            <p>Branch: {firm.bankDetails.branch}</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '8px' }}>
              <img
                src={firm.signature}
                alt="signature"
                style={{ maxWidth: '96px', height: 'auto', margin: '0 auto' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p style={{ 
                borderTop: '1px solid black', 
                paddingTop: '4px', 
                marginTop: '4px', 
                width: '128px', 
                marginLeft: 'auto', 
                marginRight: 'auto' 
              }}>
                For {firm.tradeName || firm.name}
              </p>
            </div>
          </div>
        </div>

        <hr style={{ marginTop: '20px', border: 'none', borderTop: '1px solid black' }} />
        <p style={{ textAlign: 'center', marginTop: '8px', color: '#4b5563' }}>
          {firm.address} | Ph: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </>
  );
}