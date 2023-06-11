import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from '../../data.json';

//create async thunk
export const fetchCurrentUser = createAsyncThunk(
    "user/fecthUser",
    async (args, thunkAPI) => {
        const user = await Data.currentUser;
        // console.log("slice:" + JSON.stringify(user, null, 2));
        return user;
    }
)

//Create user slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        isLoadingUser: false,
        hassErrorLoadingUser: false
    },
    reducers: {
    },
    extraReducers: {
        [fetchCurrentUser.pending]: (state) => {
            state.isLoadingUser = true;
        },
        [fetchCurrentUser.fulfilled]: (state, action) => {
            const currentUser = action.payload;
            state.user = currentUser;
            state.isLoadingUser = false;
        },
        [fetchCurrentUser.rejected]: (state) => {
            state.hassErrorLoadingUser = true;
        }
    }

})
//selectors
export const selectCurrentUser = (state) => state.user.user;


export default userSlice.reducer;
