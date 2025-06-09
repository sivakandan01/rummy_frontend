import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        label: "",
        value: ""
    }
}

const MessageSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setData } = MessageSlice.actions
export default MessageSlice.reducer