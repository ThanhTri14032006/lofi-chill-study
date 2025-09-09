import React, { useState } from 'react';
import PDFSelector from '../PDFSelector/PDFSelector';
import PDFViewer from '../PDFViewer/PDFViewer';
import './DocumentPanel.scss';

const DocumentPanel = ({ onClose }) => {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [viewMode, setViewMode] = useState('select'); // 'select' hoặc 'view'

  const handleSelectPDF = (pdfFile) => {
    setSelectedPDF(pdfFile);
    setViewMode('view');
  };

  const handleBackToSelect = () => {
    setViewMode('select');
  };

  return (
    <div className="document-panel">
      <div className="panel-header">
        <h3>Tài liệu</h3>
        {viewMode === 'view' && (
          <button className="back-button" onClick={handleBackToSelect}>
            <i className="fas fa-arrow-left"></i> Quay lại
          </button>
        )}
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="panel-content">
        {viewMode === 'select' ? (
          <PDFSelector onSelectPDF={handleSelectPDF} />
        ) : (
          <PDFViewer pdfFile={selectedPDF} onClose={handleBackToSelect} />
        )}
      </div>
    </div>
  );
};

export default DocumentPanel;