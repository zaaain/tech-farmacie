import React, { forwardRef } from "react";
import { RiseLoader } from 'react-spinners';

const ImageInputButton = forwardRef(({ onChange, loader, value }) => {
  
  const handleChange = (event) => {
    onChange(event.target.files);
  };

  const handleClick = () => {
    const element = document.getElementById('imageInput');
    if (element) {
      element.click();
      // Clear the value of the input element
      element.value = '';
    } else {
      console.error('Element with id "imageInput" not found');
    }
  };
  

  return (
    <>
      <input
        id="imageInput"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={loader}
      />
     
      <div
        className="w-[170px] bg-primary h-[50px] rounded-lg outline-none p-5 font-Roboto text-[16px] flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
         {!loader ? <span className="text-white	text-lg">{value}</span> : <RiseLoader color="#fff" size={14} />}
      </div>
    </>
  );
});

export default ImageInputButton;
