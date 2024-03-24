import React from 'react'
import { Button } from "components/common/base/button";
import { useNavigate } from "react-router-dom";

const NofFound = () => {

  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="w-full h-screen bg-gradient flex items-center justify-center">
    <div className="w-[400px] h-[400px] xs:w-[240px]  xs:h-[240px] bg-white rounded-[100%] flex flex-col items-center justify-center">
      <h1 className="text-primary font-Roboto text-[24px] xs:text-[14px]">
       Sorry we dont know this path !
      </h1>
      <div className='mt-5'>
      <Button
        width={150}
        height={50}
        value="Home"
        variant="primary"
        onClick={handleNavigateToHome}
      />
      </div>
    </div>
  </div>
  )
}

export default NofFound
