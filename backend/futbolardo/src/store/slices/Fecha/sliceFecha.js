import { createSlice } from "@reduxjs/toolkit";

const sliceFecha = createSlice({
    name: "sliceFecha",
    initialState: {
        miEquipo: "",
        fecha: 1,
        rival: "",
        valoracion_miEquipo: undefined,
    },
    reducers: {
        incrementFecha: (state, action) => {
            state.fecha = state.fecha + 1;
        },
        getEquipo: (state, action) => {
            state.miEquipo = action.payload;
        },
        getRival: (state, action) => {
            state.rival = action.payload;
        },
        valoracionP1: (state, action) => {
            state.valoracion_miEquipo = action.payload;        
        }

    }
})

export const { incrementFecha, getRival, getEquipo, valoracionP1 } = sliceFecha.actions

export default sliceFecha.reducer