import React,{useState} from 'react'
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import ImageInput from "components/common/base/ImageInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "components/common/base/button";
import { MachinaryFormSchema } from 'helpers/schema';
import {
  machinaryToolsOption,
  toolCondition
} from "helpers/constant";

const Machinary = ({onSubmit, loader, images, onImages }) => {

    const [proType, setProType] =useState("")
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MachinaryFormSchema(proType)),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            name="type"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("type")}
                onChange={(selectedOption) => {
                  setProType(selectedOption.target.value)
                  field.onChange(selectedOption)
                }}
                options={machinaryToolsOption}
                placeholder="Select Product Type"
                value={field.value}
                error={errors?.type && errors.type.message}
              />
            )}
          />
        </div>
        {(proType === "Tool" || proType === "Machinary") && (
            <div className="col-span-6">
            <Controller
                name="condition"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <SelectInput
                  {...register("condition")}
                    onChange={(selectedOption) => field.onChange(selectedOption)}
                    options={toolCondition}
                    placeholder="Select Condition"
                    value={field.value}
          
                    error={errors?.condition && errors.condition.message}
                  />
                )}
              />
            </div>
        )}
         {proType === "Machinary" && (
          <div className="col-span-6">
         <Controller
         name="horsePower"
         control={control}
         render={({ field }) => (
           <FormInput
             {...register("horsePower")}
             placeholder="Enter Horse Power"
             type="number"
             value={field.value}
             onChange={(e) => field.onChange(e.target.value)}
             error={errors?.horsePower && errors.horsePower.message}
           />
         )}
       />
            </div>
        )}
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

export default Machinary
