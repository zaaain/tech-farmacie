import React from "react";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { BioUpdateSchema } from "helpers/schema";

const BioInfoForm = ({handleUpdateBio}) => {
  const authReducer = useSelector((state) => state.auth);
  const { profileData , registerProfileLoader} = authReducer;

  const defaultValues = {
    name: profileData.name,
    phone: profileData.phone && "0" + profileData.phone.replace(/^0|92/, ""),
    description: profileData.description
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BioUpdateSchema),
    defaultValues,
  });



  return (
    <form onSubmit={handleSubmit(handleUpdateBio)}>
      <div className="grid grid-cols-2 gap-5 p-3">
        <div className="col-span-2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("name")}
                placeholder="Enter First Name"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.name && errors.name.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("phone")}
                placeholder="Enter Phone"
                value={field.value}
                disabled={true}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.phone && errors.phone.message}
              />
            )}
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("description")}
                placeholder="Enter description"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.description && errors.description.message}
              />
            )}
          />
        </div>
        <div className="col-span-2 flex justify-center">
              <Button value="Update Bio" width={150} height={45} type="submit" loader={registerProfileLoader} disabled={registerProfileLoader}/>
        </div>
      </div>
    </form>
  );
};

export default BioInfoForm;
