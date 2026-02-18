import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = async (element, fileName) => {
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

    // Capture with better quality
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit within margins
    const margin = 10;
    const imgWidth = pdfWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;
    let page = 1;

    // Add first page
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight - (margin * 2);

    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = margin - (pdfHeight - (margin * 2)) * page;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight - (margin * 2);
      page++;
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