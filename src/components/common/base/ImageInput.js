import React, { forwardRef } from "react";

const ImageInput = forwardRef(({ onChange, disabled, placeholder, error, ...rest }, ref) => {
  
  const handleChange = (event) => {
    onChange(event.target.files);
  };

  const handleClick = () => {
    const element = document.getElementById('imageInput');
    if (element) {
      element.click();
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
        ref={ref}
        {...rest}
      />
     
      <div
        className="min-w-full bg-[#f5f6f7] border-2 border-dashed h-[120px] rounded-2xl outline-none p-5 font-Roboto text-[16px] flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
         <span>{placeholder}</span>
      </div>
      {error && <p className="text-red-600 font-Roboto text-[12px] mt-2">{error}</p>}
    </>
  );
});

export default ImageInput;
