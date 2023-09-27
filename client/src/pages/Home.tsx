import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FEATURES } from '../constants';

const Home: FC = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center flex flex-col gap-16">
        <div className="flex gap-10">
          {FEATURES.map((feature) => {
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-6 w-64 justify-center items-center"
              >
                <img src={feature.image.file} width={feature.image.size} />
                <p>{feature.description}</p>
                <Link to={feature.url} className="w-full">
                  <button className="btn btn-neutral w-full">{feature.title}</button>
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
