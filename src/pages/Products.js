import React, { useEffect, useState } from 'react'
import Layout from "layout/MainLayout"
import ProductFilterForm from 'Forms/ProductFilterForm'
import useClient from 'hooks/useClient'
import useSnackMsg from 'hooks/useSnackMsg'
import { CircularProgress } from '@mui/material'
import ProductCard from 'components/cards/ProductCard'
import Modal from 'components/common/base/Modal'
import FruVegFiberGrains from 'Forms/addProducts/FruVegFiberGrains'
import FertilizerPlant from 'Forms/addProducts/FertilizerPlant'
import Seed from 'Forms/addProducts/Seed'
import Machinary from 'Forms/addProducts/Machinary'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { imgUrl } from "helpers/path";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProductDetails } from '../redux/slices/products/productsActions'


function getCategoryComponent(val,  onSubmit, addProLoader, images, handleImagesChange) {
    if (val === "Fruits" || val === "Vegetables" || val === "Fiber & Oil Seed Crops" || val === "Grains & Cereals") {
        return <FruVegFiberGrains selectedCate={val} onSubmit={onSubmit} loader={addProLoader} images={images} onImages={handleImagesChange}/>;
    }
    if (val === "Fertilizers" || val === "Plant Pathology & Entomology") {
        return <FertilizerPlant selectedCate={val} onSubmit={onSubmit} loader={addProLoader}  images={images} onImages={handleImagesChange}/>;
    }
    if (val === "Seed Varieties") {
        return <Seed selectedCate={val} onSubmit={onSubmit} loader={addProLoader}  images={images} onImages={handleImagesChange}/>;
    }
    if (val === "Machinary & Tools") {
        return <Machinary selectedCate={val} onSubmit={onSubmit} loader={addProLoader}  images={images} onImages={handleImagesChange}/>;
    }

}

const categoryData = [
    {
      id: 1,
      name: "Fruits",
      val: "fruits",
      img: imgUrl + "/category/Fruits.png",
    },
    {
      id: 2,
      name: "Vegetables",
      val: "vegetables",
      img: imgUrl + "/category/Veges.png",
    },
    {
      id: 3,
      name: "Fertilizers",
      val: "fertilizers",
      img: imgUrl + "/category/fertilizer.png",
    },
    {
      id: 4,
      name: "Fiber & Oil Seed Crops",
      val: "FiberOilSeedCrops",
      img: imgUrl + "/category/Oilandfibrecrops.png",
    },
    {
      id: 5,
      name: "Grains & Cereals",
      val: "grainsCereals",
      img: imgUrl + "/category/GrainandCerealCrop.png",
    },
    {
      id: 6,
      name: "Plant Pathology & Entomology",
      val: "plantPathologyEntomology",
      img: imgUrl + "/category/Entomolgy.png",
    },
    {
      id: 7,
      name: "Seed Varieties",
      val: "seedVarieties",
      img: imgUrl + "/category/SeedVarieties.png",
    },
    {
      id: 8,
      name: "Machinary & Tools",
      val: "machinaryTools",
      img: imgUrl + "/category/Machineryandtools.png",
    },
  ];

const Products = () => {

    const [filterLoader, setFilterLoader] = useState(false)
    const [data, setData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const { api } = useClient()
    const { eSnack , sSnack} = useSnackMsg()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newFlg, setNewFlag] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [msg,setMsg] = useState("Please search...")
    const [images,setImages] = useState([])
    const [addProLoader,setAddProLoader] = useState(false)


    const handleSearch = (val) => {

        const payload = {
            status: val.status ? val.status : undefined,
            productType: val.productType ? val.productType : undefined
        }
        setData([])
        setFilterLoader(true)
        api.post(`/api/tech/all/products`, payload)
            .then((res) => {
                setFilterLoader(false)
                const response = res.data && res.data.data ? res.data.data : []
                setData(response)
                setMsg(response && response.length === 0 ? "Sorry no product available" : "")
            })
            .catch((err) => {
                setFilterLoader(false)
                eSnack(err.message ? err.message : "Sorry something is went wrong")
            })
    }

    useEffect(()=>{
        handleSearch({status:null,productType:null })
    },[])

    const onSubmit = (val) => {
        Object.assign(val,{
            productType:selectedCategory,
            isAlreadyExists:true
        })
        const formData = new FormData();
        Object.keys(val).forEach((key) => {
            formData.append(key, val[key]);
        });
        images.forEach((image, index) => {
            formData.append(`images`, image);
        })
        setAddProLoader(true)
        api.postFormData(`/api/tech/add/product`, formData)
        .then((res)=>{
            setImages([])
            setModalOpen(false)
            setAddProLoader(false)
            sSnack("Successfully product is added ")
        })
        .catch((err)=>{
            setImages([])
            setModalOpen(false)
            setAddProLoader(false)
            eSnack(err.message ? err.message : "Sorry something is went wrong")
        })
        console.log("val", val)
    }

    const handleImagesChange = (file) => {
        const img = file[0]
        setImages([...images, img]);
      };

    const handleDetailProduct = (x) => {
        const payload = {
            id: x.id && x.id,
            productType: x.ProductType && x.ProductType,
        }
        dispatch(getProductDetails(payload))
        navigate("/products/details")
    }

    const handleSelectCategory = async (val) => {
        if (!val) return;
        await setSelectedCategory(val);
        setModalOpen(true)
    };

    return (
        <>
            <Layout>
                <div className='p-4'>
                    {!newFlg ? (
                    <>
                    <ProductFilterForm handleSearch={handleSearch} loader={filterLoader} onNew={()=>setNewFlag(true)} />
                    {filterLoader && (
                        <div className='flex justify-center mt-10'>
                            <CircularProgress sze={28} style={{ color: "#668968" }} />
                        </div>
                    )}
                    {!filterLoader && msg &&  (
                        <div className='flex mt-10'>
                            <p className='font-semibold font-RobotoBold text-primary text-[18px]'>{msg}</p>
                        </div>
                    )}
                    <div className='grid grid-cols-3 mt-10 gap-5'>
                        {!filterLoader && data && data.length > 0 && data.map((item, index) => (
                            <div className='col-span-1' key={index}>
                                <ProductCard onDetails={handleDetailProduct} data={item} loader={false}/>
                            </div>
                        ))}

                    </div>
                    </>
                    ):(
                        <>
                            
               <div className="flex mb-2 z-10 bg-white sticky ">
               <div className="shadow-dashboard p-2 rounded-lg flex items-center cursor-pointer" onClick={()=>setNewFlag(false)}>
               <ArrowBackIcon/> 
               </div>
             </div>
     
                        <div className="grid grid-cols-12 gap-5 mt-5">
                        {categoryData.map((item) => (
                          <div
                            className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-12 p-2 hover:border-2 cursor-pointer hover:border-primary shadow-card rounded-2xl flex flex-col justify-center items-center"
                            key={item.id}
                            onClick={() => handleSelectCategory(item.name)}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              draggable={false}
                              className="rounded-xl max-h-[150px] object-contain min-h-[150px] min-w-[150px]"
                            />
                            <p className="mt-5 font-Roboto text-[16px]">{item.name}</p>
                          </div>
                        ))}
                      </div>
                      </>
                    )}
                </div>
            </Layout>
            <Modal isOpen={modalOpen} title={`Add New Product`} 
            toggle={() => {
                setImages([])
                setModalOpen(false)
            }} fullWidth={true}>
                {getCategoryComponent(selectedCategory, onSubmit, addProLoader,  images,  handleImagesChange)}
            </Modal>
        </>
    )
}

export default Products
