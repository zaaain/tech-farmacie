import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel, Chip } from "@mui/material";
import { useSelector } from "react-redux";

const AddressInput = ({ onChange, value, placeholder, error }) => {
    const authReducer = useSelector((state) => state.auth);
    const { allAddressLoader, allAddressData } = authReducer;

    const [selectedAddresses, setSelectedAddresses] = useState(value || []);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedAddresses(value || []);
    }, [value]);

    const handleSelectionChange = (event) => {
        const newValue = event.target.value;
        setSelectedAddresses(newValue);
        onChange(newValue);
    };

    const handleDeleteAddress = (addressId) => {
        const updatedAddresses = selectedAddresses.filter(address => address.id !== addressId);
        setSelectedAddresses(updatedAddresses);
        onChange(updatedAddresses);
    };

    const handleOpen = (event) => {
        // Check if the click event originated from Chip's onDelete action
        if (!event.target.closest('.MuiChip-deleteIcon')) {
            setIsOpen(true);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="select-label">{placeholder}</InputLabel>
                <Select
                    labelId="select-label"
                    multiple
                    value={selectedAddresses}
                    onChange={handleSelectionChange}
                    onOpen={(event) => handleOpen(event)}
                    onClose={handleClose}
                    label={placeholder}
                    disabled={allAddressLoader}
                    open={isOpen}
                    renderValue={(selected) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((city) => (
                                <Chip
                                    key={city.id}
                                    label={city.label}
                                    onDelete={() => handleDeleteAddress(city.id)}
                                    style={{ marginRight: 2, marginBottom: 2 }}
                                />
                            ))}
                        </div>
                    )}
                >
                    {allAddressData &&
                        allAddressData.length > 0 &&
                        allAddressData
                            .filter((item) => !selectedAddresses.some(selectedItem => selectedItem.id === item.id))
                            .map((item, index) => (
                                <MenuItem
                                    key={item.id}
                                    value={{ id: item.id, label: `${item.address}, ${item.tehsil}, ${item.city}, ${item.district}` }}
                                >
                                    {`${item.address}, ${item.tehsil}, ${item.city}, ${item.district}`}
                                </MenuItem>
                            ))}
                </Select>
            </FormControl>
            {error && (
                <p className="text-red-600 font-Roboto text-[12px] mt-2">{error}</p>
            )}
        </>
    );
};

export default AddressInput;
