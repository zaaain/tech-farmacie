import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "components/common/base/button";
import { imgPath, imgUrl } from "helpers/path";
import { useSelector } from "react-redux";
import useLogout from "hooks/useLogout";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { isEmpty } from 'lodash';


const MobileNavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth)
    const { profileData, role, roleLoader } = authData
    const logout = useLogout()
    const [open, setOpen] = React.useState(false)
    const [roleOpen, setRoleOpen] = useState(false)


    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = ""; 
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleRoute = (name) => {
        navigate(`/${name}`)
        setOpen(false)
    }


    const handleClick = () => {
         setOpen(false)
          setRoleOpen(true)

    }

    return (
        <>
            <div className="bg-white border-b-2 border-primary  w-full z-140 p-2 flex items-center justify-between sticky top-0">
                <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    alt="logo"
                    draggable={false}
                    className="w-[150px] h-[50px] bg-cover"
                />
                <MenuIcon style={{ color: "#668968", fontSize: "28px" }} onClick={() => setOpen(true)} />
            </div>
            {open && (
                <div className='flex fixed top-0 left-0 right-0 bottom-0 bg-modal z-150'>
                    <div className='w-[70%] h-full bg-white py-3'>
                    
                            <img
                                src={profileData && !isEmpty(profileData) && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
                                alt="logo"
                                draggable={false}
                                className="rounded-full mx-auto pb-3 w-[100] h-[100px]"
                            />
                        
                                <div className='border-b-2 border-primary ' />

                        <div className='pt-3 px-3 flex flex-col items-center justify-center'>
            
                            <p className={`text-[16px] font-RobotoBold pb-2 ${role !== "seller" && `pt-3`} hover:text-primary hover:cursor-pointer ${location.pathname === "/" && "text-primary"}`}
                                onClick={() => handleRoute("")}
                            >
                                Home
                            </p>
                            <p className={`text-[16px] font-RobotoBold pb-2 hover:text-primary hover:cursor-pointer ${location.pathname === "/product" && "text-primary"}`}
                                onClick={() => handleRoute("products")}
                            >
                                Productus
                            </p>
               
                

                            
                           
                            
                                <p className={`text-[16px] font-RobotoBold hover:text-primary hover:cursor-pointer`}
                                    onClick={logout}
                                >
                                    Log Out
                                </p>
                           
                        </div>
                    </div>
                    <div className='bg-gradient w-[50px] h-[57px] flex items-center justify-center' onClick={() => setOpen(false)}>
                        <CloseIcon style={{ color: "#fff" }} />
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileNavBar