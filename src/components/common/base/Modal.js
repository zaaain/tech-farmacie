import React, { useEffect} from "react";
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({ isOpen, toggle, title, children, fullWidth }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset overflow to its default value
    }
    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-150 bg-modal ">
          <div className="flex justify-center items-center h-full">
            <div className={`relative border-0 flex flex-col bg-white  
         ${fullWidth ? `w-full h-full` : 
         `rounded-2xl shadow-dashboard 
         max-h-[80%] xs:max-h-[90%]
         2xl:max-w-[50%] 2xl:min-w-[50%]
         xl:max-w-[50%] xl:min-w-[50%]
         lg:max-w-[60%] lg:min-w-[60%]
         md:max-w-[70%] md:min-w-[70%]
         sm:max-w-[70%] sm:min-w-[70%]
         xs:max-w-[95%] xs:min-w-[95%] `}
            `}
            >
              <div className={`bg-gradient min-h-[60px] max-h-[60px] ${!fullWidth ? "rounded-t-xl" : "rounded-none"} flex justify-between px-3 items-center`}>
                <p className="text-white font-RobotoBold text-[20px]">{title}</p>
                {toggle && (
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-100 cursor-pointer" onClick={toggle}>
                  <CloseIcon color="#668968" />
                </div>
                )}
              </div>
              <div className="overflow-y-auto p-5">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
