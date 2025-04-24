








"use client";

import { useRef } from 'react';
import Modern from './templates/Modern';
import Professional from './templates/Professional';
import Creative from './templates/Creative';
import Elegant from './templates/Elegant';
import Classic from './templates/Classic';
import Best from './templates/Best';
import Traditional from './templates/Traditional';
import Formal from './templates/Formal';
import Toronto from './templates/Toronto';
import Functional from './templates/Functional';
import Simple from './templates/Simple';
import Stylish from './templates/Stylish';
import Iconic from './templates/Iconic';

export default function ResumePreview({ resumeData, selectedTemplate }) {
  const resumeRef = useRef(null);
  



  // This function determines which template to render based on selection
 
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
        pixelRatio: 4,
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
      
      // Add clickable links to the PDF
      await addClickableLinks(pdf, resumeData);
      
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
  
  // New function to add clickable links to the PDF
  // Enhanced link detection and positioning for PDFs
const addClickableLinks = async (pdf, resumeData) => {
  try {
    const element = resumeRef.current;
    
    // Get all links in the resume
    const links = element.querySelectorAll('a[href]');
    
    // Calculate the scale factors between screen and PDF
    const elementRect = element.getBoundingClientRect();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const scaleX = pdfWidth / elementRect.width;
    const scaleY = pdfHeight / elementRect.height;
    
    // Process each link
    links.forEach(link => {
      // Skip links without href
      if (!link.href) return;
      
      // Get link position relative to the resume container
      const linkRect = link.getBoundingClientRect();
      const offsetX = linkRect.left - elementRect.left;
      const offsetY = linkRect.top - elementRect.top;
      
      // Convert to PDF coordinates
      const x = offsetX * scaleX;
      const y = offsetY * scaleY;
      const width = linkRect.width * scaleX;
      const height = linkRect.height * scaleY;
      
      // Add clickable area to PDF
      const url = ensureHttps(link.href);
      pdf.link(x, y, width, height, { url });
      
      console.log(`Added link to PDF: ${url} at position [${x}, ${y}, ${width}, ${height}]`);
    });
    
    console.log(`Total links added: ${links.length}`);
  } catch (error) {
    console.error('Error adding clickable links:', error);
  }
};

// Updated helper to ensure URLs have http/https
const ensureHttps = (url) => {
  if (!url) return '';
  
  try {
    // Check if it's a valid URL
    new URL(url); 
    return url; // If it's valid, return as is
  } catch (e) {
    // If not valid, might be missing protocol - add https://
    if (!url.startsWith('http')) {
      return `https://${url}`;
    }
    return url;
  }
};
  
 
 
 
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
      case 'classic':
        return <Classic resumeData={resumeData} />;
      case 'best':
        return <Best resumeData={resumeData} />;
      case 'traditional':
        return <Traditional resumeData={resumeData} />;
      case 'formal':
        return <Formal resumeData={resumeData} />;
      case 'toronto':
        return <Toronto resumeData={resumeData} />;
      case 'functional':
        return <Functional resumeData={resumeData} />;
      case 'simple':
        return <Simple resumeData={resumeData} />;
      case 'stylish':
        return <Stylish resumeData={resumeData} />;
      case 'iconic':
        return <Iconic resumeData={resumeData} />;
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
            width: '199mm', // A4 width
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