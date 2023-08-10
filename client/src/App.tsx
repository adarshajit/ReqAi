import axios from 'axios';
import { useState } from 'react';

const App = () => {
  const [file, setFile] = useState('');

  const handleChange = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <h1>Upload Business Requirement Document</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} name="pdf_file" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default App;
