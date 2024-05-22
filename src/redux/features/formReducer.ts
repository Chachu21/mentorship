import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  currentStep: number;
  data: {
    [key: string]: any;
  };
}

const initialState: FormState = {
  currentStep: 1,
  data: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep(state) {
      state.currentStep += 1;
    },
    prevStep(state) {
      state.currentStep -= 1;
    },
    setFormData(state, action: PayloadAction<{ [key: string]: any }>) {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { nextStep, prevStep, setFormData } = formSlice.actions;
export default formSlice.reducer;
