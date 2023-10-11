import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "../../features/UserSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer:{
        users: usersSlice.reducer,
    }
})


