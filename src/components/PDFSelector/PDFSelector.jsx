import React, { useState } from 'react';
import './PDFSelector.scss';

const PDFSelector = ({ onSelectPDF }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Tạo URL cho file đã chọn
      const fileURL = URL.createObjectURL(file);
      
      // Thêm file mới vào danh sách
      const newFile = {
        name: file.name,
        url: fileURL,
        size: (file.size / 1024 / 1024).toFixed(2) // Kích thước tính bằng MB
      };
      
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(newFile);
      onSelectPDF(fileURL);
    }
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    onSelectPDF(file.url);
  };

  return (
    <div className="pdf-selector">
      <div className="upload-section">
        <label className="upload-button">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            style={{ display: 'none' }}
          />
          <i className="fas fa-upload"></i> Tải lên PDF
        </label>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="file-list">
          <h4>Tài liệu của bạn</h4>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li 
                key={index} 
                className={selectedFile && selectedFile.url === file.url ? 'active' : ''}
                onClick={() => handleSelectFile(file)}
              >
                <i className="fas fa-file-pdf"></i>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{file.size} MB</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {uploadedFiles.length === 0 && (
        <div className="no-files">
          <p>Chưa có tài liệu nào được tải lên</p>
          <p>Tải lên file PDF để bắt đầu đọc</p>
        </div>
      )}
    </div>
  );
};

export default PDFSelector;