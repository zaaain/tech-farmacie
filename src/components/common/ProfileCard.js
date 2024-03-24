import React from 'react'
import { imgUrl , imgPath} from "helpers/path";
import { useSelector } from "react-redux";
import ImageInputButton from "components/common/base/ImageInputButton";

const ProfileCard = ({handleUpdateAvatar, loader}) => {
    const authReducer = useSelector((state) => state.auth);
    const { profileData } = authReducer;
   
  return (
    <>
    <img
      className="rounded-full mx-auto W-[150px] h-[150px]"
      draggable={false}
      src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
      alt="img"
    />
    <p className="font-RobotoBold text-[24px] my-5">{profileData.name && profileData.name}</p>
    <ImageInputButton onChange={handleUpdateAvatar} loader={loader}/>
  </>
  )
}

export default ProfileCard