import React, { Component } from 'react';
import DocumentUploadForm from './components/DocumentUploadForm';
import DocumentList from './components/DocumentList';

function App() {
  return (
    <div>
      <DocumentUploadForm />
      <DocumentList />
    </div>
  );
}

export default App;
