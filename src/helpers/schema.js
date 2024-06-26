import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().required("😠 Please enter email."),
  password: yup.string().required("😠 Please enter password."),
});


export const BioUpdateSchema = yup.object().shape({
  name: yup.string().required("😠 Please enter name."),
  description: yup.string().required("😠 Please enter description."),
});


export const FruVegFiberGrainsSchema = yup.object().shape({
  name: yup.string().required("Please enter name."),
  pkgType: yup.string().typeError("Please select package type.").required("Please select package type."),
  weightUnit: yup.string().required("Please select weight unit."),
  pkgWeight: yup.string().required("Please enter package weight."),
  description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
});

export const FertilizerPlantSchema = yup.object().shape({
  name: yup.string().required("Please enter name."),
  brand: yup.string().required("Please enter brand name."),
  pkgWeight: yup.string().required("Please enter weight weight."),
  pkgType: yup.string().required("Please select package type."),
  weightUnit: yup.string().required("Please select weight unit."), 
  description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
  subProductType: yup.string().required("Please enter sub product type."),
  areaCovered : yup.string().required("Please enter area covered ."),
  // expiryDate : yup.string().required("Please select expiry date."),
});

export const SeedSchema = yup.object().shape({
  name: yup.string().required("Please enter name."),
  brand: yup.string().required("Please enter brand."),
  pkgType: yup.string().required("Please select package type."),
  weightUnit: yup.string().required("Please select weight unit."),
  pkgWeight: yup.string().required("Please enter weight weight."),
  description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
  seedVariety: yup.string().required("Please enter seed variety."),
  seedType: yup.string().required("Please select seed type."),
  suitableRegion: yup.string().required("Please select region."),
  seedWeight: yup.string().required("Please enter seed weight."),
});

export const MachinaryFormSchema = (type) => {
  let schema = yup.object().shape({
    description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
    type: yup.string().required("Please enter product type."),
    name: yup.string().required("Please enter name.")
  });


  if (type === "Tool" || type === "Machinary") {
    schema = schema.shape({
      condition: yup
        .string()
        .required("Please select condition."),
    });
  }
  if (type !== "Machinary") {
    schema = schema.shape({
      horsePower: yup.string().nullable(),
    });
  }
  if (type === "Machinary") {
    schema = schema.shape({
      horsePower: yup
        .string()
        .required("Please enter horse power."),
    });
  }

  return schema;
};