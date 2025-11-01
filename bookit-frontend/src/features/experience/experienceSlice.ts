import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Experience } from "../../types";
import * as api from "../../api/experienceApi";

interface State {
  experiences: Experience[];
  current?: Experience | null;
  loading: boolean;
  error?: string | null;
}

const initialState: State = {
  experiences: [],
  current: null,
  loading: false,
  error: null,
};

export const fetchExperiences = createAsyncThunk("experience/fetchAll", async () => {
  const data = await api.getExperiences();
  return data;
});

export const fetchExperienceById = createAsyncThunk("experience/fetchById", async (id: string) => {
  const data = await api.getExperienceById(id);
  return data;
});

const slice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchExperiences.fulfilled, (s, a) => { s.experiences = a.payload; s.loading = false; })
      .addCase(fetchExperiences.rejected, (s, a) => { s.loading = false; s.error = a.error.message || "Failed"; })

      .addCase(fetchExperienceById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchExperienceById.fulfilled, (s, a) => { s.current = a.payload; s.loading = false; })
      .addCase(fetchExperienceById.rejected, (s, a) => { s.loading = false; s.error = a.error.message || "Failed"; });
  },
});

export const { clearCurrent } = slice.actions;
export default slice.reducer;
