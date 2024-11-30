import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../resources/Animation - 1732987938448.json';

const CollectionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-[400px] h-[400px]">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <h1 className="text-3xl font-bold mt-4">Upcoming Feature</h1>
    </div>
  );
};

export default CollectionsPage;