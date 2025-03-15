import React from 'react';

const ImportedDataTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Get headers from the first object's keys
  const headers = Object.keys(data[0]);

  return (
    <div className="imported-data-container">
      <h3>Imported Data</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportedDataTable; 