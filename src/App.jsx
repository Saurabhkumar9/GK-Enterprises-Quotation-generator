import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import sign from './assets/sign.png'

export default function App() {
  const pdfRef = useRef();
  const printRef = useRef();

  const generateGKRef = () => {
    const random = Math.floor(100 + Math.random() * 900);
    return `GK/NG/${random}`;
  };

  const today = new Date().toLocaleString("en-GB");

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    gst: "09AKYPG8687K1ZW",
  });

  const [gkRef] = useState(generateGKRef());
  const [date] = useState(today);

  const [items, setItems] = useState([
    {
      description: "",
      specifications: [""],
      qty: 1,
      price: 0,
      totalWithGST: 0
    },
  ]);

  // New state for price calculation mode
  const [priceMode, setPriceMode] = useState('unit'); // 'unit' or 'total'

  const addItem = () => {
    setItems([...items, {
      description: "",
      specifications: [""],
      qty: 1,
      price: 0,
      totalWithGST: 0
    }]);
  };

  const addSpecification = (itemIndex) => {
    const updated = [...items];
    updated[itemIndex].specifications.push("");
    setItems(updated);
  };

  const updateSpecification = (itemIndex, specIndex, value) => {
    const updated = [...items];
    updated[itemIndex].specifications[specIndex] = value;
    setItems(updated);
  };

  const removeSpecification = (itemIndex, specIndex) => {
    const updated = [...items];
    if (updated[itemIndex].specifications.length > 1) {
      updated[itemIndex].specifications = updated[itemIndex].specifications.filter((_, i) => i !== specIndex);
    } else {
      updated[itemIndex].specifications = [""];
    }
    setItems(updated);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    // Auto-calculate based on mode
    if (field === 'totalWithGST' && priceMode === 'total') {
      // Calculate unit price from total with GST
      const priceWithoutGST = value / (1.18 * updated[index].qty);
      updated[index].price = Number(priceWithoutGST.toFixed(2));
    } else if (field === 'price' && priceMode === 'unit') {
      // Calculate total with GST from unit price
      updated[index].totalWithGST = Number((value * updated[index].qty * 1.18).toFixed(2));
    } else if (field === 'qty') {
      // Recalculate based on current mode when quantity changes
      if (priceMode === 'total' && updated[index].totalWithGST > 0) {
        const priceWithoutGST = updated[index].totalWithGST / (1.18 * value);
        updated[index].price = Number(priceWithoutGST.toFixed(2));
      } else if (priceMode === 'unit' && updated[index].price > 0) {
        updated[index].totalWithGST = Number((updated[index].price * value * 1.18).toFixed(2));
      }
    }

    setItems(updated);
  };

  // Function to remove an item
  const removeItem = (index) => {
    if (items.length > 1) {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
    } else {
      // Clear the first item
      setItems([{
        description: "",
        specifications: [""],
        qty: 1,
        price: 0,
        totalWithGST: 0
      }]);
    }
  };

  // Calculations
  const subTotal = items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const gstAmount = subTotal * 0.18;
  const finalAmount = subTotal + gstAmount;
  const grandTotal = Math.round(finalAmount);
  const roundOff = grandTotal - finalAmount;

  const downloadPDF = async () => {
    const element = pdfRef.current;

    // Ensure all images are loaded
    const images = element.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block PDF generation
      });
    }));

    // Temporarily set explicit width for better capture
    const originalWidth = element.style.width;
    element.style.width = '794px';

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Fix image paths in cloned document
        const clonedImages = clonedDoc.getElementsByTagName('img');
        Array.from(clonedImages).forEach(img => {
          if (img.src && img.src.includes('blob:')) {
            // If it's a blob URL, keep as is
          } else if (img.src && img.src.startsWith('data:')) {
            // If it's data URL, keep as is
          } else {
            // For relative paths, try to fix
            img.crossOrigin = 'anonymous';
          }
        });
      }
    });

    // Restore original width
    element.style.width = originalWidth;

    const imgData = canvas.toDataURL("image/png");

    // Calculate dimensions to fit A4 properly
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions to fit within PDF margins
    const imgWidth = pdfWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // Top margin

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20; // Subtract top and bottom margins

    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = 10; // Reset position for new page
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position - (pdfHeight - 30) * (Math.ceil(imgHeight / (pdfHeight - 20)) - 1), imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    pdf.save(`Quotation-${gkRef}.pdf`);
  };

  // Print only quotation section
  const printQuotation = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    const printStyles = `
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .bg-gray-50 { background-color: #f9fafb; }
        .border { border: 1px solid black; }
        .border-black { border-color: black; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .w-full { width: 100%; }
        .w-32 { width: 8rem; }
        .w-40 { width: 10rem; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .specification-item { margin-left: 1rem; font-size: 0.75rem; color: #4b5563; }
        img { max-width: 100%; height: auto; }
      </style>
    `;

    document.body.innerHTML = printStyles + printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore React functionality
  };

  return (
    <div className="p-4 md:p-6 bg-gray-200 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4">
        GK Enterprises Quotation Generator
      </h1>

      {/* INPUT SECTION */}
      <div className="bg-white p-4 rounded shadow mb-4 max-w-5xl mx-auto">
        <div className="mb-3">
          <label className="block font-semibold mb-1">
            Customer Name
          </label>
          <input
            type="text"
            placeholder="Enter Customer Name"
            className="border border-black rounded-lg p-2 w-full"
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">
            Customer Address
          </label>
          <textarea
            placeholder="Enter Full Address"
            className="border border-black rounded-lg p-2 w-full"
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            GST Number
          </label>
          <select
            className="border border-black rounded-lg p-2 w-full"
            value={customer.gst}
            onChange={(e) =>
              setCustomer({ ...customer, gst: e.target.value })
            }
          >
            <option value="09AKYPG8687K1ZW">
              09AKYPG8687K1ZW (GK Enterprises)
            </option>
          </select>
        </div>

        {/* Price Mode Toggle */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <label className="block font-semibold mb-2">Price Calculation Mode:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="priceMode"
                value="unit"
                checked={priceMode === 'unit'}
                onChange={(e) => setPriceMode(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Unit Price (Enter price without GST)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="priceMode"
                value="total"
                checked={priceMode === 'total'}
                onChange={(e) => setPriceMode(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Total with GST (Enter final amount including GST)</span>
            </label>
          </div>
        </div>

        {/* Product Entry with Specifications and Remove Button */}
        <div className="mb-2">
          <label className="block font-semibold mb-2">Items with Specifications</label>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50">
              <div className="flex gap-2 mb-2 items-start">
                <div className="flex-grow">
                  <label className="block text-xs font-medium mb-1">Item Name/Model</label>
                  <input
                    type="text"
                    placeholder="e.g., HP 280 G9 DESKTOP"
                    className="border border-black rounded-lg p-2 w-full text-sm"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(itemIndex, "description", e.target.value)
                    }
                  />
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeItem(itemIndex)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm mt-6"
                  title="Remove Item"
                >
                  ✕ Remove Item
                </button>
              </div>

              {/* Specifications Section */}
              <div className="ml-4 mt-2">
                <label className="block text-xs font-medium mb-1">Specifications:</label>
                {item.specifications.map((spec, specIndex) => (
                  <div key={specIndex} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder={`e.g., ${specIndex === 0 ? 'i7 13TH GEN' : specIndex === 1 ? '16GB RAM' : '512GB SSD'}`}
                      className="border border-gray-400 rounded-lg p-2 w-full text-sm"
                      value={spec}
                      onChange={(e) =>
                        updateSpecification(itemIndex, specIndex, e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeSpecification(itemIndex, specIndex)}
                      className="bg-orange-500 text-white px-2 py-1 rounded-lg hover:bg-orange-600 text-xs"
                      title="Remove Specification"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSpecification(itemIndex)}
                  className="text-blue-600 text-xs font-semibold mt-1 hover:text-blue-800"
                >
                  + Add More Specification
                </button>
              </div>

              {/* Quantity and Price Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="border border-black rounded-lg p-2 w-full appearance-none text-sm"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      updateItem(itemIndex, "qty", Number(e.target.value))
                    }
                  />
                </div>

                {priceMode === 'unit' ? (
                  <div>
                    <label className="block text-xs font-medium mb-1">Unit Price (without GST)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Unit Price"
                      className="border border-black rounded-lg p-2 w-full appearance-none text-sm"
                      value={item.price}
                      min={1}
                      step="1"
                      onChange={(e) =>
                        updateItem(itemIndex, "price", Number(e.target.value))
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium mb-1">Total Amount (with GST)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Total with GST"
                      className="border border-blue-500 rounded-lg p-2 w-full appearance-none text-sm bg-blue-50"
                      value={item.totalWithGST}
                      min={0}
                      step="0.01"
                      onChange={(e) =>
                        updateItem(itemIndex, "totalWithGST", Number(e.target.value))
                      }
                    />
                  </div>
                )}

                <div className="text-sm p-2 bg-gray-200 rounded flex items-center justify-center">
                  {priceMode === 'unit' ? (
                    <span className="font-semibold">Total with GST: <span className="text-green-700">₹{(item.price * item.qty * 1.18).toFixed(2)}</span></span>
                  ) : (
                    <span className="font-semibold">Unit Price: <span className="text-green-700">₹{item.price.toFixed(2)}</span></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-3">
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            + Add New Item
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Download Quotation PDF
          </button>
        </div>
      </div>

      {/* PDF/PRINT LAYOUT */}
      <div ref={printRef}>
        <div
          ref={pdfRef}
          className="bg-white w-full md:w-[794px] mx-auto p-6 md:p-8 text-xs md:text-sm relative print:w-[794px] print:p-8"
          style={{
            minHeight: 'auto',
            overflow: 'visible',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="absolute top-4 right-6 text-red-700 text-4xl md:text-5xl font-bold">
            GK
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Quotation
            </h2>
            <div className="border-b border-black w-32 mt-2"></div>
          </div>

          {/* CUSTOMER BOX */}
         <div className="border border-black rounded-lg mt-6 grid grid-cols-5">
  {/* Left side - Customer Details (40%) */}
  <div className="col-span-2 border-r border-black p-3">
    <p className="font-bold">
      CUSTOMER DETAILS:
    </p>
    <p className="mt-2 font-bold">
      To- {customer.name || '_________________'}
    </p>
    <p className="whitespace-pre-line">
      {customer.address || '_________________'}
    </p>
  </div>

  {/* Right side - Other Details (60%) */}
  <div className="col-span-3">

    {/* Row 1: GK Ref and Date in same row */}
    <div className="grid grid-cols-2 border-b border-black">
      <div className="p-2 border-r border-black">
        <span className="font-semibold">GK Ref:</span> {gkRef}
      </div>
      <div className="p-2">
        <span className="font-semibold">Date:</span> {date}
      </div>
    </div>

    {/* Row 2: GST No (Full Width) */}
    <div className="border-b border-black p-2">
      <span className="font-semibold">GST No:</span> {customer.gst}
    </div>

    {/* Row 3: Order Section (Full Width) */}
    <div className="p-3 text-center">
      <p className="font-bold underline">
        KINDLY PLACE YOUR ORDER ON
      </p>

      <p className="font-bold mt-2">
        GK Enterprises
      </p>

      <p>
        3/316, Vishwas Khand, Gomti Nagar, Lucknow – 226010
      </p>

      <p>
        Phone No.: 9910089804, 7379974538
      </p>

      <p>
        Email: gkentlko@gmail.com
      </p>
    </div>
  </div>
</div>

          <div className="pt-4">
            <p>Subject: </p>
            <p>Dear Sir, </p>
            <p>
              This is reference to our mentioned subject. We are quoting you the best price for the same. Which prices and description is
              as mentioned below:
            </p>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border border-black mt-4 text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="border border-black p-2">SL. No</th>
                  <th className="border border-black p-2">DESCRIPTION</th>
                  <th className="border border-black p-2">QTY</th>
                  <th className="border border-black p-2">
                    UNIT PRICE (RS.) <br />(GST Extra)
                  </th>
                  <th className="border border-black p-2">
                    Total Amount <br />(GST Extra)
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center align-top">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2">
                      <span className="font-semibold">{item.description || '_________________'}</span>
                      {item.specifications && item.specifications.some(s => s.trim() !== '') && (
                        <div className="mt-1 text-gray-600">
                          {item.specifications.map((spec, i) =>
                            spec.trim() && (
                              <div key={i} className="specification-item">• {spec}</div>
                            )
                          )}
                        </div>
                      )}
                    </td>
                    <td className="border border-black p-2 text-center align-top">
                      {item.qty}
                    </td>
                    <td className="border border-black p-2 text-right align-top">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="border border-black p-2 text-right align-top">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-medium">
                    Sub- Total
                  </td>
                  <td className="border border-black p-2 text-right">
                    ₹{subTotal.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-medium">
                    GST@18%
                  </td>
                  <td className="border border-black p-2 text-right">
                    ₹{gstAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="border border-black p-2 text-right font-medium">
                    Round Off
                  </td>
                  <td className="border border-black p-2 text-right">
                    ₹{roundOff.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td colSpan="4" className="border border-black p-2 font-bold text-right bg-gray-50">
                    Grand Total
                  </td>
                  <td className="border border-black p-2 font-bold text-right bg-gray-50">
                    ₹{grandTotal.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 text-xs">
              <p className="font-bold">
                Terms and Conditions :
              </p>
              <div className="border-b border-black w-1/6 pb-2"></div>
              <p className="pt-2 font-bold">• Payment – 100% against Delivery</p>
              <p className="font-bold">• Delivery Period - 8-10 days From Confirm Order</p>

              <p className="pt-4">• Kindly sign for the purpose overleaf in token  of your acceptance and <br />
                return this quotation to us along with the purchase order and <br />
                supporting documents.</p>

              <div className="flex flex-col md:flex-row justify-between mt-6 gap-4 font-bold">
                <div>
                  <p className="font-bold">Company Details :</p>
                  <p>Bank Name : AXIS BANK</p>
                  <p>A/c No : 924030004673222</p>
                  <p>
                    Branch & IFS Code: GOMTI NAGAR,
                    LUCKNOW & UTIB0001550
                  </p>
                </div>

                <div className="text-center">
                  <div className="mt-4">
                    <img
                      src={sign}
                      alt="signature"
                      className="w-32 h-auto mx-auto"
                      crossOrigin="anonymous"
                    />
                    <p className="border-t border-black pt-1 mt-1 w-40 mx-auto">
                      For GK Enterprises
                    </p>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-black" />

              <p className="text-center mt-2 text-gray-600 pb-4">
                GK Enterprises, 3/316, Vishwas Khand, Gomti Nagar, Lucknow 226010
              </p>
              <p className="text-center text-gray-600 pb-4">
                Ph. 7522089123
                Mob: 99100 89804 Mail: gkentlko@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}