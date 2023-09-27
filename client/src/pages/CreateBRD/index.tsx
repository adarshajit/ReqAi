import { useState, FC, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import Create from '../../assets/create.svg';
import ReactMarkdown from 'react-markdown';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  text: {
    fontSize: 12,
  },
});

const CreateBRD: FC = () => {
  const [statement, setStatement] = useState('');
  const [BRD, setBRD] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setStatement(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('problemStatement', statement);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/createBrd', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setBRD(response.data);
    } catch (error) {
      console.error('Error creating BRD:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (BRD === '')
    return (
      <>
        <div className="hero min-h-screen">
          <div className="hero-content text-center flex flex-col">
            <img src={Create} width={200} />
            <h1 className="text-3xl font-bold">Upload Business Requirement Document</h1>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input type="text" onChange={handleChange} name="problemStatement" required />
              <button className="btn btn-neutral" type="submit">
                Generate
              </button>
            </form>
          </div>
        </div>
      </>
    );

  if (BRD)
    return (
      <div className="flex flex-col my-32 gap-20">
        <div id="content-to-export">
          <ReactMarkdown children={BRD} className="prose lg:prose-xl" />
        </div>
        <PDFDownloadLink
          fileName="BRD.pdf"
          document={<GeneratedBrdPDF BRD={BRD} />}
          className="btn btn-neutral"
        >
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Export as PDF')}
        </PDFDownloadLink>
      </div>
    );
};

const GeneratedBrdPDF: FC<{ BRD: string }> = ({ BRD }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.text}>{BRD}</Text>
    </Page>
  </Document>
);

export default CreateBRD;