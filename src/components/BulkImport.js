import React, { useState } from 'react';

const BulkImport = ({ onClose, onImport }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if file is an Excel file
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          selectedFile.type === 'application/vnd.ms-excel') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload only Excel files (.xlsx or .xls)');
        setFile(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onImport(file);
      onClose();
    } else {
      setError('Please select a file to upload');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Bulk Import</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="file-upload-container">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                {file ? file.name : 'Choose Excel File'}
              </label>
            </div>
            {file && (
              <p className="file-name">
                Selected file: {file.name}
              </p>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Import
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkImport; 