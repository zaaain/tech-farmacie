import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "hooks/useClient";

const { api } = Client();

export const getProfile = createAsyncThunk("auth/profile", async (payload) => {
  const response = await api.get("/api/auth/profile");
  return response.data;
});

