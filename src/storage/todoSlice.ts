import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = {
    id: string;
    token: string;
    completed: boolean;
}

const initialState: Todo = {
    id: "",
    token: "",
    completed: false
}


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {

            state.id = new Date().toISOString()
            state.token = action.payload
            state.completed = true
        },

        toggleComplete(state, action: PayloadAction<string>) {

        },
        removeTodo(state) {
            state.token = ""
            state.completed = false
            state.id = ""
        }
    },
});


export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;