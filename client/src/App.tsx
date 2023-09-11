import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Tickets from './pages/Tickets';

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div className="grid w-24 place-items-center border border-solid border-gray-200 fixed">
          content
        </div>
        <div className="">
          <Navbar />
          <div className="grid place-items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/tickets" element={<Tickets />} />
              {/* <Route path="*" element={<Error />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
