import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import autorizeReducer from './autorizeUserSlice';
const store = configureStore({
    reducer: {
        autorize: autorizeReducer,
        todos: todoReducer,

    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;