import { createSlice } from "@reduxjs/toolkit";

const sliceFecha = createSlice({
    name: "sliceFecha",
    initialState: {
        miEquipo: "",
        fecha: 1,
        rival: "",
        valoracion_miEquipo: undefined,
        resultado: "",
        goles_local: 0,
        goles_visitante: 0,
        formacion_rival: [],
        dibujo_formacion: 442,
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
        },
        getResultado: (state, action) => {
            state.resultado = action.payload.resultado;
            state.goles_local = action.payload.goles_local;
            state.goles_visitante = action.payload.goles_visitante;
        },
        setFormacionRival: (state, action) => {
            state.formacion_rival = action.payload;
        },
        setDibujoFormacion: (state, action) => {
            state.dibujo_formacion = action.payload;
        }   

    }
})

export const { incrementFecha, getRival, getEquipo, valoracionP1, getResultado, setFormacionRival, setDibujoFormacion } = sliceFecha.actions

export default sliceFecha.reducer