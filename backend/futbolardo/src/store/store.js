import { configureStore } from '@reduxjs/toolkit';
import sliceTitulares from './slices/EquipoTitular';
import sliceFecha from './slices/Fecha/sliceFecha';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'counter',
    storage,
};

const persistedTitulares = persistReducer(persistConfig, sliceTitulares);
const persistedFecha = persistReducer(persistConfig, sliceFecha);

const store = configureStore({
    reducer: {
        fecha: persistedFecha,
        jugadores: persistedTitulares,
        // jugadores: sliceTitulares,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store



/*
    Redux-perstist - Permite guardar el state en el local storage lo que hace que al refrescar la pagina no se pierda el state
    el state se mantenga

    persisteReducer - Le pasamos la config + el reducer que quermos que se mantenga.


*/       