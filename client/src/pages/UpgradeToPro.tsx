import { PRICING_PLANS } from '../constants';
import PeopleImage from '../assets/people.svg';

const UpgradeToPro = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">Pricing Plans</h1>
          <p className="text-lg">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </div>
        <div className="flex justify-center items-center gap-10">
          {PRICING_PLANS.map((plan) => {
            return (
              <div key={plan.id} className="flex flex-col gap-6 w-64 justify-center items-center">
                <p className="text-5xl font-bold">${plan.price} </p>
                <p className="text-lg font-bold">{plan.title} plan</p>

                <ul className="flex flex-col items-start">
                  {plan.features.map((feature) => (
                    <li>{feature}</li>
                  ))}
                </ul>

                <button className="btn btn-neutral w-full">Get Started</button>
              </div>
            );
          })}
        </div>
      </div>
      <img src={PeopleImage} className="bottom-0 left-0 w-full fixed h-24" />
    </div>
  );
};

export default UpgradeToPro;
