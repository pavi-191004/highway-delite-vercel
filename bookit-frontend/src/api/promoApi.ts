import { axiosInstance } from "./axiosInstance";

export const validatePromo = async (code: string) => {
  const { data } = await axiosInstance.post("/promo/validate", { code });
  return data; // { valid: boolean, discount: number, type: 'percent'|'flat' }
};
