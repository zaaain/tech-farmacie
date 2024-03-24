import React from 'react'
import { Card } from '@mui/material'
import { Button } from "components/common/base/button";
import SelectInput from "components/common/base/SelectInput";
import { useForm, Controller } from "react-hook-form";
import { statusOption, category } from 'helpers/constant';

const ProductFilterForm = ({ handleSearch, loader, onNew }) => {

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
    });


    return (
        <Card className='p-2 shadow-dashboard'>
            <form onSubmit={handleSubmit(handleSearch)}>
                <div className='grid grid-cols-6 items-center  gap-3'>
                    <div className='col-span-6 flex justify-center'>
                        <Button
                            value="Add New Product"
                            width={160}
                            height={45}
                            onClick={onNew}
                        />
                    </div>
                    <div className='col-span-3'>
                        <Controller
                            name="status"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <SelectInput
                                    {...register("status")}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                    options={statusOption}
                                    placeholder="Select Status"
                                    value={field.value}
                                    error={errors?.status && errors.status.message}
                                />
                            )}
                        />
                    </div>
                    <div className='col-span-3'>
                        <Controller
                            name="productType"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <SelectInput
                                    {...register("productType")}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                    options={category}
                                    placeholder="Select Product Type"
                                    value={field.value}
                                    error={errors?.productType && errors.productType.message}
                                />
                            )}
                        />
                    </div>
                    <div className='col-span-6 flex justify-end items-center'>
                        <Button
                            value="Search"
                            width={120}
                            height={45}
                            type="submit"
                            loader={loader}
                            disabled={loader}
                        />

                    </div>
                </div>
            </form>
        </Card>
    )
}

export default ProductFilterForm
