import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import CreateDiagram from './pages/CreateDiagram';
import CreateBRD from './pages/CreateBRD';

const App: FC = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="grid place-items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/create/diagram" element={<CreateDiagram />} />
            <Route path="/create/brd" element={<CreateBRD />} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
