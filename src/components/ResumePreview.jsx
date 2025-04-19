// "use client";

// import { useRef } from 'react';

// // Simple imports instead of dynamic imports to debug
// import Modern from './templates/Modern';
// import Professional from './templates/Professional';
// import Creative from './templates/Creative';

// export default function ResumePreview({ resumeData, selectedTemplate }) {
//   const resumeRef = useRef(null);
  
//   const downloadPDF = async () => {
//     try {
//       const { toPng } = await import('html-to-image');
//       const { jsPDF } = await import('jspdf');
      
//       const element = resumeRef.current;
//       const imgData = await toPng(element, { quality: 1 });
      
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${resumeData?.personalInfo?.name || 'resume'}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };
  
//   const renderTemplate = () => {
//     switch(selectedTemplate) {
//       case 'modern':
//         return <Modern resumeData={resumeData} />;
//       case 'professional':
//         return <Professional resumeData={resumeData} />;
//       case 'creative':
//         return <Creative resumeData={resumeData} />;
//       default:
//         return <Modern resumeData={resumeData} />;
//     }
//   };
  
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
//         <h3 className="font-medium">Preview</h3>
//         <button 
//           onClick={downloadPDF}
//           className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-md text-sm transition-colors"
//         >
//           Download PDF
//         </button>
//       </div>
      
//       <div className="p-0 overflow-hidden" ref={resumeRef}>
//         <div className="transform scale-[0.7] origin-top-left min-h-[1123px] w-[60vw]">
//           {renderTemplate()}
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";

import { useRef } from 'react';
import Modern from './templates/Modern';
import Professional from './templates/Professional';
import Creative from './templates/Creative';
import Elegant from './templates/Elegant';

export default function ResumePreview({ resumeData, selectedTemplate }) {
  const resumeRef = useRef(null);
  
  const downloadPDF = async () => {
    try {
      const { toCanvas } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');
      
      const element = resumeRef.current;
      
      // Show loading state
      const downloadBtn = document.getElementById('download-btn');
      const originalText = downloadBtn.innerText;
      downloadBtn.innerText = 'Generating...';
      downloadBtn.disabled = true;
      
      // Using toCanvas for higher quality rendering
      const canvas = await toCanvas(element, { 
        quality: 1,
        pixelRatio: 4, // Increased further for even sharper text
        backgroundColor: '#ffffff',
        fontEmbedCSS: document.styleSheets,
        skipFonts: false
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Create PDF with higher DPI
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        hotfixes: ["px_scaling"]
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add image to PDF with better quality settings
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
      // Save the PDF
      pdf.save(`${resumeData?.personalInfo?.name || 'resume'}.pdf`);
      
      // Reset button state
      downloadBtn.innerText = originalText;
      downloadBtn.disabled = false;
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      
      // Reset button on error
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerText = 'Download PDF';
        downloadBtn.disabled = false;
      }
    }
  };

  // This function determines which template to render based on selection
  const renderTemplate = () => {
    switch(selectedTemplate) {
      case 'modern':
        return <Modern resumeData={resumeData} />;
      case 'professional':
        return <Professional resumeData={resumeData} />;
      case 'creative':
        return <Creative resumeData={resumeData} />;
      case 'elegant':
        return <Elegant resumeData={resumeData} />;
      default:
        return <Modern resumeData={resumeData} />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
      <div className="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Preview</h3>
        <button 
          id="download-btn"
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors"
        >
          Download PDF
        </button>
      </div>
      
      {/* The actual resume preview with improved scaling and text size */}
      <div className="w-full overflow-auto" style={{ height: 'calc(100vh - 150px)' }}>
        {/* Full-size container with larger text */}
        <div 
          ref={resumeRef} 
          className="mx-auto"
          style={{
            width: '210mm', // A4 width
            minHeight: '297mm', // A4 height
            fontSize: '16px', // Increased base font size
            lineHeight: '1.5',
            padding: '0',
            backgroundColor: 'white',
            boxSizing: 'border-box'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}