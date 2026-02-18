import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import firmsData from '../firms/firms.json';
import { calculateTotals, generateQuotationRef } from '../../utils/calculations';
import { downloadPDF } from '../../utils/pdfGenerator';
import QuotationActions from './QuotationActions';
import './quotationStyles.css';

// Import all firm templates
import GKTemplate from './templates/GKTemplate';
import SwanviTemplate from './templates/SwanviTemplate';
import SaurabhTemplate from './templates/SaurabhTemplate';
import SymgmatiqTemplate from './templates/SymgmatiqTemplate';
import SwatiTemplate from './templates/SwatiTemplate';
import AnkitTemplate from './templates/AnkitTemplate';

export default function QuotationTemplate({ firmId }) {
  const pdfRef = useRef();
  const { watch } = useFormContext();
  const formData = watch();
  const [quotationRef, setQuotationRef] = useState('');
  const refGenerated = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Access the firms array from the imported JSON
  const firms = firmsData.firms || firmsData;

  // Find the firm by ID (case-insensitive match for flexibility)
  const firm = firms.find(f =>
    f.id.toLowerCase() === firmId?.toLowerCase()
  ) || firms[0];

  const items = formData.items || [];
  const { subTotal, gstAmount, finalAmount, grandTotal, roundOff } = calculateTotals(items);

  useEffect(() => {
    if (!refGenerated.current && firm?.quotationPrefix) {
      setQuotationRef(generateQuotationRef(firm.quotationPrefix));
      refGenerated.current = true;
    }
  }, [firm?.quotationPrefix]);

  const date = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownloadPDF = useCallback(async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const element = pdfRef.current;
      
      // Add PDF optimization class
      element.classList.add('pdf-optimized');
      
      // Wait for any pending renders
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await downloadPDF(element, `${firm.initials}-${quotationRef}`);
      
      // Remove PDF optimization class
      element.classList.remove('pdf-optimized');
    } catch (error) {
      console.error('PDF download failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [firm?.initials, quotationRef, isGenerating]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = pdfRef.current.outerHTML;
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules || [])
              .map(rule => rule.cssText)
              .join('');
          } catch (e) {
            return '';
          }
        })
        .join('');

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Quotation ${quotationRef}</title>
            <style>
              ${styles}
              @media print {
                body { 
                  margin: 0.5in;
                  background: white;
                }
                .no-print {
                  display: none !important;
                }
                .quotation-content {
                  max-width: 100%;
                  page-break-inside: avoid;
                }
                tr, td, th {
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            ${content}
            <script>
              window.onload = function() { 
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 250);
              };
            <\/script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }, [quotationRef]);

  // Template selector based on firm ID
  const renderTemplate = () => {
    const commonProps = {
      firm,
      formData,
      quotationRef,
      date,
      items,
      subTotal,
      gstAmount,
      roundOff,
      grandTotal
    };

    const normalizedId = firmId?.toLowerCase();

    switch (normalizedId) {
      case 'swanvi':
        return <SwanviTemplate {...commonProps} />;
      case 'gurukripa':
      case 'saurabh':
        return <SaurabhTemplate {...commonProps} />;
      case 'symgmatiq':
        return <SymgmatiqTemplate {...commonProps} />;
      case 'swati':
        return <SwatiTemplate {...commonProps} />;
      case 'ankit goel (huf)':
      case 'ankit':
        return <AnkitTemplate {...commonProps} />;
      case 'gk':
        return <GKTemplate {...commonProps} />;
      default:
        return <SaurabhTemplate {...commonProps} />;
    }
  };

  // If no firm found, show error
  if (!firm) {
    return (
      <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
        Error: Firm not found with ID: {firmId}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <QuotationActions
        onDownload={handleDownloadPDF}
        onPrint={handlePrint}
        isGenerating={isGenerating}
      />

      <div
        ref={pdfRef}
        className="bg-white mx-auto p-4 md:p-6 text-xs md:text-sm print:p-6 quotation-content"
        style={{
          maxWidth: '794px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          backgroundColor: 'white',
          lineHeight: '1.5',
          wordWrap: 'break-word',
          overflow: 'visible'
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}