import React, { useState } from 'react';

const DocumentUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('document', file);
    try {
      const response = await fetch('http://127.0.0.1:8001/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Response from Laravel:', data);
    } catch (error) {
      console.error('Error uploading document to Laravel', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Document</button>
    </form>
  );
};

export default DocumentUploadForm;
