import React from 'react'
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import TextAreaInput from "components/common/base/TextAreaInput";
import ImageInput from "components/common/base/ImageInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "components/common/base/button";
import { packagingType,weightUnitType } from "helpers/constant";
import { FruVegFiberGrainsSchema } from 'helpers/schema';


const FruVegFiberGrains = ({onSubmit, loader, images, onImages}) => {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FruVegFiberGrainsSchema),
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
                placeholder="Enter Commodity Name"
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
            name="pkgType"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("pkgType")}
                options={packagingType}
                placeholder="Select Packaging Type"
                value={field.value}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                error={errors?.pkgType && errors.pkgType.message}
              />
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            name="weightUnit"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("weightUnit")}
                options={weightUnitType}
                placeholder="Select Unit Type"
                value={field.value}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                error={errors?.weightUnit && errors.weightUnit.message}
              />
            )}
          />
        </div>
        <div className={ `col-span-3`}>
          <Controller
            name="pkgWeight"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("pkgWeight")}
                placeholder="Enter Package Weight"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                type="number"
                error={errors?.pkgWeight && errors.pkgWeight.message}
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

export default FruVegFiberGrains
