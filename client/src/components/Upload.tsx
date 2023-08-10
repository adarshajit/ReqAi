import { useState, FC, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const Upload: FC = () => {
  const [file, setFile] = useState<File | string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

export default Upload;
