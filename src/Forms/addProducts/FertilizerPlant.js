import React,{useState, useEffect} from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import ImageInput from "components/common/base/ImageInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "components/common/base/button";
import {
  packagingType,
  weightUnitType,
} from "helpers/constant";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { FertilizerPlantSchema } from "helpers/schema";
import useSnackMsg from "hooks/useSnackMsg";

const FertilizerPlant = ({onSubmit, loader, images, onImages }) => {

  const [chemicals, setChemicals] = useState([{ name: "", unit:"",volume:""}]);
  const [flag, setFlag] = useState(true);
  const [chemFlag, setChemFlag] = useState(false);
  const {eSnack} = useSnackMsg()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FertilizerPlantSchema),
  });


  const checkEmptyFields = (chemicalsArray) => {
    const isEmpty = chemicalsArray.some(
      (chem) => chem.name.trim() === ""
    );
    setFlag(isEmpty);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedChemicals = [...chemicals];
    updatedChemicals[index][fieldName] = value;
    setChemicals(updatedChemicals);
    checkEmptyFields(updatedChemicals);
  };

  const handleAddNewChem = () => {
    if(!chemFlag) return
    setChemicals([...chemicals, { name: "", unit:"", volume:"" }]);
    setFlag(true);
  };

  const handleRemoveChem = (index) => {
    if(!chemFlag || chemicals.length === 1) return
    const updatedChemicals = [...chemicals];
    updatedChemicals.splice(index, 1);
    setChemicals(updatedChemicals);
  };

  useEffect(()=>{
    const flag = chemicals.some((item)=> item.name)
    if(flag){
      setChemFlag(true)
    }else{
      setChemFlag(false)
    }
  },[chemicals])

  const onSubmitNow = async (val) => {
    if (flag) {
      eSnack("First, add the active ingredient.");
      return;
    }
    Object.assign(val, { composition: JSON.stringify(chemicals) });
    onSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitNow)}>
    <div className="grid grid-cols-6 gap-4">
    <div className="col-span-3">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter Product Name"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                error={errors?.name && errors.name.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("brand")}
                placeholder="Brand Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.brand && errors.brand.message}
              />
            )}
          />
        </div>
        <>
        {chemicals.map((chem, index) => (
        <>
        <div className={"col-span-2"}>
 
              <FormInput
                placeholder="Active Ingredients"
                value={chem.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                error={errors?.composition && errors.composition.message}
              />
    
        </div>
        <div className="col-span-1">
        <FormInput
                placeholder="Concentration"
                type="number"
                value={chem.volume}
                onChange={(e) => handleInputChange(index, "volume", e.target.value)}
              />
        </div>
        <div className="col-span-2">
        <SelectInput
                placeholder="Unit"
                value={chem.unit}
                options={weightUnitType}
                onChange={(e) => handleInputChange(index, "unit", e.target.value)}
              />
        </div>
      
        <div className="col-span-1 flex">
              <div className={`${!chemFlag ? "bg-[#eaeaea]" : "bg-primary"} p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={handleAddNewChem}>
                <AddIcon style={{color:"white"}}/>
              </div>
              <div className={`${!chemFlag || chemicals.length === 1 ? "bg-[#eaeaea]" : "bg-secondary"} ml-5 p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={()=>handleRemoveChem(index)}>
                <CloseIcon style={{color:"white"}}/>
              </div>
        </div>
        </>
        ))}
        </>
        <div className="col-span-3">
          <Controller
            name="pkgWeight"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("pkgWeight")}
                placeholder="Enter Package Weight"
                value={field.value}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgWeight && errors.pkgWeight.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="weightUnit"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("weightUnit")}
                placeholder="Weight Unit"
                value={field.value}
                options={weightUnitType}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.weightUnit && errors.weightUnit.message}
              />
            )}
          />
        </div> 
        <div className="col-span-6">
          <Controller
            name="pkgType"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...register("pkgType")}
                placeholder="Packaging Type"
                value={field.value}
                options={packagingType}
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div>
       <div className="col-span-6">
         <Controller
           name="description"
           control={control}
           render={({ field }) => (
             <TextAreaInput
               {...register("description")}
               placeholder="Enter Product Description"
               value={field.value}
               onChange={(e) => field.onChange(e.target.value)}
               error={errors?.description && errors.description.message}
             />
           )}
         />
       </div>
       <div className="col-span-6">
             <ImageInput
             placeholder="Enter Product Image"
             onChange={onImages}            
             />
       </div>
       {images && images.length > 0 && (
        <>
          {images.map((img, index) => (
          <div className="col-span-2">
          <img key={index} src={URL.createObjectURL(img)} alt={img.name} className="object-cover h-[150px] min-w-full max-w-full  rounded-2xl"/>
          </div>
       ))}
            </>

        )}
       <div className="col-span-6 flex mx-auto">
         <Button
           value="Submit"
           width={150}
           height={45}
           disabled={(images && images.length <= 0) || loader}
           loader={loader}
           variant="primary"
           type="submit"
         />
       </div>
    </div>
   </form>
  )
}

export default FertilizerPlant
