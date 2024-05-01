import React, {useState} from 'react'
import Layout from "layout/MainLayout"
import { useSelector } from 'react-redux'
import { Button } from 'components/common/base/button'
import { imgPath } from "helpers/path";
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, IconButton } from '@mui/material';
import ImageInputButton from "components/common/base/ImageInputButton";
import useClient from 'hooks/useClient';
import useSnackMsg from 'hooks/useSnackMsg';
import { removeImage, addImage } from '../redux/slices/products/productsReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { packagingType } from "helpers/constant";
import Modal from 'components/common/base/Modal'
import FruVegFiberGrains from 'Forms/updateProducts/FruVegFiberGrains'
import FertilizerPlant from 'Forms/updateProducts/FertilizerPlant'
import Seed from 'Forms/updateProducts/Seed'
import Machinary from 'Forms/updateProducts/Machinary'
import { getProductDetails } from '../redux/slices/products/productsActions'
import VerifiedIcon from '@mui/icons-material/Verified';
import UnpublishedIcon from '@mui/icons-material/Unpublished';


function getCategoryComponent(val, handleUpdate, data, updateProductLoader) {
    if (!val) return null;
    if (val === "Fruits" || val === "Vegetables" || val === "Fiber & Oil Seed Crops" || val === "Grains & Cereals") {
        return <FruVegFiberGrains onSubmit={handleUpdate} defaultValues={data} loader={updateProductLoader}/>;
    }
    if (val === "Fertilizers" || val === "Plant Pathology & Entomology" || val === "Pesticides" ) {
        return <FertilizerPlant onSubmit={handleUpdate} defaultValues={data} loader={updateProductLoader}/>;
    }
    if (val === "Seed Varieties") {
        return <Seed onSubmit={handleUpdate} defaultValues={data} loader={updateProductLoader}/>;
    }
    if (val === "Machinary & Tools") {
        return <Machinary onSubmit={handleUpdate} defaultValues={data} loader={updateProductLoader}/>;
    }

}

