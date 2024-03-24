import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const getProductDetails = createAsyncThunk("product/details", async (payload) => {
  const response = await api.post("/api/tech/product/details", payload);
  return response.data;
});

