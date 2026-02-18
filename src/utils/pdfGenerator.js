import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = async (element, fileName, options = {}) => {
  if (!element) return;

  try {
    // Show loading indicator
    const loadingToast = document.createElement('div');
    loadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    loadingToast.textContent = 'Generating PDF...';
    document.body.appendChild(loadingToast);

    // Wait for images to load
    const images = element.getElementsByTagName('img');
    await Promise.all(
      Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Get element dimensions
    const elementHeight = element.scrollHeight;
    const elementWidth = element.scrollWidth;
    
    // Calculate pages needed (A4 height in pixels at scale 2)
    const pageHeight = 1123; // ~297mm at 2x scale
    const totalPages = Math.ceil(elementHeight / pageHeight);

    // Create PDF with A4 size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [794, 1123], // A4 size in pixels at 96 DPI
      compress: true
    });

    // Capture and add each page
    for (let i = 0; i < totalPages; i++) {
      // Create a clone for each page
      const clone = element.cloneNode(true);
      clone.style.width = '794px';
      clone.style.height = 'auto';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';
      clone.style.overflow = 'visible';
      
      // Calculate scroll position for this page
      const scrollTop = i * pageHeight;
      
      // Create a container for this page
      const pageContainer = document.createElement('div');
      pageContainer.style.width = '794px';
      pageContainer.style.height = `${pageHeight}px`;
      pageContainer.style.overflow = 'hidden';
      pageContainer.style.position = 'relative';
      pageContainer.style.backgroundColor = '#ffffff';
      
      // Position the clone to show the correct portion
      clone.style.position = 'absolute';
      clone.style.top = `-${scrollTop}px`;
      clone.style.left = '0';
      
      pageContainer.appendChild(clone);
      document.body.appendChild(pageContainer);

      // Capture this page
      const canvas = await html2canvas(pageContainer, {
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: 794,
        windowHeight: pageHeight
      });

      // Add to PDF
      if (i > 0) {
        pdf.addPage();
      }
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123, undefined, 'FAST');

      // Clean up
      document.body.removeChild(pageContainer);
    }

    // Remove loading indicator
    document.body.removeChild(loadingToast);

    // Save PDF
    pdf.save(`Quotation-${fileName}.pdf`);
    
    // Show success message
    const successToast = document.createElement('div');
    successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successToast.textContent = 'PDF generated successfully!';
    document.body.appendChild(successToast);
    setTimeout(() => {
      document.body.removeChild(successToast);
    }, 3000);

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Remove loading indicator if exists
    const loadingToast = document.querySelector('.fixed.top-4.right-4.bg-blue-600');
    if (loadingToast) document.body.removeChild(loadingToast);
    
    // Show error message
    const errorToast = document.createElement('div');
    errorToast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    errorToast.textContent = 'Error generating PDF. Please try again.';
    document.body.appendChild(errorToast);
    setTimeout(() => {
      document.body.removeChild(errorToast);
    }, 3000);
  }
};