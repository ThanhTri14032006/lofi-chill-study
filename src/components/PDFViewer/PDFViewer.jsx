import React from 'react';
import './PDFViewer.scss';

const PDFViewer = ({ pdfFile, onClose }) => {
  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer-header">
        <h3>Đọc tài liệu PDF</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="pdf-container">
        <iframe
          src={pdfFile}
          title="PDF Viewer"
          className="pdf-iframe"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PDFViewer;