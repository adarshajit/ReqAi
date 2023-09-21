import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';
import Home from './pages/Home';
import CreateDiagram from './pages/CreateDiagram';

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="grid place-items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/create/diagram" element={<CreateDiagram />} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