const ProductDetails = () => {

    const data = useSelector((state)=> state.products.productDetails)
    const loader = useSelector((state)=> state.products.detailLoader)
    const [addImageLoader, setAddImageLoader] = useState(false)
    const [dltImageLoader, setDltImageLoader] = useState(false)
    const [dltProLoader, setDltProLoader] = useState(false)
    const [approveLoader, setApproveLoader] = useState(false)
    const [updateProductLoader, setUpdateProductLoader] = useState(false)
    const {api} = useClient()
    const {eSnack, sSnack} = useSnackMsg()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [imgIndex,setImgIndex]  = useState(null)

const handleAddImage = (file) => {

    if (!file) return;
    const img = file[0];
    setAddImageLoader(true);
    const formData = new FormData();
    formData.append('images', img);
    formData.append('id', data.id);
    formData.append('productType', data.ProductType);
    api.postFormData(`/api/tech/product/add/image`, formData)
      .then((res) => {
        console.log("res", res)
        if(res.data.data){
            dispatch(addImage(res.data.data))
        }
        setAddImageLoader(false);
      })
      .catch((err) => {
        setAddImageLoader(false);
        eSnack(err.message ? err.message : "Sorry something went wrong");
      });
}

const handleDeleteImage = (x,y) => {
    
    const payload ={
        id: data.id && data.id,
        productType: data.ProductType && data.ProductType,
        imageName: x && x
    }
    setImgIndex(y)
    setDltImageLoader(true)
    api.post(`/api/tech/product/delete/image`, payload)
    .then((res)=>{
    
        setDltImageLoader(false)
        dispatch(removeImage(x))
    })
    .catch((err)=>{
        setDltImageLoader(false)
        eSnack(err.message ? err.message : "Sorry something went wrong");
    })
}

const handleDeleteProduct = () => {
   
    const payload = {
        id : data.id && data.id,
        productType: data.ProductType && data.ProductType 
    }
    setDltProLoader(true)
    api.post(`/api/tech/delete/product`, payload)
    .then((res)=>{
        setDltProLoader(false)
        sSnack("Successfully product deleted")
        navigate("/products")
    })
    .catch((err)=>{
        setDltProLoader(false)
        eSnack(err.message ? err.message : "Sorry something went wrong");
    })
}

const handleApproveProduct = () => {

    if(data && data.image && data.image.length === 0 ){
        eSnack("Please add at least one image !")
        return
    }
   
    const payload = {
        productId : data.id && data.id,
        productType: data.ProductType && data.ProductType 
    }
    setApproveLoader(true)
    api.post(`/api/tech/approve/product`, payload)
    .then((res)=>{
        setApproveLoader(false)
        sSnack("Successfully product approved")
        navigate("/products")
    })
    .catch((err)=>{
        setApproveLoader(false)
        eSnack(err.message ? err.message : "Sorry something went wrong");
    })
}

const getPkgType = (type) => {
    const val = packagingType && packagingType.find((item) => item.value === type)
    return val.label ? val.label : "" 
}

const handleDetailProduct = (x) => {
    const payload = {
        id: data.id && data.id,
        productType: data.ProductType && data.ProductType,
    }
    dispatch(getProductDetails(payload))
}

const handleUpdate = (val) => {
    Object.assign(val, {productType: val.ProductType && val.ProductType })
    setUpdateProductLoader(true)
    api.post(`/api/tech/update/product`, val)
    .then((res)=> {
        handleDetailProduct()
        setUpdateProductLoader(false)
        setModalOpen(false)
        // dispatch(addImage())
        sSnack("Successfully product updated")
    })
    .catch((err)=> {
        setUpdateProductLoader(false)
        eSnack(err.message ? err.message : "Sorry something went wrong");
    })
}

  return (
    <>
    <Layout>
        {loader ? (
            <div className=' mt-5 flex justify-center items-center'>
                <CircularProgress size={36} style={{color:"#668968"}}/>
            </div>
        ) : (
      <div className='p-4'>
        <div className='shadow-card rounded-xl flex flex-col p-5'>
        {/* {!data.isVerified && ( */}
            <div className='flex justify-between'>
            {data.isVerified ? <div className='flex'> <VerifiedIcon style={{color:"#668968"}}/> <p className='ml-1 text-primary font-semibold'>Verified</p> </div>:
            <div className='flex'> <UnpublishedIcon style={{color:"#668968"}}/> <p className='ml-1 text-primary font-semibold'>UnVerified</p> </div>
 }
                <Button value="Edit Info" width={140} height={45} onClick={()=> setModalOpen(true)}/>
            </div>
            {/* )} */}
            <p className='font-bold font-RobotoBold text-[20px] text-center text-primary mb-5'>Product info</p>
            {data.ProductType && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Product Type: <span className='text-black font-normal font-Roboto'>{data.ProductType}</span>
                </p>
            )}
            {data.subProductType && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Sub Product Type: <span className='text-black font-normal font-Roboto'>{data.subProductType}</span>
                </p>
            )}
            {data.name && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Product Name: <span className='text-black font-normal font-Roboto'>{data.name}</span>
                </p>
            )}
            {data.brand && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Brand Name: <span className='text-black font-normal font-Roboto'>{data.brand}</span>
                </p>
            )}
            {data.condition && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Product Condition: <span className='text-black capitalize font-normal font-Roboto'>{data.condition}</span>
                </p>
            )}
            {data.type && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Type: <span className='text-black font-normal font-Roboto'>{data.type}</span>
                </p>
            )}
            {data.pkgWeight && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Package Weight: <span className='text-black font-normal capitalize font-Roboto'>{data.pkgWeight}</span>
                </p>
            )}
                 {data.weightUnit && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Weight Unit: <span className='text-black font-normal capitalize font-Roboto'>{data.weightUnit}</span>
                </p>
            )}
                      {data.pkgType && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Package Type: <span className='text-black font-normal capitalize font-Roboto'>{data.pkgType && getPkgType(data.pkgType)}</span>
                </p>
            )}
            {data.horsePower && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Horse Power: <span className='text-black font-normal font-Roboto'>{data.horsePower}</span>
                </p>
            )}
            {data.seedType && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Seed Type: <span className='text-black font-normal capitalize font-Roboto'>{data.seedType}</span>
                </p>
            )}
                 {data.suitableRegion && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Suitable Region: <span className='text-black font-normal capitalize font-Roboto'>{data.suitableRegion}</span>
                </p>
            )}
            {data.seedVariety && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Seed Variety: <span className='text-black font-normal capitalize font-Roboto'>{data.seedVariety}</span>
                </p>
            )}
                    {data.seedWeight && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Seed Weight: <span className='text-black font-normal capitalize font-Roboto'>{data.seedWeight}</span>
                </p>
            )}
               {data.expiryDate && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                   Expiry Date: <span className='text-black font-normal capitalize font-Roboto'>{data.expiryDate}</span>
                </p>
            )}
                   {data.areaCovered && (
                <p className='text-primary text-[16px] font-semibold text-RobotoBold truncate'>
                    Area Covered: <span className='text-black font-normal capitalize font-Roboto'>{data.areaCovered}</span>
                </p>
            )}
             {data.disease && data.disease.length > 0 && (
                <>
                <p className='text-primary text-[16px] font-semibold text-RobotoBold'>Disease</p>
                <hr className='my-2'/>
                {data.disease.map((item,index) =>(
                    <p className="text-primary font-bold text-[14px]">{index + 1}: <span className="text-black font-normal">{item}</span></p>
                ))}
                <hr className='my-2'/>
                </>
            )}
            {data.composition && data.composition.length > 0 && (
                <>
                <p className='text-primary text-[16px] font-semibold text-RobotoBold'>Composition</p>
                <hr className='my-2'/>
                {data.composition.map((item,index) =>(
                    <p className="text-primary font-bold text-[14px]">{index + 1}: <span className="text-black font-normal">{`${item.name && item.name}${item.volume && `; ${item.volume}`}${item.unit && item.unit === "percentage" ? "%" : item.unit}`}</span></p>
                ))}
                <hr className='my-2'/>
                </>
            )}
            {data.description && (
            <p className='text-primary text-[16px] font-semibold text-RobotoBold'>
                Description <br/>
                <hr className='my-2'/>
                <span className='text-black font-normal font-Roboto'>{data.description}</span>
            </p>
            )}
     
        </div>
        <div className='shadow-card rounded-xl flex flex-col p-5 mt-5'>
        {/* {!data.isVerified && ( */}
            <div className='flex justify-end'>
                <ImageInputButton value="Add Image" onChange={handleAddImage} loader={addImageLoader}/>
            </div>
            {/* )} */}
        <p className='font-bold font-RobotoBold text-[20px] text-center text-primary mb-5'>Product Image</p>
        <div className='grid grid-cols-3 gap-3'>
            {data.image && data.image.length > 0 && data.image.map((item, index)=>(
                <div className='col-span-1 relative' key={index}>
                    {data.image && data.image.length > 1 && (
                        <>
                         {index === imgIndex && dltImageLoader ? <CircularProgress size={22} style={{color:"red"}}/> : 
                    <IconButton className='absolute top-0 left-0' onClick={()=>handleDeleteImage(item,index)} disabled={dltImageLoader}>
                         
                        <DeleteIcon style={{color:"red"}}/>
                    </IconButton>
                         }
                         </>
                    )}
                <img
                      className="max-h-[150px] relative min-h-[150px] max-w-full rounded-xl min-w-full object-cover"
                      draggable={false}
                      src={data.image && data.image.length > 0 && `${imgPath}${item}`}
                      alt="img"
                    />
             
                </div>
            ))}
        </div>
        </div>
        {!data.isVerified && (
        <div className='shadow-card rounded-xl flex flex-col p-5 mt-5'>
        <p className='font-bold font-RobotoBold text-[20px] text-center text-primary mb-5'>Perfom Action</p>
        <div className='flex justify-between'>
        <Button value="Delete Product" width={200} height={45} loader={dltProLoader} onClick={handleDeleteProduct} disabled={dltProLoader}/>
       
                <Button value="Approve Product" width={200} height={45} onClick={handleApproveProduct} disabled={approveLoader} loader={approveLoader}/>
        
            </div>
        </div>
        )}
      </div>
      )}
    </Layout>
    <Modal isOpen={modalOpen} title={`Edit Product Info`} toggle={() => setModalOpen(false)} fullWidth={true}>
            {getCategoryComponent(data.ProductType, handleUpdate, data , updateProductLoader)}
    </Modal>
    </>
  )
}

export default ProductDetails
