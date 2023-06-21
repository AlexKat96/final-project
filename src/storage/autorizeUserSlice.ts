import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userState = {
    user: boolean
}
const initialState: userState = {
    user: false
}


const autorizeUser = createSlice({
    name: 'autorize',
    initialState,
    reducers: {
        addAutorizeUser(state, action: PayloadAction<boolean>) {

            state.user = action.payload

        }

    },
});

export const { addAutorizeUser } = autorizeUser.actions;

export default autorizeUser.reducer;