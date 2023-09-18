import { Link } from 'react-router-dom';
import { homePageCardItems } from '../constants';

const Home = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center flex flex-col gap-16">
        <div className="flex gap-10">
          {homePageCardItems.map((item) => {
            return (
              <div className="flex flex-col gap-6 w-64 justify-center items-center">
                <img src={item.image.file} width={item.image.size} />
                <p>{item.description}</p>
                <Link to={item.url} className="w-full">
                  <button className="btn btn-neutral w-full">{item.title}</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
