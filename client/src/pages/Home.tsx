import { Link } from 'react-router-dom';
import ArticleImage from '../assets/no_articles.svg';

const Home = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center flex flex-col">
        <img src={ArticleImage} width={200} />
        <h1 className="text-3xl font-bold">Get started by creating your requirement</h1>
        <div className="flex gap-4">
          <button className="btn btn-primary">Create</button>
          <Link to="/upload">
            <button className="btn btn-primary">Upload</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
