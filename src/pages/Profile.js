import React,{useState} from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/MainLayout";
import BioInfoForm from "Forms/BioInfoForm";
import { Button } from "components/common/base/button";
import ProfileCard from "components/common/ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { userRegister, getProfile } from "../redux/slices/authSlice/authAction";
import useSnackMsg from "hooks/useSnackMsg";
import LocCard from "components/location/LocCard";
import Modal from "components/common/base/Modal";
import { isEmpty } from "lodash";
import { CircularProgress } from "@mui/material";
import {getAllAddress, deleteAddress, addAddress} from "../redux/slices/authSlice/authAction"
import useClient from "hooks/useClient";
import AddUpdateAdddress from "Forms/AddUpdateAdddress";

const Profile = () => {

  const authReducer = useSelector((state) => state.auth);
  const { allAddressLoader, allAddressData } = authReducer;
  const dispatch = useDispatch()
  const {eSnack, sSnack} = useSnackMsg()
  const [locOpen, setLocOpen] = useState(false)
  const [avatarLoader, setAvatarLoader] = useState(false)
  const {api} = useClient()
  const [updateLocData, setUpdateLocData] = useState({})

  const handleGetAllAddress = () => {
    dispatch(getAllAddress())
  }

  const handleUpdateBio = (val) => {

    dispatch(userRegister(val)).unwrap()
    .then((res)=>{
      sSnack("Successfully Profile Updated")
      dispatch(getProfile())
    })
    .catch((err)=>{
      eSnack("Sorry something is went wrong")
    })
  }

  const handleAddUpdateAddress = (val) => {
    
    if(!isEmpty(updateLocData) && updateLocData.id){
      Object.assign(val,{id:updateLocData.id})
    }

    dispatch(addAddress(val)).unwrap()
    .then((res)=>{
      setUpdateLocData({})
      handleGetAllAddress()
      setLocOpen(false)
      sSnack(res.message ? res.message : "Successfully !")
    })
    .catch((err)=>{
      setLocOpen(false)
      setUpdateLocData({})
      eSnack(err.message ? err.message : "Sorry something is went wrong");
    })
  }


  const handleDeleteAddress = (idx) => {
    if(!idx) return
    dispatch(deleteAddress({id:idx})).unwrap()
    .then((res)=>{
      handleGetAllAddress()
      sSnack("Successfully address deleted")
    })
    .catch((err)=>{
      eSnack("Sorry something is went wrong")
    })
  }

  const handleUpdateAvatar = (file) => {
    if (!file) return;
  
    const img = file[0];
    setAvatarLoader(true);
  
    const formData = new FormData();
    formData.append('avatar', img);
  
    api.postFormData(`/api/auth/change/avatar`, formData)
      .then((res) => {
        setAvatarLoader(false);
        dispatch(getProfile());
      })
      .catch(() => {
        setAvatarLoader(false);
        eSnack("Sorry something went wrong");
      });
  }

  const handleLocOpen = (data) => {
    if(!isEmpty(data)){
      setUpdateLocData(data)
    }
    setLocOpen(true)
  }
  

  return (
    <Layout>
      <div className="p-4">
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-1 gap-5">
          <div div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2 md:col-span-1 rounded-3xl border-2 border-primary p-5 flex flex-col  items-center justify-center">
            <ProfileCard handleUpdateAvatar={handleUpdateAvatar} loader={avatarLoader}/>
            </div>
          <div className="2xl:col-span-2 xl:col-span-2  lg:col-span-2 md:col-span-1 flex flex-col border-2 border-secondary rounded-3xl p-3">
            <BioInfoForm handleUpdateBio={handleUpdateBio}/>
          </div>
        </div>

        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-5 mt-10">
          <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-2 flex justify-between items-center">
            <p className="font-RobotoBold text-primary text-[28px]">
              My Location
            </p>
            <Button
              variant="secondary"
              width={160}
              value="Add New Location"
              height={50}
              onClick={() => handleLocOpen({})}
            />
          </div>
          {allAddressLoader && (
            <div className="flex justify-center 2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-2">
              <CircularProgress size={42} style={{color:"#668968"}}/>
            </div>
          )}
          {!allAddressLoader && allAddressData && allAddressData.length === 0 && (
           <p className="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-2  font-Roboto text-[18px]">You have not added any address !</p>
          )}
          {!allAddressLoader && allAddressData && allAddressData.length > 0 && allAddressData.map((item)=>(
            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-1">
              <LocCard data={item} handleDeleteAddress={handleDeleteAddress} onUpdate={handleLocOpen} countFlag={allAddressData && allAddressData.length === 1}/>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={locOpen} title={!isEmpty(updateLocData) ? `Update Location` :`Add New Location`}
      toggle={()=>{
        setUpdateLocData({})
        setLocOpen(false)
      }}>
        <AddUpdateAdddress onSubmit={handleAddUpdateAddress} defaultValues={!isEmpty(updateLocData) ? updateLocData : {}}/>
      </Modal>
    </Layout>
  );
};

export default withAuth(Profile);
