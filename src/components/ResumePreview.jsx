








"use client";

import { useRef } from 'react';
import Modern from './templates/Modern';
import Professional from './templates/Professional';
import Creative from './templates/Creative';
import Elegant from './templates/Elegant';
import Classic from './templates/Classic';
import Best from './templates/Best';

export default function ResumePreview({ resumeData, selectedTemplate }) {
  const resumeRef = useRef(null);
  
  // const downloadPDF = async () => {
  //   try {
  //     const { toCanvas } = await import('html-to-image');
  //     const { jsPDF } = await import('jspdf');
      
  //     const element = resumeRef.current;
      
  //     // Show loading state
  //     const downloadBtn = document.getElementById('download-btn');
  //     const originalText = downloadBtn.innerText;
  //     downloadBtn.innerText = 'Generating...';
  //     downloadBtn.disabled = true;
      
  //     // Using toCanvas for higher quality rendering
  //     const canvas = await toCanvas(element, { 
  //       quality: 1,
  //       pixelRatio: 4, // Increased further for even sharper text
  //       backgroundColor: '#ffffff',
  //       fontEmbedCSS: document.styleSheets,
  //       skipFonts: false
  //     });
      
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
  //     // Create PDF with higher DPI
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4',
  //       compress: true,
  //       hotfixes: ["px_scaling"]
  //     });
      
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
      
  //     // Add image to PDF with better quality settings
  //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
  //     // Save the PDF
  //     pdf.save(`${resumeData?.personalInfo?.name || 'resume'}.pdf`);
      
  //     // Reset button state
  //     downloadBtn.innerText = originalText;
  //     downloadBtn.disabled = false;
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     alert('Failed to generate PDF. Please try again.');
      
  //     // Reset button on error
  //     const downloadBtn = document.getElementById('download-btn');
  //     if (downloadBtn) {
  //       downloadBtn.innerText = 'Download PDF';
  //       downloadBtn.disabled = false;
  //     }
  //   }
  // };


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
  const addClickableLinks = async (pdf, resumeData) => {
    try {
      // Get link positions from DOM elements
      const getLinkPosition = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
  
        const rect = element.getBoundingClientRect();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Convert viewport coordinates to PDF coordinates (mm)
        const x = (rect.left / window.innerWidth) * pdfWidth;
        const y = (rect.top / window.innerHeight) * pdfHeight;
        const width = (rect.width / window.innerWidth) * pdfWidth;
        const height = (rect.height / window.innerHeight) * pdfHeight;
        
        return { x, y, width, height };
      };
  
      // Add personal links (LinkedIn, GitHub)
      if (resumeData.personalInfo?.linkedin) {
        const linkedinPos = getLinkPosition('.linkedin-link');
        if (linkedinPos) {
          pdf.link(linkedinPos.x, linkedinPos.y, linkedinPos.width, linkedinPos.height, 
            { url: ensureHttps(resumeData.personalInfo.linkedin) });
        }
      }
  
      if (resumeData.personalInfo?.github) {
        const githubPos = getLinkPosition('.github-link');
        if (githubPos) {
          pdf.link(githubPos.x, githubPos.y, githubPos.width, githubPos.height, 
            { url: ensureHttps(resumeData.personalInfo.github) });
        }
      }
  
      // Add project links
      if (resumeData.projects?.length > 0) {
        resumeData.projects.forEach((project, index) => {
          if (project.link) {
            const projectLinkPos = getLinkPosition(`.project-link-${index}`);
            if (projectLinkPos) {
              pdf.link(projectLinkPos.x, projectLinkPos.y, projectLinkPos.width, projectLinkPos.height, 
                { url: ensureHttps(project.link) });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error adding clickable links:', error);
    }
  };
  
  // Helper to ensure URLs have http/https
  const ensureHttps = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
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