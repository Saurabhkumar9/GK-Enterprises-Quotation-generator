import React from 'react';
import { numberToWords } from '../../../utils/numberToWords';

export default function SymgmatiqTemplate({ 
  firm, formData, quotationRef, date, items, 
  subTotal, gstAmount, roundOff, grandTotal 
}) {
  const primaryColor = '#4a148c';
  const secondaryColor = '#7b1fa2';
  const lightBg = '#f3e5f5';

  return (
    <>
      {/* Corporate Purple Theme */}
      <div style={{ 
        background: primaryColor,
        color: 'white',
        padding: '20px 25px',
        marginBottom: '25px',
        boxShadow: '0 6px 15px rgba(74,20,140,0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '20px',
          fontSize: '80px',
          fontWeight: 'bold',
          opacity: 0.1,
          color: 'white'
        }}>
          {firm.initials}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ fontSize: '14px', opacity: 0.9, letterSpacing: '1px' }}>{firm.name}</div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '5px 0 0' }}>QUOTATION</h1>
          </div>
          <div style={{ 
            background: 'white', 
            color: primaryColor, 
            padding: '8px 15px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '28px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            {firm.initials}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '13px', opacity: 0.9 }}>
          <span>Ref: {quotationRef}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Customer Card */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{ 
          background: lightBg,
          padding: '15px',
          borderLeft: `5px solid ${primaryColor}`,
          borderRadius: '0 8px 8px 0'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>BILL TO</h3>
          <p style={{ fontWeight: 'bold', fontSize: '15px' }}>{formData.customer?.name || '_________________'}</p>
          <p style={{ fontSize: '13px', lineHeight: '1.5', marginTop: '5px' }}>{formData.customer?.address || '_________________'}</p>
          {formData.customer?.gst && (
            <p style={{ fontSize: '13px', marginTop: '5px', color: primaryColor }}>GST: {formData.customer.gst}</p>
          )}
        </div>

        <div style={{ 
          background: '#fff',
          padding: '15px',
          border: `1px solid ${lightBg}`,
          borderRadius: '8px'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>DETAILS</h3>
          <p style={{ fontSize: '13px', marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>GST No:</span> {firm.gst}</p>
          <p style={{ fontSize: '13px', marginTop: '8px' }}><span style={{ fontWeight: 'bold' }}>Place order on:</span></p>
          <p style={{ fontWeight: '600', marginTop: '5px', fontSize: '14px', color: primaryColor }}>{firm.tradeName || firm.name}</p>
          <p style={{ fontSize: '12px', marginTop: '5px' }}>{firm.address}</p>
          <p style={{ fontSize: '12px', marginTop: '5px' }}>📞 {firm.phone.join(', ')}</p>
          <p style={{ fontSize: '12px', marginTop: '5px' }}>✉ {firm.email}</p>
        </div>
      </div>

      {/* Subject */}
      <div style={{ 
        marginBottom: '20px',
        background: 'linear-gradient(to right, #fff, #f8f8f8)',
        padding: '12px 15px',
        borderBottom: `2px solid ${primaryColor}`
      }}>
        <p style={{ fontWeight: 'bold', color: primaryColor }}>Subject: Quotation for your requirement</p>
        <p style={{ marginTop: '8px' }}>Dear Sir/Madam,</p>
        <p style={{ marginTop: '5px', lineHeight: '1.5' }}>
          We thank you for your inquiry and are pleased to provide our most competitive quotation as detailed below:
        </p>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: secondaryColor, color: 'white' }}>
            <th style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'center', width: '40px' }}>#</th>
            <th style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'left' }}>DESCRIPTION</th>
            <th style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'center', width: '60px' }}>QTY</th>
            <th style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'right', width: '100px' }}>UNIT PRICE (₹)</th>
            <th style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'right', width: '100px' }}>TOTAL (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map((item, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? '#fff' : '#faf5ff' }}>
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}`, textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', border: `1px solid ${primaryColor}` }}>
                <span style={{ fontWeight: 'bold', color: primaryColor }}>{item.description || '_________________'}</span>
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
                <td colSpan="4" style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold', fontSize: '16px', color: primaryColor }}>GRAND TOTAL</td>
                <td style={{ padding: '12px', border: `1px solid ${primaryColor}`, textAlign: 'right', fontWeight: 'bold', fontSize: '16px', color: primaryColor }}>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Amount in Words */}
      {grandTotal > 0 && (
        <div style={{ 
          background: 'linear-gradient(135deg, #f3e5f5 0%, #fff 100%)',
          padding: '12px',
          marginBottom: '20px',
          borderLeft: `5px solid ${primaryColor}`,
          borderRadius: '0 8px 8px 0'
        }}>
          <p style={{ fontWeight: 'bold', color: primaryColor }}>Amount in words: {numberToWords(grandTotal)}</p>
        </div>
      )}

      {/* Terms and Footer */}
      <div>
        <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Terms and Conditions</h3>
        <hr style={{ border: `1px solid ${primaryColor}`, width: '120px', margin: '5px 0 15px' }} />
        
        <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: '#f9f9f9', padding: '10px' }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>Payment:</span> {formData.terms?.payment || firm.defaultTerms.payment}
          </div>
          <div style={{ background: '#f9f9f9', padding: '10px' }}>
            <span style={{ fontWeight: 'bold', color: primaryColor }}>Delivery:</span> {formData.terms?.delivery || firm.defaultTerms.delivery}
          </div>
        </div>

        <ul style={{ fontSize: '12px', color: '#555', marginBottom: '20px', listStyleType: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '5px' }}>• This quotation is valid for 30 days</li>
          <li style={{ marginBottom: '5px' }}>• Prices are subject to market fluctuations</li>
          <li style={{ marginBottom: '5px' }}>• Delivery schedule subject to order confirmation</li>
          <li style={{ marginBottom: '5px' }}>• This is a computer generated document</li>
        </ul>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '12px' }}>
            <p style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '10px', fontSize: '14px' }}>Bank Details:</p>
            <p><span style={{ fontWeight: '500' }}>Bank:</span> {firm.bankDetails.bankName}</p>
            <p><span style={{ fontWeight: '500' }}>Account No:</span> {firm.bankDetails.accountNo}</p>
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

        <hr style={{ marginTop: '25px', border: `1px solid ${primaryColor}` }} />
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '11px', color: '#666' }}>
          {firm.address} | Phone: {firm.phone.join(', ')} | Email: {firm.email}
        </p>
      </div>
    </>
  );
}