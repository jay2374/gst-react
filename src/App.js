import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BulkImport from './components/BulkImport';
import ImportedDataTable from './components/ImportedDataTable';
import './App.css';
import * as XLSX from 'xlsx';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [importedData, setImportedData] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsSignedIn(true);
      setError('');
      setShowSignIn(false);
      clearForm();
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email && password && name) {
      setIsSignedIn(true);
      setError('');
      setShowSignUp(false);
      clearForm();
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleBulkImport = async (file) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first worksheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          if (jsonData.length === 0) {
            throw new Error('No data found in the Excel file');
          }
          
          setImportedData(jsonData);
          setShowBulkImport(false);
          console.log('Successfully imported data:', jsonData);
        } catch (error) {
          console.error('Error processing Excel file:', error);
          setError('Error processing Excel file: ' + error.message);
        }
      };

      reader.onerror = () => {
        setError('Error reading file');
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error handling file:', error);
      setError('Error handling file: ' + error.message);
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setImportedData(null);
    clearForm();
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">MyApp</div>
        <div className="nav-buttons">
          {!isSignedIn ? (
            <>
              <button onClick={() => setShowBulkImport(true)} className="nav-button bulk-import-btn">
                Bulk Import
              </button>
              <button onClick={() => setShowSignIn(true)} className="nav-button">
                Sign In
              </button>
              <button onClick={() => setShowSignUp(true)} className="nav-button">
                Sign Up
              </button>
            </>
          ) : (
            <button onClick={handleSignOut} className="nav-button sign-out-btn">
              Sign Out
            </button>
          )}
        </div>
      </nav>

      <main className="main-content">
        {isSignedIn && (
          <div className="welcome-container">
            <h2>Welcome!</h2>
            <p>You are now signed in.</p>
          </div>
        )}
        {importedData && <ImportedDataTable data={importedData} />}
      </main>

      {showSignIn && (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSignIn={handleSignIn}
          onClose={() => setShowSignIn(false)}
        />
      )}

      {showSignUp && (
        <SignUp
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSignUp={handleSignUp}
          onClose={() => setShowSignUp(false)}
        />
      )}

      {showBulkImport && (
        <BulkImport
          onImport={handleBulkImport}
          onClose={() => setShowBulkImport(false)}
        />
      )}
    </div>
  );
}

export default App;
