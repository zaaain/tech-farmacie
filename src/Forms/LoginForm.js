import React from "react";
import { Button } from "components/common/base/button";
import FormInput from "components/common/base/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { LoginSchema } from "helpers/schema";
import {useWindowSize} from 'react-use';

const LoginForm = ({ onSubmit, loader  }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {width} = useWindowSize()
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5">
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("email")}
                placeholder="Enter your email"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.email && errors.email.message}
              />
            )}
          />
          </div>
          <div className="mt-2">
             <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput
                {...register("password")}
                placeholder="Enter your Password"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors?.password && errors.password.message}
              />
            )}
          />
          </div>
        <div className="mt-10 flex justify-center items-center">
          <Button
            width={width > 400 ? 200 : 150}
            height={50}
            variant="primary"
            value="Sign In"
            type="submit"
            disabled={loader}
            loader={loader}
          />
        </div>
      </div>
      
    </form>
  );
};

export default LoginForm;
