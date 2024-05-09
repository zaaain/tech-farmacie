import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { imgPath } from "helpers/path";
import VerifiedIcon from '@mui/icons-material/Verified';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { useNavigate } from 'react-router-dom/dist';
import { RiseLoader } from 'react-spinners';


const ProductCard = ({onDetails, data, loader}) => {

    const navigate = useNavigate()

  return (
    <div className='shadow-card rounded-lg'>
        <div className='p-2 flex justify-end'>
            {data.isVerified ? <VerifiedIcon style={{color:"#668968"}}/> : <UnpublishedIcon style={{color:"#668968"}}/> }
            
        </div>
     <div className='py-2'>
      <img
        className="max-h-[150px] min-h-[150px] max-w-[150px] min-w-[150px] rounded-full mx-auto"
        draggable={false}
        src={data.image && data.image.length > 0 && `${imgPath}${data.image[0]}`}
        alt="avatar"
      />
      </div>
      <div className="p-3 leading-6">
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Name:{" "}
          <span className="text-black font-Roboto  ">
            {data.name && data.name}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Category:{" "}
          <span className="text-black font-Roboto  ">
            {data.ProductType && data.ProductType}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           SubCategory:{" "}
          <span className="text-black font-Roboto  ">
            {data.subProductType ? data.subProductType : "N/A"}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Brand:{" "}
          <span className="text-black font-Roboto  ">
            {data.brand ? data.brand : "N/A"}
          </span>
        </p>
      </div>
      {/* <div className='flex justify-center items-center flex-col py-2'>
      <p className=' font-semibold font-RobotoBold text-[14px] w-[95%] text-center truncate'>
            {data.ProductType && data.ProductType}
        </p>
        <p className=' font-semibold font-RobotoBold text-[14px] w-[95%] text-center truncate'>
            {data.name && data.name}
        </p>
      </div> */}
      <button disabled={loader} onClick={()=>onDetails(data)} className='bg-gradient w-full h-[50px] rounded-b-lg flex justify-center items-center cursor-pointer'>
      {!loader ? <p className='text-white font-semibold font-RobotoBold text-[16px]'>Details</p> : <RiseLoader color="#ffffff" size={14} />}
        
        {/* <Tooltip title="Delete" arrow placement='top'>
        <div className='bg-transparent border-2 border-white w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer'>
            <DeleteIcon style={{color:"#ffff"}}/>
        </div>
        </Tooltip>
        <Tooltip title="Update" arrow placement='top'>
        <div onClick={()=>handleUpdate(data)} className='bg-transparent border-2 border-white w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer'>
            <EditIcon style={{color:"#ffff"}}/>
        </div>
        </Tooltip> */}
      </button>
    </div>
  )
}

export default ProductCard