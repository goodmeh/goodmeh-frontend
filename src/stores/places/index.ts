import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Place } from "@/types/data";

const placeSlice = createSlice({
  name: "places",
  initialState: {
    places: {} as Record<string, Place>,
  },
  reducers: {
    addPlace(state, action: PayloadAction<Place>) {
      state.places[action.payload.id] = action.payload;
    },
  },
});

export const PlaceActions = placeSlice.actions;
export default placeSlice.reducer;
