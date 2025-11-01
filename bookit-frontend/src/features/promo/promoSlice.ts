import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validatePromo } from "../../api/promoApi";

interface State {
  loading: boolean;
  valid?: { code: string; discount: number; type: string } | null;
  error?: string | null;
}

const initialState: State = { loading: false, valid: null, error: null };

export const checkPromo = createAsyncThunk("promo/check", async (code: string) => {
  const data = await validatePromo(code);
  return { code, ...data };
});

const slice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    clearPromo(state) {
      state.valid = null;
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(checkPromo.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(checkPromo.fulfilled, (s, a) => {
       s.loading = false;
       if (a.payload.valid) s.valid = { code: a.payload.code, discount: a.payload.discount, type: a.payload.type };
       else s.error = "Invalid promo";
     })
     .addCase(checkPromo.rejected, (s, a) => { s.loading = false; s.error = a.error.message || "Failed"; });
  }
});

export const { clearPromo } = slice.actions;
export default slice.reducer;
