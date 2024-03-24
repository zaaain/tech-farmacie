import ApiClient from "Api/index";

export default function useClient() {
  const api = new ApiClient();
  return { api };
}