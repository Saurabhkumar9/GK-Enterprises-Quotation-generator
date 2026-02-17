import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import sign from '../public/sign.png'

export default function App() {
  const pdfRef = useRef();

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
    { description: "", qty: 1, price: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { description: "", qty: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // New function to remove an item
  const removeItem = (index) => {
    if (items.length > 1) {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
    } else {
      // Optional: Show alert or just clear the first item
      setItems([{ description: "", qty: 1, price: 0 }]);
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
    
    // Temporarily set explicit width for better capture
    const originalWidth = element.style.width;
    element.style.width = '794px';
    
    const canvas = await html2canvas(element, { 
      scale: 2,
      logging: false,
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#ffffff'
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
              09AKYPG8687K1ZW
            </option>
          </select>
        </div>

        {/* Product Entry with Remove Button */}
        <div className="mb-2">
          <label className="block font-semibold mb-2">Items</label>
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-3 items-start">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-grow">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Enter Product Description"
                    className="border border-black rounded-lg p-2 w-full text-sm"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                  />
                </div>

                <div>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="border border-black rounded-lg p-2 w-full appearance-none text-sm"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      updateItem(index, "qty", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="border border-black rounded-lg p-2 w-full appearance-none text-sm"
                    value={item.price}
                    min={0}
                    step="0.01"
                    onChange={(e) =>
                      updateItem(index, "price", Number(e.target.value))
                    }
                  />
                </div>
              </div>
              
              {/* Remove Item Button */}
              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                title="Remove Item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-3">
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            + Add Item
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Download Quotation PDF
          </button>
        </div>
      </div>

      {/* PDF LAYOUT */}
      <div
        ref={pdfRef}
        className="bg-white w-full md:w-[794px] mx-auto p-6 md:p-8 text-xs md:text-sm relative print:w-[794px] print:p-8"
        style={{ 
          minHeight: 'auto',
          overflow: 'visible',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div className="absolute top-4 right-6 text-red-700 text-3xl md:text-4xl font-bold">
          GK
        </div>

        <div className="flex flex-col items-center">
  <h2 className="text-2xl md:text-3xl font-bold text-center">
    Quotation
  </h2>
  <div className="border-b border-black w-32 mt-2"></div>
</div>


        {/* CUSTOMER BOX */}
        <div className="border border-black rounded-lg mt-6 grid grid-cols-1 md:grid-cols-2">
          <div className="border-r-0 md:border-r border-black p-3 ">
            <p className="font-bold  ">
              CUSTOMER DETAILS:
            </p>
            <p className="mt-2 font-bold">
              To- {customer.name || '_________________'}
            </p>
            <p className="whitespace-pre-line">
              {customer.address || '_________________'}
            </p>
          </div>

          <div className="p-3">
            <div className="flex flex-col md:flex-row md:justify-between border-black border-b pb-3">
              <span>GK Ref: {gkRef}</span>
              <div className="border-r border-black"></div>
              <span>Date : {date}</span>
            </div>

            <div className="mt-1 border-b p-3 border-black">
              GST No : <b>{customer.gst}</b>
            </div>

            <div className="text-center mt-3">
              <p className="font-bold ">
                KINDLY PLACE YOUR ORDER ON
              </p>
              <div className="border-b border-black pt-2"></div>
              <p className="font-bold mt-1">
                GK Enterprises
              </p>
              <p>
                3/316, Vishwas Khand, Gomti Nagar,
                Lucknow – 226010
              </p>
              <p>
                Phone No.: 9910089804, 7379974538,
                Email: gkentlko@gmail.com
              </p>
            </div>
          </div>
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
                  <td className="border border-black p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black p-2">
                    {item.description || '_________________'}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.qty}
                  </td>
                  <td className="border border-black p-2 text-right">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="border border-black p-2 text-right">
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
            <p className="font-bold ">
              Terms and Conditions
            </p>
            <div className="border-b border-black w-1/6 pb-2"></div>
            <p className="pt-2">• Payment – 100% against Delivery</p>
            <p>• Delivery Period - 8-10 days From Confirm Order</p>

            <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
              <div>
                <p className="font-bold">Company Details</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}