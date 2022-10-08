import { createSlice } from "@reduxjs/toolkit";

const sliceFecha = createSlice({
    name: "sliceFecha",
    initialState: {
        fecha: 1,
    },
    reducers: {
        incrementFecha: (state, action) => {
            state.fecha = state.fecha + 1;
        }
    }
})

export const { incrementFecha } = sliceFecha.actions

export default sliceFecha.reducer