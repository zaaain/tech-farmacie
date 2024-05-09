import React, { useState, useEffect } from 'react'
import { Card } from '@mui/material'
import { Button } from "components/common/base/button";
import SelectInput from "components/common/base/SelectInput";
import { useForm, Controller } from "react-hook-form";
import FormInput from "components/common/base/FormInput";
import { statusOption, category, weightUnitType } from 'helpers/constant';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


const ProductFilterForm = ({ handleSearch, loader, onNew }) => {

    const [cateName, setCateName] = useState("")
    const [chemicals, setChemicals] = useState([{ name: "", unit: "", volume: "" }]);
    const [chemFlag, setChemFlag] = useState(false);
    const [flag, setFlag] = useState(true);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
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
        if (!chemFlag) return
        setChemicals([...chemicals, { name: "", unit: "", volume: "" }]);
        setFlag(true);
    };

    const handleRemoveChem = (index) => {
        if (!chemFlag || chemicals.length === 1) return
        const updatedChemicals = [...chemicals];
        updatedChemicals.splice(index, 1);
        setChemicals(updatedChemicals);
    };

    useEffect(() => {
        const flag = chemicals.some((item) => item.name)
        if (flag) {
            setChemFlag(true)
        } else {
            setChemFlag(false)
        }
    }, [chemicals])

    const handleSubmitNow = (val) => {
        if (chemicals.length === 1 && chemicals[0].name === "" && chemicals[0].unit === "" && chemicals[0].volume === "") {
            handleSearch(val)
            return
        }
        Object.assign(val, { composition: chemicals });
        handleSearch(val)
    }

    return (
        <Card className='p-2 shadow-dashboard'>
            <form onSubmit={handleSubmit(handleSubmitNow)}>
                <div className='grid grid-cols-6 items-center  gap-3'>
                    <div className='col-span-6 flex justify-center'>
                        <Button
                            value="Add New Product"
                            width={160}
                            height={45}
                            onClick={onNew}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <SelectInput
                                    {...register("category")}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption)
                                        setCateName(selectedOption.target && selectedOption.target.value && selectedOption.target.value)
                                    }}
                                    options={category}
                                    placeholder="Select category Type"
                                    value={field.value}
                                    error={errors?.category && errors.category.message}
                                />
                            )}
                        />
                    </div>
                    {cateName && (cateName === "Pesticides" || cateName === "Plant Pathology & Entomology" || cateName === "Fertilizers") && (
                        <div className="md:col-span-6 sm:col-span-6 xs:col-span-6">
                            <Controller
                                name="subCategory"
                                control={control}
                                render={({ field }) => (
                                    <FormInput
                                        {...register("subCategory")}
                                        placeholder="Enter Sub Category"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={errors?.subCategory && errors.subCategory.message}
                                    />
                                )}
                            />
                        </div>
                    )}
                    <div className="md:col-span-3 sm:col-span-6 xs:col-span-6">
                        <Controller
                            name="query"
                            control={control}
                            render={({ field }) => (
                                <FormInput
                                    {...register("query")}
                                    placeholder="Enter Product Name"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    error={errors?.query && errors.query.message}
                                />
                            )}
                        />
                    </div>
                    <div className="md:col-span-3 sm:col-span-6 xs:col-span-6">
                        <Controller
                            name="brand"
                            control={control}
                            render={({ field }) => (
                                <FormInput
                                    {...register("brand")}
                                    placeholder="Enter Brand Name"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    error={errors?.brand && errors.brand.message}
                                />
                            )}
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
                    {cateName && (cateName === "Pesticides" || cateName === "Plant Pathology & Entomology" || cateName === "Fertilizers") && (
                    <>
                    {chemicals.map((chem, index) => (
                        <>
                            <div className={`md:col-span-2 sm:col-span-6 xs:col-span-6`}>
                                <FormInput
                                    placeholder="Active Ingredients"
                                    value={chem.name}
                                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                />

                            </div>
                            <div className={`md:col-span-1 sm:col-span-6 xs:col-span-6`}>
                                <FormInput
                                    placeholder="Concentration"
                                    type="number"
                                    value={chem.volume}
                                    onChange={(e) => handleInputChange(index, "volume", e.target.value)}
                                />

                            </div>
                            <div className={`md:col-span-2 sm:col-span-6 xs:col-span-6`}>
                                <SelectInput
                                    placeholder="Unit"
                                    value={chem.unit}
                                    options={weightUnitType}
                                    onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-1 sm:col-span-6 xs:col-span-6 flex">
                                <div className={`${!chemFlag ? "bg-[#eaeaea]" : "bg-primary"} p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={handleAddNewChem}>
                                    <AddIcon style={{ color: "white" }} />
                                </div>
                                <div className={`${!chemFlag || chemicals.length === 1 ? "bg-[#eaeaea]" : "bg-secondary"} ml-5 p-2 flex items-center justify-center w-[50px] rounded-2xl h-[50px] cursor-pointer`} onClick={() => handleRemoveChem(index)}>
                                    <CloseIcon style={{ color: "white" }} />
                                </div>
                            </div>

                        </>
                    ))}
                    </>
                    )}
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
