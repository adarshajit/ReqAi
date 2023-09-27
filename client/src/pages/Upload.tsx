import { useState, FC, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import UploadImage from '../assets/upload.svg';

const Upload: FC = () => {
  const [file, setFile] = useState<File | string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center flex flex-col">
          <img src={UploadImage} width={200} />
          <h1 className="text-3xl font-bold">Upload Business Requirement Document</h1>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="file"
              onChange={handleChange}
              name="pdf_file"
              required
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <button className="btn btn-neutral" type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
