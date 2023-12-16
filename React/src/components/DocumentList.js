import React, { useEffect, useState } from 'react';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8001/api/documents');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents', error);
      }
    };

    fetchDocuments();
  }, []); 

  return (
    <div>
      <h2>Document List</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <strong>{document.name}</strong> - {document.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;