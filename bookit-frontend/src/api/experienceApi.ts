import { axiosInstance } from "./axiosInstance";
import { Experience } from "../types";

export const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await axiosInstance.get("/experiences");
  return data;
};

export const getExperienceById = async (id: string): Promise<Experience> => {
  const { data } = await axiosInstance.get(`/experiences/${id}`);
  return data;
};
