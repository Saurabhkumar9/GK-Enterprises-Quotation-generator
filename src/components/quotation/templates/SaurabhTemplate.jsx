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
    <>
      {/* Classic Green Theme Header */}
      <div style={{ 
        borderBottom: `3px solid ${primaryColor}`,
        marginBottom: '25px',
        padding: '10px 0',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              color: primaryColor, 
              margin: 0,
              fontWeight: '600'
            }}>
              {firm.name}
            </h1>
            <p style={{ margin: '5px 0', fontSize: '12px', color: '#555' }}>{firm.address}</p>
          </div>
          <div style={{ 
            background: primaryColor,
            color: 'white',
            padding: '8px 20px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '24px',
            letterSpacing: '1px'
          }}>
            {firm.initials}
          </div>
        </div>
        <h2 style={{ 
          textAlign: 'center', 
          color: primaryColor,
          margin: '15px 0 5px',
          fontSize: '22px',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          QUOTATION
        </h2>
        <div style={{ 
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#666',
          borderTop: `1px solid ${lightBg}`,
          paddingTop: '8px'
        }}>
          Ref: {quotationRef} | Date: {date}
        </div>
      </div>

      {/* Customer Details with Classic Design */}
      <div style={{ 
        marginBottom: '20px',
        border: `1px solid ${primaryColor}`,
        borderRadius: '0',
        overflow: 'hidden'
      }}>
        <div style={{ 
          background: primaryColor,
          color: 'white',
          padding: '8px 12px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          CUSTOMER INFORMATION
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', padding: '12px' }}>
          <div style={{ borderRight: `1px solid ${primaryColor}`, paddingRight: '15px' }}>
            <p style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '8px' }}>Bill To:</p>
            <p style={{ fontWeight: '600' }}>{formData.customer?.name || '_________________'}</p>
            <p style={{ lineHeight: '1.5', marginTop: '5px' }}>{formData.customer?.address || '_________________'}</p>
            {formData.customer?.gst && (
              <p style={{ marginTop: '5px', color: primaryColor }}>GST: {formData.customer.gst}</p>
            )}
          </div>
          <div style={{ paddingLeft: '15px' }}>
            <p><span style={{ fontWeight: 'bold', color: primaryColor }}>GST No:</span> {firm.gst}</p>
            <p style={{ marginTop: '8px' }}><span style={{ fontWeight: 'bold', color: primaryColor }}>Order On:</span></p>
            <p style={{ fontWeight: '600', marginTop: '5px' }}>{firm.tradeName || firm.name}</p>
            <p style={{ fontSize: '11px', marginTop: '5px' }}>{firm.address}</p>
            <p style={{ fontSize: '11px', marginTop: '5px' }}>Ph: {firm.phone.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: '20px', background: lightBg, padding: '12px' }}>
        <p style={{ fontSize: '13px', fontWeight: 'bold', color: primaryColor }}>Subject: Quotation for your requirement</p>
        <p style={{ fontSize: '13px', marginTop: '8px' }}>Dear Sir/Madam,</p>
        <p style={{ fontSize: '13px', lineHeight: '1.5', marginTop: '5px' }}>
          Thank you for your inquiry. We are pleased to submit our quotation as follows:
        </p>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: primaryColor, color: 'white' }}>
            <th style={{ padding: '10px', border: `1px solid ${secondaryColor}`, textAlign: 'center', width: '40px' }}>#</th>
            <th style={{ padding: '10px', border: `1px solid ${secondaryColor}`, textAlign: 'left' }}>DESCRIPTION</th>
            <th style={{ padding: '10px', border: `1px solid ${secondaryColor}`, textAlign: 'center', width: '60px' }}>QTY</th>
            <th style={{ padding: '10px', border: `1px solid ${secondaryColor}`, textAlign: 'right', width: '100px' }}>UNIT PRICE</th>
            <th style={{ padding: '10px', border: `1px solid ${secondaryColor}`, textAlign: 'right', width: '100px' }}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}` }}>
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
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'center' }}>{item.qty}</td>
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right' }}>₹{Number(item.price || 0).toFixed(2)}</td>
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right' }}>₹{((item.qty || 0) * (item.price || 0)).toFixed(2)}</td>
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
              <tr>
                <td colSpan="4" style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>Sub-Total</td>
                <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>₹{subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>GST @ 18%</td>
                <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>₹{gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>Round Off</td>
                <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold' }}>₹{roundOff.toFixed(2)}</td>
              </tr>
              <tr style={{ background: lightBg }}>
                <td colSpan="4" style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: secondaryColor }}>Grand Total</td>
                <td style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: secondaryColor }}>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
          padding: '10px',
          background: lightBg,
          borderLeft: `4px solid ${primaryColor}`,
          color: secondaryColor
        }}>
          Amount in words: {numberToWords(grandTotal)}
        </p>
      )}

      {/* Terms and Footer */}
      <div>
        <p style={{ fontWeight: 'bold', color: primaryColor, fontSize: '15px', marginBottom: '5px' }}>Terms & Conditions:</p>
        <hr style={{ border: `1px solid ${primaryColor}`, width: '100px', margin: '5px 0 15px' }} />
        
        <div style={{ marginBottom: '15px', background: '#f9f9f9', padding: '10px' }}>
          <p style={{ fontSize: '13px', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>Payment Terms:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </p>
          <p style={{ fontSize: '13px' }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>Delivery Terms:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </p>
        </div>

        <div style={{ fontSize: '12px', color: '#555', marginBottom: '20px' }}>
          <p>• This quotation is valid for 15 days from the date of issue.</p>
          <p>• Prices are subject to change without prior notice.</p>
          <p>• Goods once sold will not be taken back or exchanged.</p>
          <p>• This is a computer generated document, signature not required.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <div style={{ fontSize: '12px' }}>
            <p style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '8px', fontSize: '13px' }}>Bank Details:</p>
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
              fontWeight: 'bold',
              color: primaryColor
            }}>
              For {firm.tradeName || firm.name}
            </p>
          </div>
        </div>

        <hr style={{ marginTop: '25px', border: `1px solid ${primaryColor}` }} />
        <p style={{ 
          textAlign: 'center', 
          marginTop: '12px', 
          fontSize: '11px',
          color: '#555'
        }}>
          {firm.address} | Phone: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </>
  );
}