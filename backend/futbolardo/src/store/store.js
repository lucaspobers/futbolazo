import { configureStore } from '@reduxjs/toolkit';
import sliceTitulares from './slices/EquipoTitular';
import sliceFecha from './slices/Fecha/sliceFecha';
import sliceEstadisticas from './slices/Estadisticas/sliceEstadisticas';
import slicePosiciones from './slices/TablaPosiciones/slicePosiciones';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'counter',
    storage,
};

const persistedTitulares = persistReducer(persistConfig, sliceTitulares);
const persistedFecha = persistReducer(persistConfig, sliceFecha);
const persistedEstadisticas = persistReducer(persistConfig, sliceEstadisticas);
const persistedPosiciones = persistReducer(persistConfig, slicePosiciones);

const store = configureStore({
    reducer: {
        fecha: persistedFecha,
        jugadores: persistedTitulares,
        estadisticas: persistedEstadisticas,
        posiciones: persistedPosiciones
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store



/*
    Redux-perstist - Permite guardar el state en el local storage lo que hace que al refrescar la pagina no se pierda el state
    el state se mantenga

    persisteReducer - Le pasamos la config + el reducer que quermos que se mantenga.

    redux-thunk - Es un middleware que nos permite hacer dispatch de funciones asincronas


*/       