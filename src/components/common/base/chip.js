import React from 'react'


const Chip = ({value,width,height}) => {
  return (
    <div className='rounded-2xl capitalize bg-gradient text-white flex justify-center items-center font-RobotoBold text-center' style={{width:`${width}px`, height:`${height}px` }}>
      {value}
    </div>
  )
}

export default Chip
